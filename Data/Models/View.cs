using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BCrypt.Net;

namespace View.Data.Models
{
    [Table("views")]
    public class View
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("topic_id")]
        public int TopicId { get; set; }
        [Column("user_id")]
        public int UserId { get; set; }
        [Column("visit_timestamp")]
        public DateTime VisitTimestamp { get; set; }
    }
}