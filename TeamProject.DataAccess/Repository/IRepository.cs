namespace TeamProject.DataAccess.Repository;

public interface IRepository<T> where T : class
{
    void Add(T obj);

    void Update(T obj);

    void Delete(T obj);

    IEnumerable<T> GetAll();

    T? Get(int id);

    T? Get(string id);
}