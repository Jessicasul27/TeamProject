using TeamProject.DataAccess.DataAccess;
using TeamProject.DataAccess.Repository;

namespace TeamProject.Services;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _dbContext;

    public IAdminRepo AdminRepo { get; }
    public ICustomerRepo CustomerRepo { get; }
    public ILandlordRepo LandlordRepo { get; }
    public IPropertyRepo PropertyRepo { get; }

    public UnitOfWork(AppDbContext dbContext)
    {
        _dbContext = dbContext;

        AdminRepo = new AdminRepo(_dbContext);
        CustomerRepo = new CustomerRepo(_dbContext);
        LandlordRepo = new LandlordRepo(_dbContext);
        PropertyRepo = new PropertyRepo(_dbContext);
    }

    public void Save()
    {
        _dbContext.SaveChanges();
    }

    public void Dispose()
    {
        _dbContext.Dispose();
    }
}