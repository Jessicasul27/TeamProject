using System.ComponentModel.DataAnnotations;
using static TeamProject.Models.Models.PropertyStatus;
using static TeamProject.Models.Models.PropertyType;

namespace TeamProject.Models.Models;


public class Property
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(100, ErrorMessage = "Title must be under 100 characters.")]
    public string? Title { get; set; }

    [StringLength(1000, ErrorMessage = "Full description must be under 1000 characters.")]
    public string? FullDescription { get; set; }

    [StringLength(100, ErrorMessage = "Short description must be under 100 characters.")]
    public string? DescDescription { get; set; }

    [RegularExpression(@"^[a-zA-Z\s,]+$", ErrorMessage = "Location contains invalid characters.")]
    public string? Location { get; set; }

    [Range(0.01, 10000, ErrorMessage = "Price must be greater than 0.")]
    public decimal PricePerNight { get; set; }

    [Required]
    [Range(1, 50, ErrorMessage = "Max guests must not exceed 50")]
    public int MaxGuests { get; set; }

    public TypeOfProperty PropertyType { get; set; }

    public Status Status { get; set; }

    [Required(ErrorMessage = "Display image is required.")]
    public string DisplayImage { get; set; } = string.Empty;

    public ICollection<PropertyImage> Images { get; set; } = new List<PropertyImage>();

    public string? LandlordUserId { get; set; }
    public Landlord? Landlord { get; set; }
}