using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using User.Data.Models;


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


            return Ok("successfully added a new user"); 

            //create refreshToken, store to db
            //create accessToken, store in localStorage
        }
        /*
        // Create a concatenated string of all the arguments received
        string result = $"Email: {email}, Username: {username}, Password: {password}, Password Check: {passwordCheck}";

        // Return the concatenated string as the response
        return Ok(result);
         */

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
