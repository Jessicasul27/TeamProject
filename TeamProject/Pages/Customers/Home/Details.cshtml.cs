using Microsoft.AspNetCore.Mvc;
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

    public void OnGet(int id)
    {
        Property = _unitOfWork.PropertyRepo.Get(id);

        var images = _unitOfWork.PropertyImageRepo
            .GetAll()
            .Where(i => i.PropertyId == id)
            .ToList();

        Property.Images = images;
    }
}