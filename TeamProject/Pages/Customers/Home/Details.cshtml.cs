using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Models.Models;
using TeamProject.Services;

namespace TeamProject.Pages.Customers.Home;

public class DetailsModel : PageModel
{
    private readonly UnitOfWork _unitOfWork;

    public DetailsModel(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public Property Property { get; set; }

    [BindProperty]
    public DateTime? CheckInDate { get; set; }

    [BindProperty]
    public DateTime? CheckOutDate { get; set; }

    public string ErrorMessage { get; set; }

    public void OnGet(int id)
    {
        LoadProperty(id);
    }

    public IActionResult OnPost(int id)
    {
        LoadProperty(id);

        if (CheckInDate == null || CheckOutDate == null)
        {
            ErrorMessage = "Please select check-in and check-out dates.";
            return Page();
        }

        if (CheckOutDate <= CheckInDate)
        {
            ErrorMessage = "Check-out must be after check-in.";
            return Page();
        }

        if (!User.Identity.IsAuthenticated || !User.IsInRole("Customer"))
        {
            ErrorMessage = "You need to be logged in as a Customer to book this property.";
            return Page();
        }

        var numberOfNights = (CheckOutDate.Value - CheckInDate.Value).TotalDays;
        var totalPrice = Property.PricePerNight * (decimal)numberOfNights;

        return RedirectToPage("/Customers/Booking", new
        {
            propertyId = id,
            checkIn = CheckInDate.Value.ToString("yyyy-MM-dd"),
            checkOut = CheckOutDate.Value.ToString("yyyy-MM-dd"),
            totalPrice = totalPrice.ToString("F2")
        });
    }

    private void LoadProperty(int id)
    {
        Property = _unitOfWork.PropertyRepo.Get(id);

        var images = _unitOfWork.PropertyImageRepo
            .GetAll()
            .Where(i => i.PropertyId == id)
            .ToList();

        if (Property != null)
            Property.Images = images;
    }
}