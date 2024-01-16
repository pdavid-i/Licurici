using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MyDbContext : IdentityDbContext<User>
    {
        public MyDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Word> Words { get; set; }
        public DbSet<WordInteraction> Interactions { get; set; }
        public DbSet<PasswordResetToken> Tokens {get; set;}
        public DbSet<Thought> Thoughts {get; set;}


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                    new IdentityRole { Name = "Member", NormalizedName = "MEMBER" }
                );
        }
    }
}