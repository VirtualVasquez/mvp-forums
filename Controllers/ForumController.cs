using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Forum.Data.Models;
using Microsoft.AspNetCore.HttpsPolicy;
using System;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet("posts-details/{forumId}")]
        public IActionResult GetForumPostsData(int forumId)
        {

            var totalPosts = _dbContext.Posts
                 .Where(p => p.ForumId == forumId)
                 .Count();

            var mostRecentPost = totalPosts > 0 
                ?_dbContext.Posts
                    .Where(p => p.ForumId == forumId)
                    .OrderByDescending(p => p.DateCreated)
                    .FirstOrDefault()
                : null;     

            if (totalPosts == 0)
            {
                var message = "This forum has no associated posts.";
                var forumDetails = new
                {
                    TotalPosts = totalPosts,
                    Message = message
                };

                return Ok(forumDetails);
            }


            var forumData = new
            {
                TotalPosts = totalPosts,
                MostRecentPost = mostRecentPost
            };

            return Ok(forumData);
        }
    }
}
