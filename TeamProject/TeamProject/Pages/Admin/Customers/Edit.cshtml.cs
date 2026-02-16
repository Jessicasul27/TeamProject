using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Services;

namespace TeamProject.Pages.Admin.Customer
{
    public class EditModel : PageModel
    {
        private readonly IUnitOfWork _unitOfWork;
        public EditModel(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public Models.Models.Customer Customer { get; set; }
        public void OnGet(int id)
        {
            Customer = _unitOfWork.CustomerRepo.Get(id);
        }
        public IActionResult OnPost(Models.Models.Customer customer)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.CustomerRepo.Update(customer);
                _unitOfWork.Save();
            }
            return RedirectToPage("Index");
        }
    }
}
