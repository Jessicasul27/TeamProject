using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeamProject.Models.Models;

public class Booking
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public DateTime CheckInDate { get; set; }

    public DateTime CheckOutDate { get; set; }

    public decimal BookingPrice { get; set; }

    public int PropertyId { get; set; }

    [ForeignKey("PropertyId")]
    [ValidateNever]
    public Property Property { get; set; } = null!;

    public string CustomerUserId { get; set; } = string.Empty;

    [ForeignKey("CustomerUserId")]
    [ValidateNever]
    public Customer Customer { get; set; } = null!;
}