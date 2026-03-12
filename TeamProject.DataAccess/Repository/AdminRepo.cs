using TeamProject.DataAccess.DataAccess;
using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository;

public class AdminRepo : Repository<Admin>
{
    public AdminRepo(AppDbContext dbContext) : base(dbContext)
    {
    }

    public void SaveAll()
    {
        _dbContext.SaveChanges();
    }

    public new void Update(Admin admin)
    {
        var adminFromDb = _dbContext.Admins
            .FirstOrDefault(c => c.UserId == admin.UserId);
    }
}