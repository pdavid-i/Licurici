using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Word> Words { get; set; }
    }
}