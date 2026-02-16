using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Services;
using TeamProject.Models.Models;

namespace TeamProject.Pages.Admin.Customers
{
    public class CreateModel : PageModel
    {
        private readonly IUnitOfWork _unitOfWork;
        public CreateModel(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public Models.Models.Customer Customer { get; set; }
        public void OnGet()
        {
        }

        public IActionResult OnPost(Models.Models.Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            _unitOfWork.CustomerRepo.Add(customer);
            _unitOfWork.Save();
            return RedirectToPage("Index");
        }
    }
}
