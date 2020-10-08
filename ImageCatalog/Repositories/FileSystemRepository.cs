using ImageCatalog.Common;
using ImageCatalog.Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace ImageCatalog.Repositories
{
    public class FileSystemRepository: IFileSystemRepository
    {
		/// <summary>
		/// Получить все каталоги с файлами в указанной директории
		/// </summary>
		/// <param name="path">Директория в которой осуществляется поиск</param>
		/// <param name="searchFilesPattern">regex выражение, для поиска файлов, если null - файлы не ищем</param>
		public List<Catalog> GetCatalogs(string path, string searchFilesPattern = null)
		{
			return FindAllCatalogs(path, searchFilesPattern);
		}

		/// <summary>
		/// Получить каталог по id, заполнив файлами только его
		/// </summary>
		/// <param name="path">Директория в которой осуществляется поиск</param>
		/// <param name="id">Id искомой директории</param>
		/// <param name="searchFilesPattern">regex выражение, для поиска файлов, если null - файлы не ищем</param>
		public Catalog GetCatalog(string path, int id, string searchFilesPattern = null)
		{
			var foundCatalog = FindAllCatalogs(path).FirstOrDefault(x => x.Id == id);
			if (foundCatalog != null)
            {
				FillCatalogWithFiles(foundCatalog, path, searchFilesPattern);
            }
			return foundCatalog;
		}

		private List<Catalog> FindAllCatalogs(string path, string searchPattern = null)
		{
			var directories = Directory.GetDirectories(path);
			var catalogs = directories
				.Select(x => {
					var catalog = new Catalog { Name = new DirectoryInfo(x).Name };
					if (searchPattern != null)
					{
						FillCatalogWithFiles(catalog, path, searchPattern);
					}
					return catalog;
				})
				.ToList();

			return catalogs;
		}

		private void FillCatalogWithFiles(Catalog catalog, string path, string searchPattern)
		{
			var catalogPath = Path.Combine(path, catalog.Name);

			var images = Directory.GetFiles(catalogPath, "*.*", SearchOption.AllDirectories)
				.Where(x => Regex.Match(x, searchPattern).Success)
				.Select(file => {
					var fileName = Path.GetFileName(file);
					var subDirectories = Path.GetDirectoryName(file.Replace(path, string.Empty));
					return new ImageItem
					{
						Name = fileName,
						Path = $"{Constants.FILES_PATH}\\{Path.Combine(catalog.Name, subDirectories, fileName)}"
					};
				})
				.ToList();

			catalog.Items = images;
		}
    }
}
