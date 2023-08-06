using User.Data.Models;
using Forum.Data.Models;
using Topic.Data.Models;
using View.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    public DbSet<User.Data.Models.User> Users { get; set; }
    public DbSet<User.Data.Models.RefreshToken> RefreshTokens { get; set; }
    public DbSet<Forum.Data.Models.Forum> Forums { get; set; }
    public DbSet<Topic.Data.Models.Topic> Topics { get; set; }
    public DbSet<Post.Data.Models.Post> Posts { get; set; }
    public DbSet<View.Data.Models.View> Views { get; set; }
}