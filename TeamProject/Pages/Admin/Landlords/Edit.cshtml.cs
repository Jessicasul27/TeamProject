using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Services;
using TeamProject.Models.Models;

namespace TeamProject.Pages.Admin.Landlords;

[BindProperties]
public class EditModel : PageModel
{
    private readonly UnitOfWork _unitOfWork;

    public EditModel(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public Landlord Landlord { get; set; }

    public void OnGet(string id)
    {
        Landlord = _unitOfWork.LandlordRepo.Get(id);
    }

    public IActionResult OnPost()
    {
        if (ModelState.IsValid)
        {
            _unitOfWork.LandlordRepo.Update(Landlord);
            _unitOfWork.Save();
        }

        return RedirectToPage("Index");
    }
}