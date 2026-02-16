using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.DataAccess.DataAccess;
using TeamProject.DataAccess.Repository;
using TeamProject.Models.Models;
using TeamProject.Services;



namespace TeamProject.Pages.Admin.Properties
{
    public class IndexModel : PageModel
    {
    
            private readonly IUnitOfWork _unitOfWork;
            public IEnumerable<Property> Properties;
            public IndexModel(IUnitOfWork unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }
            public void OnGet()
            {
                Properties = _unitOfWork.CustomerRepo.GetAll();
            }
    }
    
}
