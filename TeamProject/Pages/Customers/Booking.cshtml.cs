using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using TeamProject.Models.Models;
using TeamProject.Services;

namespace TeamProject.Pages.Customers
{
    public class BookingModel : PageModel
    {
        private readonly IUnitOfWork _unitOfWork;

        public BookingModel(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // Card details
        [BindProperty]
        [Required]
        [RegularExpression(@"^\d{12,19}$", ErrorMessage = "Card number must be 12 to 19 digits.")]
        public string CardNo { get; set; }

        [BindProperty]
        [Required]
        [RegularExpression(@"^(0[1-9]|1[0-2])\/\d{2}$", ErrorMessage = "Expiry must be in MM/YY format.")]
        public string ExpiryDate { get; set; }

        [BindProperty]
        [Required]
        [RegularExpression(@"^\d{3,4}$", ErrorMessage = "CVC must be 3 or 4 digits.")]
        public string CVC { get; set; }

        // Booking info
        [BindProperty(SupportsGet = true)]
        public DateTime? CheckInDate { get; set; }

        [BindProperty(SupportsGet = true)]
        public DateTime? CheckOutDate { get; set; }

        [BindProperty(SupportsGet = true)]
        public int PropertyId { get; set; }

        [BindProperty(SupportsGet = true)]
        public decimal TotalPrice { get; set; } 
        [BindProperty]
        public Booking Booking { get; set; }

        public void OnGet(string propertyId, string checkIn, string checkOut, string totalPrice)
        {
            PropertyId = int.Parse(propertyId);
            CheckInDate = DateTime.Parse(checkIn);
            CheckOutDate = DateTime.Parse(checkOut);
            TotalPrice = decimal.Parse(totalPrice);

            Booking = new Booking
            {
                PropertyId = PropertyId,
                CheckInDate = CheckInDate.Value,
                CheckOutDate = CheckOutDate.Value,
                BookingPrice = TotalPrice
            };
        }

        public IActionResult OnPost()
        {
            if (!ModelState.IsValid)
                return Page();

            // Mock payment success
            bool paymentSuccess = true;

            if (!paymentSuccess)
            {
                ModelState.AddModelError("", "Payment failed.");
                return Page();
            }

            // Create booking
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                ModelState.AddModelError("", "You must be logged in to make a booking.");
                return Page();
            }

            var newBooking = new Booking
            {
                PropertyId = PropertyId,
                CheckInDate = CheckInDate.Value,
                CheckOutDate = CheckOutDate.Value,
                BookingPrice = TotalPrice,
                CustomerUserId = userId
            };

            _unitOfWork.BookingRepo.Add(newBooking);
            _unitOfWork.Save();

            return RedirectToPage("/Index");
        }
    }
}