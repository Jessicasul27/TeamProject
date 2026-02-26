using TeamProject.DataAccess.DataAccess;
using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository;

public class PropertyRepo : Repository<Property>, IPropertyRepo
{
    private readonly AppDbContext _dbContext;

    public PropertyRepo(AppDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }

    public void SaveAll()
    {
        _dbContext.SaveChanges();
    }

    public new void Update(Property property)
    {
        var propFromDB = _dbContext
            .Properties
            .FirstOrDefault(propFromDB => propFromDB.PropertyId == property.PropertyId);

        propFromDB.Title = property.Title;
        propFromDB.FullDescription = property.FullDescription;
        propFromDB.DescDescription = property.DescDescription;
        propFromDB.Location = property.Location;
        propFromDB.PricePerNight = property.PricePerNight;
        propFromDB.MaxGuests = property.MaxGuests;
        propFromDB.PropertyType = property.PropertyType;
        propFromDB.status = property.status;

        if (property.Image != null)
            propFromDB.Image = property.Image;
    }
}