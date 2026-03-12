using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Models.Models;
using TeamProject.Services;

namespace TeamProject.Pages.Admin.Customers;

public class DeleteModel : PageModel
{
    private readonly UnitOfWork _unitOfWork;

    public DeleteModel(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [BindProperty]
    public Customer Customer { get; set; }

    public void OnGet(string id)
    {
        Customer = _unitOfWork.CustomerRepo.Get(id);
    }

    public IActionResult OnPost()
    {
        var customerFromDb = _unitOfWork.CustomerRepo.Get(Customer.UserId);

        if (customerFromDb == null) return NotFound();

        _unitOfWork.CustomerRepo.Delete(customerFromDb);
        _unitOfWork.Save();

        return RedirectToPage("Index");
    }

    //public Customer Customer { get; set; }
    //public void OnGet(int id)
    //{
    //    Customer = _unitOfWork.CustomerRepo.Get(id);
    //}
    //public IActionResult OnPost(Customer customer)
    //{
    //    if (ModelState.IsValid)
    //    {
    //        _unitOfWork.CustomerRepo.Delete(customer);
    //        _unitOfWork.Save();
    //    }
    //    return RedirectToPage("Index");
    //}
}