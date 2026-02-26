using TeamProject.DataAccess.DataAccess;
using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository;

public class AdminRepo : Repository<Admin>, IAdminRepo
{
    private readonly AppDbContext _dbContext;

    public AdminRepo(AppDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }

    public void SaveAll()
    {
        _dbContext.SaveChanges();
    }

    public new void Update(Admin admin)
    {
        var adminFromDB = _dbContext
            .Admins
            .FirstOrDefault(adminFromDB => adminFromDB.AdminId == admin.AdminId);

        adminFromDB.Email = admin.Email;
        adminFromDB.Name = admin.Name;
        adminFromDB.Password = admin.Password;
    }
}