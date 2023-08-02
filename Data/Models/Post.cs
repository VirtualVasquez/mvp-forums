using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Post.Data.Models
{
    [Table("posts")]
    public class Post
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("topic_id")]
        public int TopicId { get; set; }
        
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("text")]
        public string Text { get; set; }
        
        [Column("date_created")]
        public DateTime DateCreated { get; set; }
    }
}
