using User.Data.Models;
using Forum.Data.Models;
using Topic.Data.Models;

using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    public DbSet<User.Data.Models.User> Users { get; set; }
    public DbSet<User.Data.Models.RefreshToken> RefreshTokens { get; set; }
    public DbSet<Forum.Data.Models.Forum> Forums { get; set; }
    public DbSet<Topic.Data.Models.Topic> Topics { get; set; }



}