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
        

        [HttpGet("{id}")]
        public IActionResult GetForumById(int id)
        {
            try
            {
                var forum = _dbContext.Forums.FirstOrDefault(f => f.Id == id);
                
                if (forum == null) 
                {
                    return NotFound("Forum not found.");
                }
                return Ok(forum);   
            }
            catch (Exception ex) 
            {
                return StatusCode(500, $"An error occurred while fethcing the forum: {ex.Message}");
            }
        }
        
        [HttpGet("total-posts/{id}")]
        public IActionResult GetTotalPostsInForum(int id) 
        {
            var totalPosts = _dbContext.Posts.Where(p => p.ForumId == id).Count();
            return Ok(totalPosts);
        }
    }
}
