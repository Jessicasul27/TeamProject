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

        public DbSet<Booking> Bookings { get; set; }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<LandLord> LandLords { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Property>().HasData(
            new Property
            {
                PropertyId = 1,
                Title = "Bear View Apartment",
                Location = "Wicklow",
                PropertyType = "Apartment",
                PricePerNight = 120,
                MaxGuests = 4,
                status = true,
                FullDescription = "Beautiful lake view apartment.",
                DescDescription = "Close to ocean",
                Image = @"\Images\Properties\bearview.jpg"
            },
                new Property
                {
                    PropertyId = 2,
                    Title = "Sea View Apartment",
                    Location = "Galway",
                    PropertyType = "Apartment",
                    PricePerNight = 120,
                    MaxGuests = 4,
                    status = true,
                    FullDescription = "Beautiful modern apartment overlooking the Atlantic Ocean.",
                    DescDescription = "Perfect for couples or small families.",
                    Image = @"\Images\Properties\seaview.jpg"
                },

            new Property
            {
                PropertyId = 3,
                Title = "Luxury City Penthouse",
                Location = "Dublin",
                PropertyType = "Penthouse",
                PricePerNight = 350,
                MaxGuests = 5,
                status = true,
                FullDescription = "Top-floor penthouse in the heart of Dublin city.",
                DescDescription = "Includes private balcony and skyline views.",
                Image = @"\Images\Properties\luxurypenthouse.jpg"
            },

            new Property
            {
                PropertyId = 4,
                Title = "Cozy Country Cottage",
                Location = "Donegal",
                PropertyType = "Cottage",
                PricePerNight = 90,
                MaxGuests = 3,
                status = true,
                FullDescription = "Traditional Irish cottage surrounded by countryside.",
                DescDescription = "Peaceful and quiet retreat.",
                Image = @"\Images\Properties\cozycottage.jpg"
            },

            new Property
            {
                PropertyId = 5,
                Title = "Modern Townhouse",
                Location = "Cork",
                PropertyType = "Townhouse",
                PricePerNight = 180,
                MaxGuests = 6,
                status = false,
                FullDescription = "Spacious townhouse close to Cork city centre.",
                DescDescription = "Ideal for business stays or family holidays.",
                Image = @"\Images\Properties\moderntownhouse.jpg"
            },

            new Property
            {
                PropertyId = 6,
                Title = "Lakefront Cabin",
                Location = "Killarney",
                PropertyType = "Cabin",
                PricePerNight = 150,
                MaxGuests = 4,
                status = true,
                FullDescription = "Wooden cabin located directly beside the lake.",
                DescDescription = "Great for hiking and outdoor adventures.",
                Image = @"\Images\Properties\lakefrontcabin.jpg"
            },

            new Property
            {
                PropertyId = 7,
                Title = "Beachside Villa",
                Location = "Wexford",
                PropertyType = "Villa",
                PricePerNight = 400,
                MaxGuests = 8,
                status = true,
                FullDescription = "Luxury villa steps away from the beach.",
                DescDescription = "Private pool and large garden included.",
                Image = @"\Images\Properties\beachsidevilla.jpg"
            },
                new Property
                {
                    PropertyId = 8,
                    Title = "City Centre House",
                    Location = "Dublin",
                    PropertyType = "House",
                    PricePerNight = 200,
                    MaxGuests = 6,
                    status = true,
                    FullDescription = "Modern house in city centre.",
                    DescDescription = "Walking distance to shops",
                    Image = @"\Images\Properties\citycenterhouse.jpg"
                }
            );
        }
    }
}
        



