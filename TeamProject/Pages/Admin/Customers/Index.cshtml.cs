using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Models.Models;
using TeamProject.Services;

namespace TeamProject.Pages.Admin.Customers;

public class IndexModel : PageModel
{
    private readonly UnitOfWork _unitOfWork;
    public IEnumerable<Customer> Customers = new List<Customer>();

    public IndexModel(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public void OnGet()
    {
        Customers = _unitOfWork.CustomerRepo.GetAll();
    }
}