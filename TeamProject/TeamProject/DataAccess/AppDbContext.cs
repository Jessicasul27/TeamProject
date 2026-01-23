using Microsoft.EntityFrameworkCore;
using TeamProject.Models;


namespace TeamProject.DataAccess
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

    public DbSet<Property> Properties { get; set; }

    }
}


