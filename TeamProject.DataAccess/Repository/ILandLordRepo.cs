using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamProject.Models.Models;

namespace TeamProject.DataAccess.Repository
{
    public interface ILandLordRepo : IRepository<LandLord>
    {
        void SaveAll();
    }
}
