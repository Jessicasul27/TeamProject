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
        var propertyFromDb = _dbContext.Properties
            .FirstOrDefault(propFromDB => propFromDB.Id == property.Id);

        propertyFromDb.Title = property.Title;
        propertyFromDb.FullDescription = property.FullDescription;
        propertyFromDb.DescDescription = property.DescDescription;
        propertyFromDb.Location = property.Location;
        propertyFromDb.PricePerNight = property.PricePerNight;
        propertyFromDb.MaxGuests = property.MaxGuests;
        propertyFromDb.PropertyType = property.PropertyType;
        propertyFromDb.Status = property.Status;

        if (property.Image != null)
            propertyFromDb.Image = property.Image;
    }
}