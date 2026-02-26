using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Models.Models;
using TeamProject.Services;

namespace TeamProject.Pages.Admin.Properties;

[BindProperties]
public class EditModel : PageModel
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public EditModel(IUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment)
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
        var wwwRootFolder = _webHostEnvironment.WebRootPath;
        var files = HttpContext.Request.Form.Files;
        var propFromDB = _unitOfWork.PropertyRepo.Get(Property.PropertyId);

        if (files.Count > 0)
        {
            var new_fileName = Guid.NewGuid().ToString();
            var upload = Path.Combine(wwwRootFolder, @"Images\Properties");
            var extension = Path.GetExtension(files[0].FileName);
            if (propFromDB != null)
            {
                var oldFile = Path.Combine(wwwRootFolder, propFromDB.Image.TrimStart('\\'));
                if (System.IO.File.Exists(oldFile)) System.IO.File.Delete(oldFile);
            }

            using (var fileStream = new FileStream(Path.Combine(upload, new_fileName + extension), FileMode.Create))
            {
                files[0].CopyTo(fileStream);
            }

            Property.Image = @"\Images\Properties\" + new_fileName + extension;
        }

        if (ModelState.IsValid)
        {
            _unitOfWork.PropertyRepo.Update(Property);
            _unitOfWork.Save();
        }

        return RedirectToPage("Index");
    }
}