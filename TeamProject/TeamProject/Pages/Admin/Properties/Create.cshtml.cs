using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Runtime.CompilerServices;
using TeamProject.Models.Models;
using TeamProject.Services;

namespace TeamProject.Pages.Admin.Properties
{
    [BindProperties]
    public class CreateModel : PageModel
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public CreateModel(IUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment)
        {
            _unitOfWork = unitOfWork;
            _webHostEnvironment = webHostEnvironment;
        }

        public Property Property { get; set; }

        public void OnGet()
        {
        }

        public IActionResult OnPost()
        {
            string wwwRootFolder = _webHostEnvironment.WebRootPath;
            var files = HttpContext.Request.Form.Files;
            string new_fileName = Guid.NewGuid().ToString();

            var upload = Path.Combine(wwwRootFolder, @"Images\Properties");
            var extension = Path.GetExtension(files[0].FileName);
            using (var fileStream = new FileStream(Path.Combine(upload, new_fileName + extension), FileMode.Create))
            {
                files[0].CopyTo(fileStream);
            }

            Property.Image = @"\Images\Properties\" + new_fileName + extension;
            if (ModelState.IsValid)
            {
                _unitOfWork.PropertyRepo.Add(Property);
                _unitOfWork.Save();

            }
            return RedirectToPage("Index");

        }
    }
}
