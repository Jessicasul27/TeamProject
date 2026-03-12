using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Models.Models;
using TeamProject.Services;

namespace TeamProject.Pages.Customers;

// this entire page is only accessible to authorized users + users with "Customer" role
[Authorize(Roles = "Customer")]
public class BookingModel : PageModel
{
    private readonly UnitOfWork _unitOfWork;
    private readonly UserManager<User> _userManager;

    public BookingModel(UserManager<User> userManager, UnitOfWork unitOfWork)
    {
        _userManager = userManager;
        _unitOfWork = unitOfWork;
    }

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

    public void OnGet(string propertyId, string checkIn, string checkOut, string totalPrice)
    {
        PropertyId = int.Parse(propertyId);
        CheckInDate = DateTime.Parse(checkIn);
        CheckOutDate = DateTime.Parse(checkOut);
        TotalPrice = decimal.Parse(totalPrice);
    }

    public IActionResult OnPostAsync()
    {
        Console.WriteLine("1");

        foreach (var kvp in ModelState)
        {
            var key = kvp.Key;
            var state = kvp.Value;

            foreach (var error in state.Errors)
            {
                Console.WriteLine($"ModelState error on '{key}': {error.ErrorMessage}");
                if (error.Exception != null)
                    Console.WriteLine(error.Exception);
            }
        }

        if (!ModelState.IsValid)
            return Page();

        Console.WriteLine("2");

        // Mock payment success
        var paymentSuccess = true;

        // if (!paymentSuccess)
        // {
        //     ModelState.AddModelError("", "Payment failed.");
        //     return Page();
        // }

        var newBooking = new Booking
        {
            PropertyId = PropertyId,
            CheckInDate = CheckInDate.Value,
            CheckOutDate = CheckOutDate.Value,
            BookingPrice = TotalPrice,
            CustomerUserId = _userManager.GetUserId(User)!
        };

        Console.WriteLine($"3 {_userManager.GetUserId(User)!}");

        _unitOfWork.BookingRepo.Add(newBooking);
        _unitOfWork.Save();

        Console.WriteLine("4");

        return RedirectToPage("/Index");
    }
}