using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamProject.DataAccess.Repository;

namespace TeamProject.Services
{
    public interface IUnitOfWork : IDisposable
    {
        ICustomerRepo CustomerRepo { get; }

        void Save();
    }
}
