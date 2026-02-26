using TeamProject.DataAccess.DataAccess;
using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository;

public class LandlordRepo : Repository<Landlord>, ILandlordRepo
{
    private readonly AppDbContext _dbContext;

    public LandlordRepo(AppDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }

    public void SaveAll()
    {
        _dbContext.SaveChanges();
    }

    public new void Update(Landlord landlord)
    {
        var landlordFromDB = _dbContext
            .Landlords
            .FirstOrDefault(landlordFromDB => landlordFromDB.LandlordId == landlord.LandlordId);

        landlordFromDB.Name = landlord.Name;
        landlordFromDB.Email = landlord.Email;
        landlordFromDB.PhoneNo = landlord.PhoneNo;
        landlordFromDB.LandlordShare = landlord.LandlordShare;
        landlordFromDB.Income = landlord.Income;
    }
}