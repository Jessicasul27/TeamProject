using System.ComponentModel.DataAnnotations;

namespace TeamProject.Models.Models;

public class PropertyImage
{
    [Key]
    public int Id { get; set; }

    public string ImageUrl { get; set; } = string.Empty;

    public int PropertyId { get; set; }
    public Property Property { get; set; } = null!;
}