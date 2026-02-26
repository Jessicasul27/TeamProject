using System.ComponentModel.DataAnnotations;

namespace TeamProject.Models.Models;

public class Admin
{
    [Key]
    public int AdminId { get; set; }

    [Required]
    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }
}