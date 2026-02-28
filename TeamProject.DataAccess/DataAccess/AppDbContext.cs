using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TeamProject.Models.Models;

namespace TeamProject.DataAccess.DataAccess;

public class AppDbContext : IdentityDbContext<User>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Admin> Admins { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Landlord> Landlords { get; set; }
    public DbSet<Property> Properties { set; get; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Customer>()
            .HasOne(customer => customer.User)
            .WithOne(user => user.Customer)
            .HasForeignKey<Customer>(customer => customer.UserId);

        modelBuilder.Entity<Landlord>()
            .HasOne(landlord => landlord.User)
            .WithOne(user => user.Landlord)
            .HasForeignKey<Landlord>(landlord => landlord.UserId);

        modelBuilder.Entity<Property>()
            .HasOne(property => property.Landlord)
            .WithMany(landlord => landlord.Properties)
            .HasForeignKey(property => property.LandlordUserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Booking>()
            .HasOne(booking => booking.Customer)
            .WithMany()
            .HasForeignKey(booking => booking.CustomerUserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Booking>()
            .HasOne(booking => booking.Property)
            .WithMany()
            .HasForeignKey(booking => booking.PropertyId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Property>()
            .Property(property => property.PricePerNight)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Booking>()
            .Property(booking => booking.BookingPrice)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Landlord>()
            .Property(landlord => landlord.LandlordShare)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Landlord>()
            .Property(landlord => landlord.Income)
            .HasPrecision(18, 2);
    }
}