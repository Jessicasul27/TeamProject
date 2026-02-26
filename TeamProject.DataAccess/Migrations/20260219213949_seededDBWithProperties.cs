using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TeamProject.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class seededDBWithProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Properties",
                columns: new[] { "PropertyId", "DescDescription", "FullDescription", "Image", "LandlordId", "Location", "MaxGuests", "PricePerNight", "PropertyType", "Title", "status" },
                values: new object[,]
                {
                    { 1, "Close to ocean", "Beautiful lake view apartment.", "\\Images\\Properties\\bearview.jpg", null, "Wicklow", 4, 120.0, "Apartment", "Bear View Apartment", true },
                    { 2, "Perfect for couples or small families.", "Beautiful modern apartment overlooking the Atlantic Ocean.", "\\Images\\Properties\\seaview.jpg", null, "Galway", 4, 120.0, "Apartment", "Sea View Apartment", true },
                    { 3, "Includes private balcony and skyline views.", "Top-floor penthouse in the heart of Dublin city.", "\\Images\\Properties\\luxurypenthouse.jpg", null, "Dublin", 5, 350.0, "Penthouse", "Luxury City Penthouse", true },
                    { 4, "Peaceful and quiet retreat.", "Traditional Irish cottage surrounded by countryside.", "\\Images\\Properties\\cozycottage.jpg", null, "Donegal", 3, 90.0, "Cottage", "Cozy Country Cottage", true },
                    { 5, "Ideal for business stays or family holidays.", "Spacious townhouse close to Cork city centre.", "\\Images\\Properties\\moderntownhouse.jpg", null, "Cork", 6, 180.0, "Townhouse", "Modern Townhouse", false },
                    { 6, "Great for hiking and outdoor adventures.", "Wooden cabin located directly beside the lake.", "\\Images\\Properties\\lakefrontcabin.jpg", null, "Killarney", 4, 150.0, "Cabin", "Lakefront Cabin", true },
                    { 7, "Private pool and large garden included.", "Luxury villa steps away from the beach.", "\\Images\\Properties\\beachsidevilla.jpg", null, "Wexford", 8, 400.0, "Villa", "Beachside Villa", true },
                    { 8, "Walking distance to shops", "Modern house in city centre.", "\\Images\\Properties\\citycenterhouse.jpg", null, "Dublin", 6, 200.0, "House", "City Centre House", true }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "PropertyId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "PropertyId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "PropertyId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "PropertyId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "PropertyId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "PropertyId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "PropertyId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "PropertyId",
                keyValue: 8);
        }
    }
}
