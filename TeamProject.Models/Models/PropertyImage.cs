using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamProject.Models.Models
{
    public class PropertyImage
    {
        
        public int Id { get; set; }

        public string ImageUrl { get; set; } = string.Empty;

        public int PropertyId { get; set; }
        public Property Property { get; set; } = null!;
    }
}

