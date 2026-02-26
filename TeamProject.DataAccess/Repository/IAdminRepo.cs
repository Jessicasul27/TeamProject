using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository;

public interface IAdminRepo : IRepository<Admin>
{
    void SaveAll();
}