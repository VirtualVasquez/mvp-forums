using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace User.Data.Models
{
    [Table("users")]
    public class User
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("email")]
        public string Email { get; set; } = null!;
        
        [Column("username")]
        public string Username { get; set; } = null!;

        [Column("password")]
        public string Password { get; set; } = null!;

        [Column("createddate")]
        public DateTime CreatedDate { get; set; }
    }
    public class PostAuthor
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("username")]
        public string Username { get; set; } = null!;

        [Column("createddate")]
        public DateTime CreatedDate { get; set; }
        // Add any additional properties relevant to the post author
    }
    [Table("refresh_tokens")]
    public class RefreshToken
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("token")]
        public string Token { get; set; } // Make sure this property is present
        [Column("user_id")]
        public int UserId { get; set; }
    }
}