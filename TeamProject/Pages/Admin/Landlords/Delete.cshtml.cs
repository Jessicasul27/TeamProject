using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Services;
using TeamProject.Models.Models;

namespace TeamProject.Pages.Admin.Landlords
{
    [BindProperties]
    public class DeleteModel : PageModel
    {
        private readonly IUnitOfWork _unitOfWork;
        public DeleteModel(IUnitOfWork unitOfWork)
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
            
            if (LandLords == null || LandLords.LandLordId == 0)
            {
                return BadRequest();
            }

            var landlordFromDB = _unitOfWork.LandLordRepo.Get(LandLords.LandLordId);

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

