using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Forum.Data.Models
{
    [Table("forums")]
    public class Forum
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("title")]
        public string Title { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("slug")]
        public string Slug { get; set; }

        [Column("date_created")]
        public DateTime DateCreated { get; set; }

    }
}
