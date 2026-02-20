using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Services;
using TeamProject.Models.Models;


namespace TeamProject.Pages.Admin.Landlords
{
    public class DeleteModel : PageModel
    {
        private readonly IUnitOfWork _unitOfWork;
        public DeleteModel(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [BindProperty]
        public LandLord landlord { get; set; }

        public void OnGet(int id)
        {
            landlord = _unitOfWork.LandLordRepo.Get(id);
        }

        public IActionResult OnPost()
        {
            var landlordFromDB = _unitOfWork.LandLordRepo.Get(landlord.LandLordId);

            if (landlordFromDB == null)
            {
                return NotFound();
            }

            _unitOfWork.LandLordRepo.Delete(landlordFromDB);
            _unitOfWork.Save();

            return RedirectToPage("Index");
        }
    }
}

