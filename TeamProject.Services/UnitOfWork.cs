using TeamProject.DataAccess.DataAccess;
using TeamProject.DataAccess.Repository;

namespace TeamProject.Services;

public class UnitOfWork
{
    private readonly AppDbContext _dbContext;

    public UnitOfWork(AppDbContext dbContext)
    {
        _dbContext = dbContext;

        AdminRepo = new AdminRepo(_dbContext);
        CustomerRepo = new CustomerRepo(_dbContext);
        LandlordRepo = new LandlordRepo(_dbContext);
        PropertyRepo = new PropertyRepo(_dbContext);
        PropertyImageRepo = new PropertyImageRepo(_dbContext);
        BookingRepo = new BookingRepo(_dbContext);
    }

    public AdminRepo AdminRepo { get; }
    public CustomerRepo CustomerRepo { get; }
    public LandlordRepo LandlordRepo { get; }
    public PropertyRepo PropertyRepo { get; }
    public BookingRepo BookingRepo { get; }
    public PropertyImageRepo PropertyImageRepo { get; }

    public void Save()
    {
        _dbContext.SaveChanges();
    }

    public void Dispose()
    {
        _dbContext.Dispose();
    }
}