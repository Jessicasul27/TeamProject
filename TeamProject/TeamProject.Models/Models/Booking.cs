namespace TeamProject.Models.Models
{
    public class Booking
    {
        public string? BookingId { get; set; }

        public DateTime CheckInDate { get; set; }

        public DateTime CheckOutDate { get; set; }

        public double? BookingPrice { get; set; }
        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? PhoneNo { get; set; }


    }
}
