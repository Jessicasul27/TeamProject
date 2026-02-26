using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository;

public interface IPropertyRepo : IRepository<Property>
{
    void SaveAll();

    public new void Update(Property property);
}