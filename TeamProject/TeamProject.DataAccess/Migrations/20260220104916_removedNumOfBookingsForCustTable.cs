using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeamProject.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class removedNumOfBookingsForCustTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumBooking",
                table: "Customers");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNo",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "PhoneNo",
                table: "Bookings");

            migrationBuilder.AddColumn<int>(
                name: "NumBooking",
                table: "Customers",
                type: "int",
                nullable: true);
        }
    }
}
