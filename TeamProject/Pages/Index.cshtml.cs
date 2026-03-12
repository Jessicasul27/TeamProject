using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Models.Models;
using TeamProject.Services;

namespace TeamProject.Pages;

public class IndexModel : PageModel
{
    private readonly UnitOfWork _unitOfWork;

    public IndexModel(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public IEnumerable<Property> listOfProperties { get; set; }

    [BindProperty(SupportsGet = true)]
    public string SearchString { get; set; }

    public void OnGet()
    {
        listOfProperties = _unitOfWork.PropertyRepo.GetAll().Where(p => p.Status == PropertyStatus.Active);

        if (!string.IsNullOrEmpty(SearchString))
            listOfProperties = listOfProperties.Where(p =>
                p.Location != null && p.Location.Contains(SearchString, StringComparison.OrdinalIgnoreCase));
    }
}