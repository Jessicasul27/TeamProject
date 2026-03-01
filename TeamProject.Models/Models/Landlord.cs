using System.ComponentModel.DataAnnotations;

namespace TeamProject.Models.Models;

public class Landlord
{
    // FK to AspNetUsers.Id (Identity auth)
    [Key]
    public string UserId { get; set; } = string.Empty;

    public User User { get; set; } = null!;

    [Required]
    public decimal LandlordShare { get; set; }

    public decimal Income { get; set; }

    public List<Property>? Properties { get; set; }
}