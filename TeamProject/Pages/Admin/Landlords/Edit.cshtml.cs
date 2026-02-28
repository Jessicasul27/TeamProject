using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Services;
using TeamProject.Models.Models;

namespace TeamProject.Pages.Admin.Landlords;

[BindProperties]
public class EditModel : PageModel
{
    private readonly IUnitOfWork _unitOfWork;

    public EditModel(IUnitOfWork unitOfWork)
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