using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Models.Models;
using TeamProject.Services;

namespace TeamProject.Pages.Customers.Home;

public class DetailsModel : PageModel
{
    private readonly IUnitOfWork _unitOfWork;

    public DetailsModel(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public Property Property { get; set; }

    public void OnGet(string id)
    {
        Property = _unitOfWork.PropertyRepo.Get(id);
    }
}