using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository;

public interface ICustomerRepo : IRepository<Customer>
{
    void SaveAll();
}