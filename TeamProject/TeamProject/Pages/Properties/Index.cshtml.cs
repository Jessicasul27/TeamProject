using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.DataAccess.DataAccess;
using TeamProject.Models.Models;



namespace TeamProject.Pages.Properties
{
    public class IndexModel : PageModel
    {
        private readonly AppDbContext _dbContext;
        public IEnumerable<Property> Properties;
        public IndexModel(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void OnGet()
        {
            Properties = _dbContext.Properties;
        }
    }
}
