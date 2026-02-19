using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Models.Models;
using TeamProject.Services;

namespace TeamProject.Pages.Admin.Properties
{
    [BindProperties]
    public class DeleteModel : PageModel
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public DeleteModel(IUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment)
        {
            _unitOfWork = unitOfWork;
            _webHostEnvironment = webHostEnvironment;
        }

        public Property Property { get; set; }

        public void OnGet(int id)
        {
            Property = _unitOfWork.PropertyRepo.Get(id);
        }

        public IActionResult OnPost()
        {

            string wwwRootFolder = _webHostEnvironment.WebRootPath;
            var propFromDb = _unitOfWork.PropertyRepo.Get(Property.PropertyId);

            if (propFromDb != null)
            {
                var oldFile = Path.Combine(wwwRootFolder, propFromDb.Image.TrimStart('\\'));
                if (System.IO.File.Exists(oldFile))
                {
                    System.IO.File.Delete(oldFile);
                }
            }


            if (ModelState.IsValid)
            {
                _unitOfWork.PropertyRepo.Delete(propFromDb);
                _unitOfWork.Save();
            }
            return RedirectToPage("Index");
        }

    }
}

