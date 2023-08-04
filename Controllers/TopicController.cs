using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Topic.Data.Models;
using Microsoft.AspNetCore.HttpsPolicy;
using System;
using Slugify;

namespace Topic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TopicController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly string _accessTokenSecret;
        private readonly string _refreshTokenSecret;

        public TopicController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
            // Load your access token and refresh token secrets from configuration or environment variables
            _accessTokenSecret = Environment.GetEnvironmentVariable("ACCESS_TOKEN_SECRET");
            _refreshTokenSecret = Environment.GetEnvironmentVariable("REFRESH_TOKEN_SECRET");
        }

        [HttpPost("[action]")]
        public IActionResult AddTopic([FromBody] Topic.Data.Models.Topic topic)
        {
            if (topic.Title == null){
                return BadRequest("Title can not be empty.");
            }
            if (topic.Text == null)
            {
                return BadRequest("Text can not be empty.");
            }
            // Check if the provided ForumId is valid
            var validForum = _dbContext.Forums.FirstOrDefault(f => f.Id == topic.ForumId);
            if (validForum == null)
            {
                return BadRequest("Invalid ForumId. Please provide a valid ForumId.");
            }

            //Create an instance of SlugHelper
            var slugHelper = new SlugHelper();

            //generate the initial slug from the title
            var proposedSlug = slugHelper.GenerateSlug(topic.Title);

            //Ensure the uniqueness of the slug for the given UserId;
            var uniqueSlug = EnsureUniqueSlug(topic.UserId, proposedSlug);

            //Set the generated unique slug
            topic.Slug = uniqueSlug;

            //set the DateCreated property to the current UTC timestamp
            topic.DateCreated = DateTime.UtcNow;

            topic.Open = true;

            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                _dbContext.Topics.Add(topic);
                _dbContext.SaveChanges();
                transaction.Commit();
                return Ok
                (new 
                 { topicId = topic.Id,
                   topicSlug = topic.Slug
                 });
            }
            catch (Exception ex) 
            {
                transaction.Rollback();
                return BadRequest($"An error occurred while create the topic: {ex.Message}");
            }

        }
        private string EnsureUniqueSlug(int userId, string proposedSlug)
        {
            string slug = proposedSlug;
            int counter = 1;

            while (CheckSlugExists(userId, slug))
            {
                // If the combination of user_id and slug already exists,
                // generate a new slug by appending a counter to the proposedSlug
                slug = $"{proposedSlug}-{counter}";
                counter++;
            }

            return slug;
        }
        private bool CheckSlugExists(int userId, string slug)
        {
            // Perform the necessary database query to check for the existence of the slug
            return _dbContext.Topics.Any(t => t.UserId == userId && t.Slug == slug);
        }

        [HttpGet("[action]/{id}")]
        public IActionResult AllTopicsByForumId(int id, int page = 1, int pageSize = 10)
        {
            try
            {

                // Find the topics that match the specified forum_id
                var query = _dbContext
                    .Topics
                    .Where(t => t.ForumId == id)
                    .OrderByDescending(t => t.DateCreated); // Reverted to descending order

                var totalTopics = query.Count();
                var totalPages = (int)Math.Ceiling(totalTopics / (double)pageSize);

                var topics = query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                var response = new
                {
                    TotalTopics = totalTopics,
                    TotalPages = totalPages,
                    Topics = topics
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fethcing the corresponding topics: {ex.Message}");
            }
        }
        
        [HttpGet("[action]/{id}")]
        public IActionResult TopicById(int id)
        {
            try{
                var topic = _dbContext.Topics.FirstOrDefault(t => t.Id == id);
            
                if(topic == null)
                {
                    return NotFound("Topic not found.");
                }
                else{
                    return Ok(topic);
                }

            } catch(Exception ex) 
            {
                return BadRequest($"An error occurred while fetching the topic: {ex.Message}");
            }
        }
    }
}
