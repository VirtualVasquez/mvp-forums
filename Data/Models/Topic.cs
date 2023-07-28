using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Topic.Data.Models
{
    [Table("topics")]
    public class Topic
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("forum_id")]
        public int ForumId { get; set; }
        
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("title")]
        public string Title { get; set; }

        [Column("text")]
        public string Text { get; set; }
        
        [Column("date_created")]
        public DateTime DateCreated { get; set; }

        [Column("slug")]
        public string Slug { get; set; }

        [Column("open")]
        public bool Open { get; set; }
    }
}
