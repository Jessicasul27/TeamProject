using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TeamProject.Models.Models;

namespace TeamProject.DataAccess.DataAccess;

public static class Seeder
{
    public static async Task SeedRolesAndUsersAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();

        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        string[] roles = ["Admin", "Customer", "Landlord"];

        // seed roles for ASP.NET Identity
        foreach (var role in roles)
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));

        // seed a default landlord for seeded properties
        var landlordUser =
            await EnsureUserAsync(userManager, "Thomas", "Edison", "landlord@staycraft.ie", "0870000000", "password");
        await EnsureRoleAsync(userManager, landlordUser, "Landlord");

        var landlord = await db.Landlords.FindAsync(landlordUser.Id);
        if (landlord == null)
            db.Landlords.Add(new Landlord
            {
                UserId = landlordUser.Id,
                LandlordShare = 0,
                Income = 0
            });

        // seed a default admin
        var adminUser =
            await EnsureUserAsync(userManager, "Mike", "Oxmall", "admin@staycraft.ie", "0871111111", "password");
        await EnsureRoleAsync(userManager, adminUser, "Admin");

        // seed customers
        var customers = new[]
        {
            new { Email = "JohnDoe@email.com", Phone = "0894791234", FirstName = "John", LastName = "Doe" },
            new { Email = "JoshBigWilly@email.com", Phone = "0877778990", FirstName = "Josh", LastName = "Wilis" },
            new
            {
                Email = "Charlton.United@email.com", Phone = "0871234567", FirstName = "Booby", LastName = "Charlton"
            },
            new { Email = "Sam_S2005@email.com", Phone = "0870976543", FirstName = "Sam", LastName = "Smith" },
            new { Email = "MarkoPolo@email.com", Phone = "0870998754", FirstName = "Marko", LastName = "Butler" },
            new { Email = "Bobby_D@email.com", Phone = "0898008420", FirstName = "Bob", LastName = "Dillion" }
        };

        foreach (var customer in customers)
        {
            var user = await EnsureUserAsync(userManager, customer.FirstName, customer.LastName, customer.Email,
                customer.Phone, "password");
            await EnsureRoleAsync(userManager, user, "Customer");

            var existingCustomer = await db.Customers.FindAsync(user.Id);
            if (existingCustomer == null)
                db.Customers.Add(new Customer
                {
                    UserId = user.Id,
                    CardNo = null,
                    CardExpiryDate = null
                });
        }

        // seed properties (only if there are no properties)
        if (!await db.Properties.AnyAsync())
            db.Properties.AddRange(
                new Property
                {
                    Title = "Bear View Apartment",
                    Location = "Wicklow",
                    PropertyType = "Apartment",
                    PricePerNight = 120,
                    MaxGuests = 4,
                    Status = true,
                    FullDescription = "Beautiful lake view apartment.",
                    DescDescription = "Close to ocean",
                    Image = @"\Images\Properties\bearview.jpg",
                    LandlordUserId = landlordUser.Id
                },
                new Property
                {
                    Title = "Sea View Apartment",
                    Location = "Galway",
                    PropertyType = "Apartment",
                    PricePerNight = 120,
                    MaxGuests = 4,
                    Status = true,
                    FullDescription = "Beautiful modern apartment overlooking the Atlantic Ocean.",
                    DescDescription = "Perfect for couples or small families.",
                    Image = @"\Images\Properties\seaview.jpg",
                    LandlordUserId = landlordUser.Id
                },
                new Property
                {
                    Title = "Luxury City Penthouse",
                    Location = "Dublin",
                    PropertyType = "Penthouse",
                    PricePerNight = 350,
                    MaxGuests = 5,
                    Status = true,
                    FullDescription = "Top-floor penthouse in the heart of Dublin city.",
                    DescDescription = "Includes private balcony and skyline views.",
                    Image = @"\Images\Properties\luxurypenthouse.jpg",
                    LandlordUserId = landlordUser.Id
                },
                new Property
                {
                    Title = "Cozy Country Cottage",
                    Location = "Donegal",
                    PropertyType = "Cottage",
                    PricePerNight = 90,
                    MaxGuests = 3,
                    Status = true,
                    FullDescription = "Traditional Irish cottage surrounded by countryside.",
                    DescDescription = "Peaceful and quiet retreat.",
                    Image = @"\Images\Properties\cozycottage.jpg",
                    LandlordUserId = landlordUser.Id
                },
                new Property
                {
                    Title = "Modern Townhouse",
                    Location = "Cork",
                    PropertyType = "Townhouse",
                    PricePerNight = 180,
                    MaxGuests = 6,
                    Status = false,
                    FullDescription = "Spacious townhouse close to Cork city centre.",
                    DescDescription = "Ideal for business stays or family holidays.",
                    Image = @"\Images\Properties\moderntownhouse.jpg",
                    LandlordUserId = landlordUser.Id
                },
                new Property
                {
                    Title = "Lakefront Cabin",
                    Location = "Killarney",
                    PropertyType = "Cabin",
                    PricePerNight = 150,
                    MaxGuests = 4,
                    Status = true,
                    FullDescription = "Wooden cabin located directly beside the lake.",
                    DescDescription = "Great for hiking and outdoor adventures.",
                    Image = @"\Images\Properties\lakefrontcabin.jpg",
                    LandlordUserId = landlordUser.Id
                },
                new Property
                {
                    Title = "Beachside Villa",
                    Location = "Wexford",
                    PropertyType = "Villa",
                    PricePerNight = 400,
                    MaxGuests = 8,
                    Status = true,
                    FullDescription = "Luxury villa steps away from the beach.",
                    DescDescription = "Private pool and large garden included.",
                    Image = @"\Images\Properties\beachsidevilla.jpg",
                    LandlordUserId = landlordUser.Id
                },
                new Property
                {
                    Title = "City Centre House",
                    Location = "Dublin",
                    PropertyType = "House",
                    PricePerNight = 200,
                    MaxGuests = 6,
                    Status = true,
                    FullDescription = "Modern house in city centre.",
                    DescDescription = "Walking distance to shops",
                    Image = @"\Images\Properties\citycenterhouse.jpg",
                    LandlordUserId = landlordUser.Id
                }
            );

        await db.SaveChangesAsync();
    }

    private static async Task<User> EnsureUserAsync(
        UserManager<User> userManager,
        string firstName,
        string lastName,
        string email,
        string phoneNumber,
        string password)
    {
        var user = await userManager.FindByEmailAsync(email);

        if (user != null) return user;

        user = new User
        {
            FirstName = firstName,
            LastName = lastName,
            UserName = email.Substring(0, email.IndexOf('@')),
            Email = email,
            PhoneNumber = phoneNumber,
            EmailConfirmed = true
        };

        await userManager.CreateAsync(user, password);

        return user;
    }

    private static async Task EnsureRoleAsync(UserManager<User> userManager, User user, string role)
    {
        if (!await userManager.IsInRoleAsync(user, role)) await userManager.AddToRoleAsync(user, role);
    }
}