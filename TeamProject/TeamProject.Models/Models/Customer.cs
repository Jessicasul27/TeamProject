using System.ComponentModel.DataAnnotations;

namespace TeamProject.Models.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        [Required]

        public string? Name { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }

        public string? CreditCardNo { get; set; }

        public DateTime? ExpiryDate { get; set; }

        public int? CVC {  get; set; }

        public int NumBooking { get; set; }
    }   
}
