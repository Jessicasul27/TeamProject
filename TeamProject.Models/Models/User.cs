using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace TeamProject.Models.Models;

public class User : IdentityUser
{
    [Required]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    public string LastName { get; set; } = string.Empty;

    public Admin? Admin { get; set; }
    public Customer? Customer { get; set; }
    public Landlord? Landlord { get; set; }
}