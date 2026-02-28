using System.ComponentModel.DataAnnotations;

namespace TeamProject.Models.Models;

public class Customer
{
    // FK to AspNetUsers.Id (Identity auth)
    [Key]
    public string UserId { get; set; } = string.Empty;

    public User User { get; set; } = null!;

    public string? CardNo { get; set; }
    public DateTime? CardExpiryDate { get; set; }
}