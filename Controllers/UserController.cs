using Microsoft.AspNetCore.Mvc;
using System;
using User.Data.Models;


namespace User.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet("[action]")]
        public IActionResult GetUsers()
        {
            // Code to retrieve users from the database goes here
            // You can use Entity Framework Core or any other data access approach

            // For the sake of example, let's assume you have a list of users
            var users = new[]
            {
                new { Id = 1, Username = "user1", CreatedDate = new DateTime(2023, 1, 1) },
                new { Id = 2, Username = "user2", CreatedDate = new DateTime(2023, 1, 2) },
                new { Id = 3, Username = "user3", CreatedDate = new DateTime(2023, 1, 3) }
            };

            return Ok(users);
        }
    }
}
