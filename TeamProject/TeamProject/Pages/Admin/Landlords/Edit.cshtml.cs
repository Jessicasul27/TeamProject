using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Services;
using TeamProject.Models.Models;

namespace TeamProject.Pages.Admin.Landlords
{
    [BindProperties]
    public class EditModel : PageModel
    {
       
        private readonly IUnitOfWork _unitOfWork;
        public EditModel(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
       
        public LandLord LandLords { get; set; }
        public void OnGet(int id)
        {
            LandLords = _unitOfWork.LandLordRepo.Get(id);
        }
        public IActionResult OnPost()
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.LandLordRepo.Update(LandLords);
                _unitOfWork.Save();
            }
            return RedirectToPage("Index");
        }
    }
}