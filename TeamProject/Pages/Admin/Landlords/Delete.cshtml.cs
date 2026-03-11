using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.IdentityModel.Tokens;
using TeamProject.Services;
using TeamProject.Models.Models;

namespace TeamProject.Pages.Admin.Landlords;

[BindProperties]
public class DeleteModel : PageModel
{
    private readonly UnitOfWork _unitOfWork;

    public DeleteModel(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public Landlord Landlords { get; set; }

    public void OnGet(string id)
    {
        Landlords = _unitOfWork.LandlordRepo.Get(id);
    }

    public IActionResult OnPost()
    {
        if (Landlords == null || Landlords.UserId.IsNullOrEmpty()) return BadRequest();

        var landlordFromDB = _unitOfWork.LandlordRepo.Get(Landlords.UserId);

        if (landlordFromDB == null) return NotFound();

        _unitOfWork.LandlordRepo.Delete(landlordFromDB);
        _unitOfWork.Save();

        return RedirectToPage("Index");
    }
}