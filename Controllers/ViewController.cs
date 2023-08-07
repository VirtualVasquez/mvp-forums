using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using View.Data.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;


namespace View.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ViewController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public ViewController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("[action]/{topicId}")]
        public IActionResult TotalViews(int topicId)
        {
            var totalViews = _dbContext
                .Views
                .Where(v => v.TopicId == topicId)
                .Count();
            
            return Ok(totalViews);
        }

        [HttpPost("[action]")]
        public IActionResult AddUserView([FromBody] View.Data.Models.View view)
        {
            try{
                //get the most recent view in the views table that match provided userId and topicId
                var lastView = _dbContext
                    .Views
                    .Where(v => v.UserId == view.UserId && v.TopicId == view.TopicId)
                    .FirstOrDefault();

                if (lastView == null || !IsCurrentSession(lastView.VisitTimestamp))
                {
                    view.VisitTimestamp = DateTime.UtcNow;
                    using var transaction = _dbContext.Database.BeginTransaction();
                    try
                    {
                        _dbContext.Views.Add(view);
                        _dbContext.SaveChanges();
                        transaction.Commit();
                        return Ok(new
                        {
                            message = $"View has been added to Topic ID: {view.TopicId}"
                        });
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return BadRequest($"An error occurred while trying to add a view: {ex.Message}");
                    }
                }
                else
                {
                    return Ok(new
                    {
                        Message = "User is still in current session"
                    }
                    );
                }

            } catch (Exception ex){
                return BadRequest(ex.Message);
            }
            

        }

        private static bool IsCurrentSession(DateTime timestamp)            
        {
            var currentTimestamp = DateTime.UtcNow;

            TimeSpan timeDifference = currentTimestamp - timestamp;

            return timeDifference.TotalMinutes >= 30;
        }

        

    }
}
