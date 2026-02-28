using TeamProject.DataAccess.Repository;

namespace TeamProject.Services;

public interface IUnitOfWork : IDisposable
{
    IAdminRepo AdminRepo { get; }
    ICustomerRepo CustomerRepo { get; }
    ILandlordRepo LandlordRepo { get; }
    IPropertyRepo PropertyRepo { get; }

    IPropertyImageRepo PropertyImageRepo { get; }

    

    void Save();
}