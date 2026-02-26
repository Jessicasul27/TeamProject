using System.ComponentModel.DataAnnotations;

namespace TeamProject.Models.Models;

public class Landlord
{
    [Key]
    public int LandlordId { get; set; }
    
    [Required]
    public string? Name { get; set; }
    
    [Required]
    public string? Email { get; set; }
    
    [Required]
    public string? PhoneNo { get; set; }
    
    [Required]
    public double LandlordShare { get; set;}

    public double Income { get; set; }

    public Property? Property { get; set; }

    public List<Property>? Properties { get; set; }
}