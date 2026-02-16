using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamProject.DataAccess.DataAccess;
using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository
{
    public class CustomerRepo : Repository<Customer>, ICustomerRepo
    {
        private readonly AppDbContext _dbContext;
        public CustomerRepo(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public void SaveAll()
        {
            throw new NotImplementedException();
        }

        public void Update(Customer customer)
        { 
            var customerFromDB = _dbContext.Customers.FirstOrDefault(customerFromDB => customerFromDB.CustomerId == customer.CustomerId);
            customerFromDB.Name = customer.Name;
            customerFromDB.Email = customer.Email;
            customerFromDB.PhoneNumber = customer.PhoneNumber;
            customerFromDB.CreditCardNo = customer.CreditCardNo;    
            customerFromDB.ExpiryDate = customer.ExpiryDate;
            customerFromDB.CVC = customer.CVC;
        }
    }
}
