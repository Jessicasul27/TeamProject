using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Models.Models;
using TeamProject.Services;

namespace TeamProject.Pages.Account
{
    [Authorize]
    public class MyAccountModel : PageModel
    {

        private readonly UserManager<User> _userManager;

        [BindProperty]
        public User MyUser { get; set; }

        public MyAccountModel(UserManager<User> userManager)
        {
            _userManager = userManager;
        }


        public async Task OnGetAsync()
        {
          MyUser = await _userManager.GetUserAsync(User)!;

        }
    }
}
