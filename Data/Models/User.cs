using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BCrypt.Net;

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

        // Hash the password before storing it in the database
        public void HashPassword(string password){
            this.Password = BCrypt.Net.BCrypt.HashPassword(password);
        }
        // Verify hashed password
        public bool VerifyPassword(string password){
            return BCrypt.Net.BCrypt.Verify(password, this.Password);
        }
    }
    /*
     * DO NOT NEED THIS HERE
     * WILL NEED THIS WITHIN RESPECTIVE CONTROLLER
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
    */
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