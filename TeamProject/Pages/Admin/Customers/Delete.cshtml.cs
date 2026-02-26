using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Services;
using TeamProject.Models.Models;


namespace TeamProject.Pages.Admin.Customers
{
    public class DeleteModel : PageModel
    {
        private readonly IUnitOfWork _unitOfWork;
        public DeleteModel(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [BindProperty]
        public Customer Customer { get; set; }

        public void OnGet(int id)
        {
            Customer = _unitOfWork.CustomerRepo.Get(id);
        }

        public IActionResult OnPost()
        {
            var customerFromDb = _unitOfWork.CustomerRepo.Get(Customer.CustomerId);

            if (customerFromDb == null)
            {
                return NotFound();
            }

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
}

