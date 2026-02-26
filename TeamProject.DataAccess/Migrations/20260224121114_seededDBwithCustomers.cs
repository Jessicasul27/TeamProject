using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TeamProject.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class seededDBwithCustomers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "CustomerId", "CVC", "CreditCardNo", "Email", "ExpiryDate", "Name", "PhoneNumber" },
                values: new object[,]
                {
                    { 1, null, null, "JohnDoe@email.com", null, "John Doe", "0894791234" },
                    { 2, null, null, "JoshBigWilly@email.com", null, "Josh Wilis", "0877778990" },
                    { 3, null, null, "Charlton.United@email.com", null, "Booby Charlton", "0871234567" },
                    { 4, null, null, "Sam_S2005@email.com", null, "Sam Smith", "0870976543" },
                    { 5, null, null, "MarkoPolo@email.com", null, "Marko Butler", "0870998754" },
                    { 6, null, null, "Bobby_D@email.com", null, "Bob Dillion", "0898008420" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "CustomerId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "CustomerId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "CustomerId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "CustomerId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "CustomerId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "CustomerId",
                keyValue: 6);
        }
    }
}
