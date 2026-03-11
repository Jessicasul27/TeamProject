using TeamProject.DataAccess.DataAccess;
using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository;

public class PropertyImageRepo : Repository<PropertyImage>
{
    public PropertyImageRepo(AppDbContext dbContext) : base(dbContext)
    {
    }

    public IEnumerable<PropertyImage> GetByPropertyId(int propertyId)
    {
        return _dbContext.PropertyImages.Where(img => img.PropertyId == propertyId).ToList();
    }
}