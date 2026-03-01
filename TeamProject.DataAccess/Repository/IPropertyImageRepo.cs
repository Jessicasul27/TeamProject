using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository;

public interface IPropertyImageRepo : IRepository<PropertyImage>
{
    IEnumerable<PropertyImage> GetByPropertyId(int propertyId);
}