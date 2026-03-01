using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Models.Models;
using TeamProject.Services;

namespace TeamProject.Pages.Admin.Properties;

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

    public IActionResult OnGet(int id)
    {
        Property = _unitOfWork.PropertyRepo.Get(id);

        if (Property == null)
        {
            return NotFound();
        }

        Property.Images = _unitOfWork.PropertyImageRepo
            .GetAll()
            .Where(pi => pi.PropertyId == id)
            .ToList();

        return Page();

    }

    public IActionResult OnPost(int id)
    {
        var property = _unitOfWork.PropertyRepo.Get(id);

        if (property == null)
        {
            return NotFound();
        }

        var wwwRootPath = _webHostEnvironment.WebRootPath;

      
        if (!string.IsNullOrEmpty(property.DisplayImage))
        {
            var displayPath = Path.Combine(wwwRootPath, property.DisplayImage.TrimStart('\\'));

            if (System.IO.File.Exists(displayPath))
            {
                System.IO.File.Delete(displayPath);
            }
        }

        
        var images = _unitOfWork.PropertyImageRepo
            .GetAll()
            .Where(i => i.PropertyId == id)
            .ToList();

        foreach (var img in images)
        {
            var imagePath = Path.Combine(wwwRootPath, img.ImageUrl.TrimStart('\\'));

            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }

            _unitOfWork.PropertyImageRepo.Delete(img);
        }

        
        _unitOfWork.PropertyRepo.Delete(property);

        _unitOfWork.Save();

        return RedirectToPage("Index");
    }
}