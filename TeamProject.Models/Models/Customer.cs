using System.ComponentModel.DataAnnotations;

namespace TeamProject.Models.Models;

public class Customer
{
    [Key]
    public int CustomerId { get; set; }
    
    [Required]
    public string? Name { get; set; }
    
    [Required]
    public string? Email { get; set; }
    
    [Required]
    [RegularExpression (@"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$", ErrorMessage = "Invalid Email")]
    public string? PhoneNumber { get; set; }

    public string? CreditCardNo { get; set; }

    public DateTime? ExpiryDate { get; set; }

    public int? CVC {  get; set; }
}