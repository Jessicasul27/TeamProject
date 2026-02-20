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
        public LandLord LandLords { get; set; }
        public void OnGet()
        {
        }

        public IActionResult OnPost(LandLord landlord)
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            _unitOfWork.LandLordRepo.Add(landlord);
            _unitOfWork.Save();
            return RedirectToPage("Index");
        }
    }
}
