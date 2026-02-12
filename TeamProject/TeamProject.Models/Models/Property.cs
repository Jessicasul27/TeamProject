using System.ComponentModel.DataAnnotations;

namespace TeamProject.Models.Models
{
    public class Property
    {
        [Key]
        public int PropertyId { get; set; }
        [Required]
        public string? Title { get; set; }

        public string?FullDescription { get; set; }

        public string? DescDescription { get; set; }

        public string? Location { get; set; }

        public double? PricePerNight { get; set; }

        public int MaxGuests { get; set; }

        public string? PropertyType { get; set; }

        public bool status { get; set; }


    }
}
