using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using User.Data.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;


namespace User.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly string _accessTokenSecret;
        private readonly string _refreshTokenSecret;

        public UserController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
            // Load your access token and refresh token secrets from configuration or environment variables
            _accessTokenSecret = Environment.GetEnvironmentVariable("ACCESS_TOKEN_SECRET");
            _refreshTokenSecret = Environment.GetEnvironmentVariable("REFRESH_TOKEN_SECRET");
        }

        private string GenerateJwtToken(User.Data.Models.User user, bool isAccessToken = true)
        {
            var secretKey = isAccessToken ? _accessTokenSecret : _refreshTokenSecret;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), // Add the user ID claim
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                // Add any other relevant claims here
            };

            //var expiration = isAccessToken ? DateTime.UtcNow.AddHours(1) : DateTime.UtcNow.AddDays(7);

            var token = new JwtSecurityToken(
                issuer: "mvp-forums",
                audience: isAccessToken ? "mvp-forums-access" : "mvp-forums-refresh",
                claims: claims,
                //expires: expiration,
                signingCredentials: credentials
            );

            // Serialize the token to a string
            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
            return jwtToken;
        }
        private int GetUserIdFromAccessToken(string accessToken)
        {

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.ReadJwtToken(accessToken);

            // Find the user ID claim and convert it to an integer
            if (token.Payload.TryGetValue(ClaimTypes.NameIdentifier, out var userIdClaim) && int.TryParse(userIdClaim.ToString(), out var userId))
            {
                return userId;
            }

            // Return 0 if the user ID is not found or cannot be parsed
            return -1;
        }

        [HttpGet("[action]")]
        public IActionResult GetUsers()
        {
            var users = _dbContext.Users.ToList();
            return Ok(users);
        }

        public class CreateUserRequest
        {
            public User.Data.Models.User User { get; set; }
            public string PasswordCheck { get; set; }
        }

        [HttpPost("[action]")]
        public IActionResult CreateUser([FromBody] CreateUserRequest request)
        {
            var user = request.User;
            var passwordCheck = request.PasswordCheck;

            if (user.Password != passwordCheck)
            {
                return BadRequest("Password and Password Check do not match");
            }

            var existingUserWithEmail = _dbContext.Users.FirstOrDefault(u => u.Email == user.Email);
            if (existingUserWithEmail != null)
            {
                return BadRequest("Email already exists");
            }

            var existingUserWithUsername = _dbContext.Users.FirstOrDefault(u => u.Username == user.Username);
            if (existingUserWithUsername != null)
            {
                return BadRequest("Username already exists");
            }

            // Hash the password before saving the user to the database
            user.HashPassword(user.Password);

            // Set the CreatedDate property to the current UTC timestamp
            user.CreatedDate = DateTime.UtcNow;

            // Begin the database transaction
            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();

                // Create access token and refresh token
                string accessToken = GenerateJwtToken(user, isAccessToken: true);
                string refreshToken = GenerateJwtToken(user, isAccessToken: false);

                // Save the refresh token in the database
                var refreshTokenEntity = new RefreshToken
                {
                    Token = refreshToken,
                    UserId = user.Id
                };

                _dbContext.RefreshTokens.Add(refreshTokenEntity);
                _dbContext.SaveChanges();

                // Commit the transaction
                transaction.Commit();

                return Ok(new { Token = accessToken });
            }
            catch (Exception ex)
            {
                // If an exception occurs, rollback the transaction
                transaction.Rollback();
                return BadRequest($"An error occurred while saving the user: {ex.Message}");
            }
        }

        public class LoginModel
        {
            public string Email { get; set; }

            public string Password { get; set; }
        }

        [HttpPost("[action]")]
        public IActionResult LoginUser([FromBody] LoginModel loginModel)
        {
            //accept user provided arguments of (email OR username) AND password
            //find user in DB with matching email OR username
            var existingUserWithEmail = _dbContext.Users.FirstOrDefault(u => u.Email == loginModel.Email);

            //if user not found, return error
            if (existingUserWithEmail == null)
            {
                return BadRequest("No user with that email found.");
            }

            //if (password argument != stored password), return error
            if (!existingUserWithEmail.VerifyPassword(loginModel.Password))
            {
                return BadRequest("Invalid password.");
            }

            // Check if a refresh token already exists for the user
            var existingRefreshToken = _dbContext.RefreshTokens.FirstOrDefault(rt => rt.UserId == existingUserWithEmail.Id);

            // Begin the database transaction
            using var transaction = _dbContext.Database.BeginTransaction();
            try
            {
                // Create access token and refresh token
                string accessToken = GenerateJwtToken(existingUserWithEmail, isAccessToken: true);
                string refreshToken = GenerateJwtToken(existingUserWithEmail, isAccessToken: false);

                // If a refresh token already exists, update it; otherwise, add a new one
                if (existingRefreshToken != null)
                {
                    existingRefreshToken.Token = refreshToken;
                    _dbContext.RefreshTokens.Update(existingRefreshToken);
                }
                else
                {
                    var refreshTokenEntity = new RefreshToken
                    {
                        Token = refreshToken,
                        UserId = existingUserWithEmail.Id
                    };
                    _dbContext.RefreshTokens.Add(refreshTokenEntity);
                }

                _dbContext.SaveChanges();

                // Commit the transaction
                transaction.Commit();

                return Ok(new { Token = accessToken });
            }
            catch (Exception ex)
            {
                // If an exception occurs, rollback the transaction
                transaction.Rollback();
                return BadRequest($"An error occurred while logging in the user: {ex.Message}");
            }
        }

        [HttpDelete("[action]")]
        //use accessToken as argument
        public IActionResult LogoutUser([FromForm] string accessToken)
        {
            int userId = (int)GetUserIdFromAccessToken(accessToken);

            // Return an error if the user ID couldn't be extracted from the access token
            if (userId == -1)
            {
                return BadRequest("Invalid access token");
            }

            // Find the refresh token entity for the given user ID
            var refreshTokenEntity = _dbContext.RefreshTokens.FirstOrDefault(rt => rt.UserId == userId);

            // Return an error if the refresh token entity is not found
            if (refreshTokenEntity == null)
            {
                return BadRequest("Refresh token not found");
            }

            // Remove the refresh token entity from the database
            _dbContext.RefreshTokens.Remove(refreshTokenEntity);
            _dbContext.SaveChanges();

            //ON THE CLIENT SIDE: delete accessToken from localStorage
            return Ok("Logout successful");
        }

        [HttpGet("[action]")]
        public IActionResult ValidateAccessToken([FromHeader(Name = "Authorization")] string accessToken)
        {
            // Check if the Authorization header is not null and starts with "Bearer "
            if (!string.IsNullOrEmpty(accessToken) && accessToken.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            {
                // Extract the actual access token (removing the "Bearer " prefix)
                string actualAccessToken = accessToken.Substring(7); // "Bearer ".Length = 7

                // Check if the access token is valid
                bool isValidToken = IsAccessTokenValid(actualAccessToken);
                if (isValidToken)
                {
                    return Ok("Valid access token");
                }
            }
            return BadRequest("Invalid access token");
        }
        private bool IsAccessTokenValid(string accessToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                // Validate the token
                SecurityToken validatedToken;
                var token = tokenHandler.ReadJwtToken(accessToken);

                // Get the issuer and audience claims from the token
                string issuer = token.Issuer;
                string audience = token.Audiences.FirstOrDefault();

                // Your existing validation parameters
                if (issuer != "mvp-forums" || audience != "mvp-forums-access")
                {
                    return false;
                }

                return true;
            }
            catch
            {
                // Token validation failed
                return false;
            }
        }

    }
}
