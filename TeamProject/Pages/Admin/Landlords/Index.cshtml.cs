using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Services;
using TeamProject.Models.Models;

namespace TeamProject.Pages.Admin.Landlords;

public class IndexModel : PageModel
{
    private readonly IUnitOfWork _unitOfWork;
    public IEnumerable<Landlord> Landlords;

    public IndexModel(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public void OnGet()
    {
        Landlords = _unitOfWork.LandlordRepo.GetAll();
    }
}