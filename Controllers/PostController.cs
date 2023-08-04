using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Post.Data.Models;
using Microsoft.AspNetCore.HttpsPolicy;
using System;
using User.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Topic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public PostController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("[action]")]
        public IActionResult AddPost([FromBody] Post.Data.Models.Post post)
        {
            if (post.Text == null)
            {
                return BadRequest("Text can not be empty.");
            }

            // Check if the provided TopicId is valid
            var validTopicId = _dbContext.Topics.FirstOrDefault(t => t.Id == post.TopicId);

            if (validTopicId == null)
            {
                return BadRequest("Invalid ForumId. Please provide a valid TopicId.");
            }

            //set the DateCreated property to the current UTC timestamp
            post.DateCreated = DateTime.UtcNow;

            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                _dbContext.Posts.Add(post);
                _dbContext.SaveChanges();
                transaction.Commit();
                int postPageNumber = GetPageNumberOfPost(post.Id, post.TopicId);
                return Ok(new{
                    post = post,
                    pageNumber = postPageNumber
                });
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return BadRequest($"An error occurred while create the post: {ex.Message}");
            }
        }
        private int GetPageNumberOfPost(int postId, int topicId)
        { 
                // Find the posts that match the specified topic_id
                var query = _dbContext
                    .Posts
                    .Where(p => p.TopicId == topicId)
                    .ToList();

                // Find the index of the post with the given postId
                int index = query.FindIndex(p => p.Id == postId);
                int pageNumber = 1;

                if ( index < 8) {
                    return pageNumber;
                } else {
                    var totalPosts = query.Count();
                    double calculation = (totalPosts + 1) / 9.0; //9 is default page size
                    pageNumber = (int)Math.Ceiling(calculation);
                    return pageNumber;
                }
        }

        [HttpGet("[action]/{id}")]
        public IActionResult AllPostsByTopicId(int id, int page = 1, int pageSize = 9)
        {
            try
            {
                // Find the posts that match the specified topic_id
                var query = _dbContext
                    .Posts
                    .Where(p => p.TopicId == id);

                var totalPosts = query.Count();
                var totalPages = (int)Math.Ceiling(totalPosts / (double)pageSize);
                var lastPost = query.OrderByDescending(p => p.Id).FirstOrDefault();

                var posts = query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                var response = new
                {
                    TotalPosts = totalPosts,
                    TotalPages = totalPages,
                    LastPost = lastPost,
                    Posts = posts
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fethcing the corresponding topics: {ex.Message}");
            }
        }

        [HttpGet("[action]/{id}")]
        public IActionResult PostById(int id)
        {
            try
            {
                var post = _dbContext.Posts.FirstOrDefault(p => p.Id == id);

                if (post == null)
                {
                    return NotFound("Post not found.");
                }
                else
                {
                    return Ok(post);
                }

            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while fetching the post: {ex.Message}");
            }
        }
    }
}
