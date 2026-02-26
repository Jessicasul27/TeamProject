using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamProject.Models.Models
{
    public class LandLord
    {
        [Key]
        public int LandLordId { get; set; }
        [Required]

        public string? Name { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? PhoneNo { get; set; }
        [Required]
        public double LandLordShare { get; set;}

        public double Income { get; set; }

        public Property? Property { get; set; }

        public List<Property>? Properties { get; set; }

    }
}
