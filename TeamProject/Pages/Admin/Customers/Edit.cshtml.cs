using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Services;
using TeamProject.Models.Models;

namespace TeamProject.Pages.Admin.Customers;

public class EditModel : PageModel
{
    private readonly UnitOfWork _unitOfWork;

    public EditModel(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public Customer Customer { get; set; }

    public void OnGet(string id)
    {
        Customer = _unitOfWork.CustomerRepo.Get(id);
    }

    public IActionResult OnPost(Customer customer)
    {
        if (ModelState.IsValid)
        {
            _unitOfWork.CustomerRepo.Update(customer);
            _unitOfWork.Save();
        }

        return RedirectToPage("Index");
    }
}