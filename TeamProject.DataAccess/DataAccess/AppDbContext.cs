using Microsoft.EntityFrameworkCore;
using TeamProject.Models.Models;

namespace TeamProject.DataAccess.DataAccess;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        // empty constructor
    }

    public DbSet<Admin> Admins { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Landlord> Landlords { get; set; }
    public DbSet<Property> Properties { set; get; }

    public DbSet<PropertyImage> PropertyImages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // -------------------- PROPERTY SEED DATA --------------------
        modelBuilder.Entity<Property>().HasData(
            new Property
            {
                PropertyId = 1,
                Title = "Bear View Apartment",
                Location = "Wicklow",
                PropertyType = "Apartment",
                PricePerNight = 120,
                MaxGuests = 4,
                Status = true,
                FullDescription = "Beautiful lake view apartment.",
                DescDescription = "Close to ocean",
                DisplayImage = @"\Images\Properties\bearview.jpg"
            },
            new Property
            {
                PropertyId = 2,
                Title = "Sea View Apartment",
                Location = "Galway",
                PropertyType = "Apartment",
                PricePerNight = 120,
                MaxGuests = 4,
                Status = true,
                FullDescription = "Beautiful modern apartment overlooking the Atlantic Ocean.",
                DescDescription = "Perfect for couples or small families.",
                DisplayImage = @"\Images\Properties\seaview.jpg"
            },
            new Property
            {
                PropertyId = 3,
                Title = "Luxury City Penthouse",
                Location = "Dublin",
                PropertyType = "Penthouse",
                PricePerNight = 350,
                MaxGuests = 5,
                Status = true,
                FullDescription = "Top-floor penthouse in the heart of Dublin city.",
                DescDescription = "Includes private balcony and skyline views.",
                DisplayImage = @"\Images\Properties\luxurypenthouse.jpg"
            },
            new Property
            {
                PropertyId = 4,
                Title = "Cozy Country Cottage",
                Location = "Donegal",
                PropertyType = "Cottage",
                PricePerNight = 90,
                MaxGuests = 3,
                Status = true,
                FullDescription = "Traditional Irish cottage surrounded by countryside.",
                DescDescription = "Peaceful and quiet retreat.",
                DisplayImage = @"\Images\Properties\cozycottage.jpg"
            },
            new Property
            {
                PropertyId = 5,
                Title = "Modern Townhouse",
                Location = "Cork",
                PropertyType = "Townhouse",
                PricePerNight = 180,
                MaxGuests = 6,
                Status = false,
                FullDescription = "Spacious townhouse close to Cork city centre.",
                DescDescription = "Ideal for business stays or family holidays.",
                DisplayImage = @"\Images\Properties\moderntownhouse.jpg"
            },
            new Property
            {
                PropertyId = 6,
                Title = "Lakefront Cabin",
                Location = "Killarney",
                PropertyType = "Cabin",
                PricePerNight = 150,
                MaxGuests = 4,
                Status = true,
                FullDescription = "Wooden cabin located directly beside the lake.",
                DescDescription = "Great for hiking and outdoor adventures.",
                DisplayImage = @"\Images\Properties\lakefrontcabin.jpg"
            },
            new Property
            {
                PropertyId = 7,
                Title = "Beachside Villa",
                Location = "Wexford",
                PropertyType = "Villa",
                PricePerNight = 400,
                MaxGuests = 8,
                Status = true,
                FullDescription = "Luxury villa steps away from the beach.",
                DescDescription = "Private pool and large garden included.",
                DisplayImage = @"\Images\Properties\beachsidevilla.jpg"
            },
            new Property
            {
                PropertyId = 8,
                Title = "City Centre House",
                Location = "Dublin",
                PropertyType = "House",
                PricePerNight = 200,
                MaxGuests = 6,
                Status = true,
                FullDescription = "Modern house in city centre.",
                DescDescription = "Walking distance to shops",
                DisplayImage = @"\Images\Properties\citycenterhouse.jpg"
            }
        );

        // -------------------- CUSTOMER SEED DATA --------------------
        modelBuilder.Entity<Customer>().HasData(
            new Customer
            {
                CustomerId = 1,
                Name = "John Doe",
                Email = "JohnDoe@email.com",
                PhoneNumber = "0894791234"
            },
            new Customer
            {
                CustomerId = 2,
                Name = "Josh Wilis",
                Email = "JoshBigWilly@email.com",
                PhoneNumber = "0877778990"
            },
            new Customer
            {
                CustomerId = 3,
                Name = "Booby Charlton",
                Email = "Charlton.United@email.com",
                PhoneNumber = "0871234567"
            },
            new Customer
            {
                CustomerId = 4,
                Name = "Sam Smith",
                Email = "Sam_S2005@email.com",
                PhoneNumber = "0870976543"
            },
            new Customer
            {
                CustomerId = 5,
                Name = "Marko Butler",
                Email = "MarkoPolo@email.com",
                PhoneNumber = "0870998754"
            },
            new Customer
            {
                CustomerId = 6,
                Name = "Bob Dillion",
                Email = "Bobby_D@email.com",
                PhoneNumber = "0898008420"
            }
        );

        base.OnModelCreating(modelBuilder);
    }
}