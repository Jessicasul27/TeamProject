using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamProject.DataAccess.DataAccess;
using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository
{
    public class PropertyImageRepo : Repository<PropertyImage>, IPropertyImageRepo  
    {
        private readonly AppDbContext _dbContext;

        public PropertyImageRepo(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<PropertyImage> GetByPropertyId(int propertyId)
        {
            return _dbContext.PropertyImages.Where(img => img.PropertyId == propertyId).ToList();
        }

    }
}
