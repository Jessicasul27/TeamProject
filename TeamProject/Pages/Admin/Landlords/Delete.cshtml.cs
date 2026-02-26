using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Services;
using TeamProject.Models.Models;

namespace TeamProject.Pages.Admin.Landlords;

[BindProperties]
public class DeleteModel : PageModel
{
    private readonly IUnitOfWork _unitOfWork;

    public DeleteModel(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public Landlord Landlords { get; set; }

    public void OnGet(int id)
    {
        Landlords = _unitOfWork.LandlordRepo.Get(id);
    }

    public IActionResult OnPost()
    {
        if (Landlords == null || Landlords.LandlordId == 0) return BadRequest();

        var landlordFromDB = _unitOfWork.LandlordRepo.Get(Landlords.LandlordId);

        if (landlordFromDB == null) return NotFound();

        _unitOfWork.LandlordRepo.Delete(landlordFromDB);
        _unitOfWork.Save();

        return RedirectToPage("Index");
    }
}