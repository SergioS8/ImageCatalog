using ImageCatalog.Models;
using System.Collections.Generic;

namespace ImageCatalog.Repositories
{
    public interface IFileSystemRepository
    {
        List<Catalog> GetCatalogs(string path, string searchFilesPattern = null);
        Catalog GetCatalog(string path, int id, string searchFilesPattern = null);
    }
}