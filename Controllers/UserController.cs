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
        public IActionResult CreateUser([FromForm] string email, [FromForm] string username, [FromForm] string password, [FromForm] string passwordCheck)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Create a concatenated string of all the arguments received
            string result = $"Email: {email}, Username: {username}, Password: {password}, Password Check: {passwordCheck}";

            // Return the concatenated string as the response
            return Ok(result);
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
