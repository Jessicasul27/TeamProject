using System.ComponentModel.DataAnnotations;

namespace TeamProject.Models.Models
{
    public class Property
    {
        [Key]
        public int PropertyId { get; set; }
        [Required]
        [StringLength(100, ErrorMessage = "Title must be under 100 characters.")]
        public string? Title { get; set; }
        [StringLength(1000, ErrorMessage = "Full description must be under 1000 characters.")]
        public string?FullDescription { get; set; }
        [StringLength(100, ErrorMessage = "Short description must be under 100 characters.")]
        public string? DescDescription { get; set; }
        [RegularExpression(@"^[a-zA-Z\s,]+$",
        ErrorMessage = "Location contains invalid characters.")]
        public string? Location { get; set; }
        [Range(0.01, 10000, ErrorMessage = "Price must be greater than 0.")]
        public double? PricePerNight { get; set; }
        [Range(1, 50)]
        public int MaxGuests { get; set; }

        public string? PropertyType { get; set; }

        public bool status { get; set; }

        public string? Image { get; set; }


    }
}
