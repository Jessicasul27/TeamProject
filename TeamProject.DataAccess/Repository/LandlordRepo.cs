using Microsoft.EntityFrameworkCore;
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

    public new Landlord? Get(string id)
    {
        return _dbContext.Landlords
            .Include(landlord => landlord.User)
            .FirstOrDefault(landlord => landlord.UserId == id);
    }

    public new IEnumerable<Landlord> GetAll()
    {
        return _dbContext.Landlords.Include(landlord => landlord.User);
    }

    public new void Update(Landlord landlord)
    {
        var landlordFromDb = _dbContext.Landlords
            .Include(l => l.User)
            .FirstOrDefault(l => l.UserId == landlord.UserId);

        if (landlordFromDb == null)
            return;

        landlordFromDb.LandlordShare = landlord.LandlordShare;
        landlordFromDb.Income = landlord.Income;

        landlordFromDb.User.FirstName = landlord.User.FirstName;
        landlordFromDb.User.LastName = landlord.User.LastName;
        landlordFromDb.User.Email = landlord.User.Email;
        landlordFromDb.User.PhoneNumber = landlord.User.PhoneNumber;
    }
}