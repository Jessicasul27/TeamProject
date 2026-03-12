using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Models.Models;
using TeamProject.Services;

namespace TeamProject.Pages.Admin.Customers;

public class CreateModel : PageModel
{
    private readonly UnitOfWork _unitOfWork;

    public CreateModel(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public Customer Customer { get; set; }

    public void OnGet()
    {
    }

    public IActionResult OnPost(Customer customer)
    {
        if (!ModelState.IsValid) return Page();
        _unitOfWork.CustomerRepo.Add(customer);
        _unitOfWork.Save();
        return RedirectToPage("Index");
    }
}