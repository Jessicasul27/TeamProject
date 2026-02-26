using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamProject.DataAccess.DataAccess;
using TeamProject.DataAccess.Repository;

namespace TeamProject.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _dbContext;

        public ICustomerRepo CustomerRepo { get; private set; }
        public IPropertyRepo PropertyRepo { get; private set; }

        public ILandLordRepo LandLordRepo { get; private set; }

        public UnitOfWork(AppDbContext dbContext)
        {
            _dbContext = dbContext;
            CustomerRepo = new CustomerRepo(_dbContext);
            PropertyRepo = new PropertyRepo(_dbContext);
            LandLordRepo = new LandLordRepo(_dbContext);
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
}
