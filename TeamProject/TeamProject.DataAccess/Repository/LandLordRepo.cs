using TeamProject.DataAccess.DataAccess;
using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository
{
    public class LandLordRepo : Repository<LandLord>, ILandLordRepo
    {
        private readonly AppDbContext _dbContext;
        public LandLordRepo(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public void SaveAll()
        {
            _dbContext.SaveChanges();
        }

        public void Update(LandLord landlord)
        {
            var landlordFromDB = _dbContext.LandLords.FirstOrDefault(landlordFromDB => landlordFromDB.LandLordId == landlord.LandLordId);
            landlordFromDB.Name = landlord.Name;
            landlordFromDB.Email = landlord.Email;
            landlordFromDB.PhoneNo = landlord.PhoneNo;
            landlordFromDB.LandLordShare = landlord.LandLordShare;
            landlordFromDB.Income = landlord.Income;


        }
    }
}
