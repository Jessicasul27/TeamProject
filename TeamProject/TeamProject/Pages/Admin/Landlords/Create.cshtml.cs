using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Services;
using TeamProject.Models.Models;
using System.Reflection.Emit;

namespace TeamProject.Pages.Admin.Landlords
{
    
    public class CreateModel : PageModel
    {
        private readonly IUnitOfWork _unitOfWork;
        public CreateModel(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [BindProperty]
        public LandLord LandLords { get; set; }
        public void OnGet()
        {
        }

        public IActionResult OnPost()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            _unitOfWork.LandLordRepo.Add(LandLords);
            _unitOfWork.Save();
            return RedirectToPage("Index");
        }
    }
}
