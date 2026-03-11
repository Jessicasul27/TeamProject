using TeamProject.DataAccess.DataAccess;
using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository;

public class BookingRepo : Repository<Booking>, IBookingRepo
{
    private readonly AppDbContext _dbContext;

    public BookingRepo(AppDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }
}