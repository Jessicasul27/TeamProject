using System.ComponentModel.DataAnnotations;

namespace TeamProject.Models.Models;

public class Booking
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public DateTime CheckInDate { get; set; }

    public DateTime CheckOutDate { get; set; }

    public decimal BookingPrice { get; set; }

    public int PropertyId { get; set; }
    public Property Property { get; set; } = null!;

    public string CustomerUserId { get; set; } = string.Empty;
    public Customer Customer { get; set; } = null!;
}