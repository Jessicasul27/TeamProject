using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Models.Models;
using TeamProject.Services;

namespace TeamProject.Pages.Admin.Properties;

[BindProperties]
public class EditModel : PageModel
{
    private readonly UnitOfWork _unitOfWork;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public EditModel(UnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment)
    {
        _unitOfWork = unitOfWork;
        _webHostEnvironment = webHostEnvironment;
    }

    public Property Property { get; set; }
    public ICollection<PropertyImage> Images { get; set; }

    public IActionResult OnGet(int id)
    {
        Property = _unitOfWork.PropertyRepo.Get(id);

        if (Property == null) return NotFound();

        Property.Images = _unitOfWork.PropertyImageRepo
            .GetAll()
            .Where(pi => pi.PropertyId == id)
            .ToList();

        return Page();
    }

    public IActionResult OnPost()
    {
        var wwwRootFolder = _webHostEnvironment.WebRootPath;
        var upload = Path.Combine(wwwRootFolder, @"Images\Properties");

        var propFromDB = _unitOfWork.PropertyRepo.Get(Property.Id);


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
        else
        {
            Property.DisplayImage = propFromDB.DisplayImage;
        }


        _unitOfWork.PropertyRepo.Update(Property);
        _unitOfWork.Save();


        var galleryFiles = HttpContext.Request.Form.Files.GetFiles("galleryFiles");

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

    public IActionResult OnPostDeleteImage(int imageId)
    {
        var image = _unitOfWork.PropertyImageRepo.Get(imageId);

        if (image == null) return NotFound();

        // delete file from wwwroot
        var wwwRootPath = _webHostEnvironment.WebRootPath;
        var filePath = Path.Combine(wwwRootPath, image.ImageUrl.TrimStart('\\'));

        if (System.IO.File.Exists(filePath)) System.IO.File.Delete(filePath);

        // delete from DB
        _unitOfWork.PropertyImageRepo.Delete(image);
        _unitOfWork.Save();

        return RedirectToPage(new { id = image.PropertyId });
    }
}