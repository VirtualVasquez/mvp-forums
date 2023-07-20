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

        [HttpGet("[action]")]
        public IActionResult GetUsers()
        {
            var users = _dbContext.Users.ToList();
            return Ok(users);
        }

        [HttpPost("[action]")]
        public IActionResult CreateUser([FromForm] string email, [FromForm] string username, [FromForm] string password, [FromForm] string passwordCheck)
        {
            if (password != passwordCheck)
            {
                return BadRequest("Password and Password Check do not match");
            }

            var existingUserWithEmail = _dbContext.Users.FirstOrDefault(u => u.Email == email);
            if (existingUserWithEmail != null)
            {
                return BadRequest("Email already exists");
            }

            var existingUserWithUsername = _dbContext.Users.FirstOrDefault(u => u.Username == username);
            if (existingUserWithUsername != null)
            {
                return BadRequest("Username already exists");
            }

            var newUser = new User.Data.Models.User
            {
                Email = email,
                Username = username,
                CreatedDate = DateTime.UtcNow
            };

            // Hash the password before saving the user to the database
            newUser.HashPassword(password);

            // Begin the database transaction
            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                _dbContext.Users.Add(newUser);
                _dbContext.SaveChanges();

                // Create access token and refresh token
                string accessToken = GenerateJwtToken(newUser, isAccessToken: true);
                string refreshToken = GenerateJwtToken(newUser, isAccessToken: false);

                // Save the refresh token in the database
                var refreshTokenEntity = new RefreshToken
                {
                    Token = refreshToken,
                    UserId = newUser.Id
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

        //need to either
        //make one form line serve as email OR username
        //OR
        //decide to only use email - probably this one
        [HttpPost("[action]")]
        public IActionResult LoginUser([FromForm] string email, [FromForm] string password)
        {
            //accept user provided arguments of (email OR username) AND password
            //find user in DB with matching email OR username
            var existingUserWithEmail = _dbContext.Users.FirstOrDefault(u => u.Email == email);

            //if user not found, return error
            if (existingUserWithEmail == null)
            {
                return BadRequest("No user with that email found.");
            }

            //if (password argument != stored password), return error
            if (!existingUserWithEmail.VerifyPassword(password))
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

                // If a refresh token already exists, update it; otherwise, add a new one
                if (existingRefreshToken != null){
                    existingRefreshToken.Token = GenerateJwtToken(existingUserWithEmail, isAccessToken: false);
                    _dbContext.RefreshTokens.Update(existingRefreshToken);
                }
                else
                {
                    string refreshToken = GenerateJwtToken(existingUserWithEmail, isAccessToken: false);
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

        [HttpGet("[action]")]
        public IActionResult LogoutUser()
        { 
            //use accessToken as argument
            //decode accessToken
            //find corresponding refreshtoken in db
            //delete refreshtoken
            //ON THE CLIENT SIDE: delete accessToken            
            return Ok("Not yet setup");
        }


    }
}
