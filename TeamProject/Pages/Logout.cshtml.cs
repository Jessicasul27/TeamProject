using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Models.Models;

namespace TeamProject.Pages;

[Authorize]
public class LogoutModel : PageModel
{
    private readonly SignInManager<User> _signInManager;

    public LogoutModel(SignInManager<User> signInManager)
    {
        _signInManager = signInManager;
    }

    public async Task<IActionResult> OnGetAsync()
    {
        await _signInManager.SignOutAsync();
        return RedirectToPage("/Index");
    }
}