using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamProject.Models.Models
{
    public class Booking
    {
        public string? BookingId { get; set; }

        public DateTime CheckInDate { get; set; }

        public DateTime CheckOutDate { get; set; }

        public double? BookingPrice { get; set; }

        public string? Email { get; set; }
    }
}
