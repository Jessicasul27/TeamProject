using TeamProject.DataAccess.DataAccess;
using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository;

public class PropertyRepo : Repository<Property>
{
    public PropertyRepo(AppDbContext dbContext) : base(dbContext)
    {
    }

    public void SaveAll()
    {
        _dbContext.SaveChanges();
    }

    public new void Update(Property property)
    {
        var propFromDB = _dbContext
            .Properties
            .FirstOrDefault(propFromDB => propFromDB.Id == property.Id);

        if (propFromDB == null)
            return;

        propFromDB.Title = property.Title;
        propFromDB.FullDescription = property.FullDescription;
        propFromDB.DescDescription = property.DescDescription;
        propFromDB.Location = property.Location;
        propFromDB.PricePerNight = property.PricePerNight;
        propFromDB.MaxGuests = property.MaxGuests;
        propFromDB.PropertyType = property.PropertyType;
        propFromDB.Status = property.Status;

        if (property.DisplayImage != null)
            propFromDB.DisplayImage = property.DisplayImage;
    }
}