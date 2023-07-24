using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Forum.Data.Models;
using Microsoft.AspNetCore.HttpsPolicy;
using System;

namespace Forum.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ForumController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public ForumController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("[action]")]
        public IActionResult GetAllForums()
        {
            /*
             *  var forums = _dbContext.Forums.ToList();
                return Ok(forums);
             */

            try
            {
                var forums = _dbContext.Forums?.ToList();

                if (forums == null)
                {
                    return NotFound("No forums found.");
                }

                return Ok(forums);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching forums: {ex.Message}");
            }

        }
    }
}
