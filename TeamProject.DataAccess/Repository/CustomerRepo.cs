using Microsoft.EntityFrameworkCore;
using TeamProject.DataAccess.DataAccess;
using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository;

public class CustomerRepo : Repository<Customer>, ICustomerRepo
{
    private readonly AppDbContext _dbContext;

    public CustomerRepo(AppDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }

    public void SaveAll()
    {
        _dbContext.SaveChanges();
    }

    public new Customer? Get(string id)
    {
        return _dbContext.Customers
            .Include(customer => customer.User)
            .FirstOrDefault(customer => customer.UserId == id);
    }

    public new IEnumerable<Customer> GetAll()
    {
        return _dbContext.Customers.Include(customer => customer.User);
    }

    public new void Update(Customer customer)
    {
        var customerFromDb = _dbContext.Customers
            .Include(c => c.User)
            .FirstOrDefault(c => c.UserId == customer.UserId);

        if (customerFromDb == null)
            return;

        customerFromDb.CardNo = customer.CardNo;
        customerFromDb.CardExpiryDate = customer.CardExpiryDate;

        customerFromDb.User.FirstName = customer.User.FirstName;
        customerFromDb.User.LastName = customer.User.LastName;
        customerFromDb.User.Email = customer.User.Email;
        customerFromDb.User.PhoneNumber = customer.User.PhoneNumber;
    }
}