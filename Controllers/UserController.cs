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
        public UserController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        private string GenerateJwtToken(User.Data.Models.User user)
        {
            // Set the secret key used for signing the token. This should be a secure secret in a production environment.
            string secretKey = Environment.GetEnvironmentVariable("ACCESS_TOKEN_SECRET");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            // Set the signing credentials using the secret key
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Create the claims for the token (you can add more claims if needed)
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                // Add any other relevant claims here
            };

            // Create the JWT token
            var token = new JwtSecurityToken(
                issuer: "mvp-forums",
                audience: "mvp-forums-authenticated-users",
                claims: claims,
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
        //accept user provided arguments of email, username, password, password_check
        public IActionResult CreateUser([FromForm] string email, [FromForm] string username, [FromForm] string password, [FromForm] string passwordCheck)
        {
            //make sure password and password_check match, otherwise return error
            if (password != passwordCheck)
            {
                return BadRequest("Password and Password Check do not match");
            }

            //check if the meail already exists in the database
            var existingUserWithEmail = _dbContext.Users.FirstOrDefault(u => u.Username == username);
            if (existingUserWithEmail != null){
                return BadRequest("Email already exists");
            }

            // Check if the username already exists in the database
            var existingUserWithUsername = _dbContext.Users.FirstOrDefault(u => u.Username == username);
            if (existingUserWithUsername != null)
            {
                return BadRequest("Username already exists");
            }

            // If both email and username are unique, create a new User entity
            var newUser = new User.Data.Models.User
            {
                Email = email,
                Username = username,
                Password = password,
                CreatedDate = DateTime.UtcNow // You can set the created date to the current UTC time
            };


            try
            {
                _dbContext.Users.Add(newUser);
                _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while saving the user: {ex.Message}");
            }

            string jwtToken = GenerateJwtToken(newUser);


            return Ok(new { Token = jwtToken });

            //create refreshToken, store to db
            //create accessToken, store in localStorage
        }

        [HttpGet("[action]")]
        public IActionResult LoginUser()
        {
            //accept user provided arguments of (email OR username) AND password
            //find user in DB with matching email OR username
                //if user not found, return error
                //if (password argument != stored password), return error
            //generate refreshToken, store in separate DB.
            //generate accessToken, store in localstorage.                          
            return Ok("Not yet setup");
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
