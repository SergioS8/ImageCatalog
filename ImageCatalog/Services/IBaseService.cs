using ImageCatalog.Models;
using System.Collections.Generic;

namespace ImageCatalog.Services
{
    public interface IBaseService
    {
        List<Catalog> GetCatalogs();
        Catalog GetCatalog(int id);
    }
}