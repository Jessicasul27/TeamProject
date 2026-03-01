using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Models.Models;
using TeamProject.Services;

namespace TeamProject.Pages.Admin.Properties;

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
        var wwwRootFolder = _webHostEnvironment.WebRootPath;
        var upload = Path.Combine(wwwRootFolder, @"Images\Properties");


        var displayFile = HttpContext.Request.Form.Files["displayFile"];

        if (displayFile != null && displayFile.Length > 0)
        {
            var fileName = Guid.NewGuid().ToString();
            var extension = Path.GetExtension(displayFile.FileName);

            using (var fileStream = new FileStream(
                Path.Combine(upload, fileName + extension), FileMode.Create))
            {
                displayFile.CopyTo(fileStream);
            }

            Property.DisplayImage = @"\Images\Properties\" + fileName + extension;
        }


        _unitOfWork.PropertyRepo.Add(Property);
        _unitOfWork.Save();


        var galleryFiles = HttpContext.Request.Form.Files.GetFiles("galleryFiles");
        if (galleryFiles != null)
            foreach (var file in galleryFiles)
            {
                if (file.Length == 0) continue;

                var fileName = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(file.FileName);

                using (var fileStream = new FileStream(
                    Path.Combine(upload, fileName + extension), FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }

                var image = new PropertyImage
                {
                    ImageUrl = @"\Images\Properties\" + fileName + extension,
                    PropertyId = Property.Id
                };

                _unitOfWork.PropertyImageRepo.Add(image);
            }

        _unitOfWork.Save();

        return RedirectToPage("Index");
    }
}