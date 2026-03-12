using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TeamProject.Models.Models;

namespace TeamProject.Pages;

// from docs:
// > Specifies that the class or method that this attribute is applied to does not require authorization.
[AllowAnonymous]
public class RegisterModel : PageModel
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public RegisterModel(UserManager<User> userManager, SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [BindProperty]
    public InputModel Input { get; set; } = new();

    [BindProperty(SupportsGet = true)]
    public string ReturnUrl { get; set; } = string.Empty;

    public IActionResult OnGet()
    {
        // prevent already authorized users from accessing this page
        if (User.Identity?.IsAuthenticated == true)
            return RedirectToPage("/Index");

        return Page();
    }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
            return Page();

        // security: ensure that a malicious user could not put "Admin" as the role
        // when calling the POST method
        var role = Input.Role switch
        {
            "Customer" => "Customer",
            "Landlord" => "Landlord",
            _ => throw new InvalidOperationException("Invalid role")
        };

        var existingUser = await _userManager.FindByEmailAsync(Input.Email);
        if (existingUser != null)
        {
            ModelState.AddModelError("Input.Email", "An account with this email already exists.");
            return Page();
        }

        var user = new User
        {
            FirstName = Input.FirstName,
            LastName = Input.LastName,
            Email = Input.Email,
            UserName = Input.Email[..Input.Email.IndexOf('@')]
        };

        var createResult = await _userManager.CreateAsync(user, Input.Password);

        Console.WriteLine(createResult);

        if (!createResult.Succeeded)
        {
            ModelState.AddModelError(string.Empty, "An error occured during registration. (could not create user)");
            return Page();
        }

        var roleResult = await _userManager.AddToRoleAsync(user, role);
        if (!roleResult.Succeeded)
        {
            ModelState.AddModelError(string.Empty, "An error occured during registration. (could not add role)");
            await _userManager.DeleteAsync(user);
            return Page();
        }

        await _signInManager.SignInAsync(user, true);

        if (!string.IsNullOrWhiteSpace(ReturnUrl) && Url.IsLocalUrl(ReturnUrl))
            return LocalRedirect(ReturnUrl);

        return RedirectToPage("/Index");
    }

    public sealed class InputModel
    {
        [Required]
        [StringLength(64)]
        [Display(Name = "First name")]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(64)]
        [Display(Name = "Last name")]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        [StringLength(64, MinimumLength = 8, ErrorMessage = "The password must be at least {2} characters long.")]
        public string Password { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        [Display(Name = "Confirm password")]
        public string ConfirmPassword { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = "Customer";
    }
}