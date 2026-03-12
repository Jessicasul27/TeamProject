using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TeamProject.DataAccess.DataAccess;

namespace TeamProject.DataAccess.Repository;

public class Repository<T> where T : class
{
    protected readonly AppDbContext _dbContext;
    protected readonly DbSet<T> _dbSet;

    protected Repository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
        _dbSet = _dbContext.Set<T>();
    }

    public void Add(T obj)
    {
        _dbSet.Add(obj);
    }

    public void Delete(T obj)
    {
        _dbSet.Remove(obj);
    }

    public T? Get(int id)
    {
        return id == 0 ? null : _dbSet.Find(id);
    }

    public T? Get(string id)
    {
        return id.IsNullOrEmpty() ? null : _dbSet.Find(id);
    }

    public IEnumerable<T> GetAll()
    {
        return _dbSet;
    }

    public void Update(T obj)
    {
        _dbSet.Update(obj);
    }
}