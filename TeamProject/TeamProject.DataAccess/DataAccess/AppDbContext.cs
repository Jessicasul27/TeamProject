using Microsoft.EntityFrameworkCore;
using TeamProject.Models.Models;

namespace TeamProject.DataAccess.DataAccess
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

    public DbSet<Property> Properties { get; set; }

    public DbSet<Booking>  Bookings { get; set; }

    public DbSet<Customer> Customers { get; set; }

    public DbSet<LandLord> LandLords { get; set; }

    }
}


