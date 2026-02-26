using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository;

public interface ILandlordRepo : IRepository<Landlord>
{
    void SaveAll();
}