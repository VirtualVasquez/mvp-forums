using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Forum.Data.Models
{
    [Table("forums")]
    public class Forum
    {
        [Column("id")]
        public int Id { get; }

        [Column("title")]
        public string Title { get; }

        [Column("description")]
        public string Description { get; }

        [Column("date_created")]
        public DateTime DateCreated { get; }

    }
}
