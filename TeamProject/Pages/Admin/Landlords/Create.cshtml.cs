using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Services;
using TeamProject.Models.Models;

namespace TeamProject.Pages.Admin.Landlords;

public class CreateModel : PageModel
{
    private readonly UnitOfWork _unitOfWork;

    public CreateModel(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [BindProperty]
    public Landlord Landlords { get; set; }

    public void OnGet()
    {
    }

    public IActionResult OnPost()
    {
        if (!ModelState.IsValid) return Page();
        _unitOfWork.LandlordRepo.Add(Landlords);
        _unitOfWork.Save();
        return RedirectToPage("Index");
    }
}