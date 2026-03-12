using TeamProject.DataAccess.DataAccess;
using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository;

public class BookingRepo : Repository<Booking>
{
    public BookingRepo(AppDbContext dbContext) : base(dbContext)
    {
    }
}