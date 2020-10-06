using ImageCatalog.Common;
using ImageCatalog.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace ImageCatalog.Services
{
	public class BaseService: IBaseService
    {
		private const string FILES_PATH = "Frontend\\files";

		private readonly IWebHostEnvironment _hostingEnvironment;
		private IMemoryCache _cache;
		private AppSettings _appSettings;

		private readonly string _rootPath;

		public BaseService(IMemoryCache memoryCache, IWebHostEnvironment hostingEnvironment, IOptions<AppSettings> appSettings)
		{
			//если каталоги обновляются редко, можно подключить кэш в appSettings.json -> UseCache = true
			_cache = memoryCache;
			_hostingEnvironment = hostingEnvironment;
			_appSettings = appSettings.Value;

			_rootPath = Path.Combine(_hostingEnvironment.WebRootPath, FILES_PATH);
		}

		public List<Catalog> GetCatalogs()
        {
			var key = "all-catalogs";
            List<Catalog> catalogs = null;

			if (!_appSettings.UseCache || !_cache.TryGetValue(key, out catalogs))
            {
                catalogs = GetEmptyCatalogs();
				catalogs.ForEach(FillCatalogImages);

                _cache.Set(key, catalogs,
					new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(_appSettings.Expiration)));
            }
			return catalogs;
		}

        public Catalog GetCatalog(int id)
        {
			var key = string.Concat("catalog:", id);
			Catalog catalog = null;

			if (!_appSettings.UseCache || !_cache.TryGetValue(key, out catalog))
			{
				catalog = GetEmptyCatalogs().FirstOrDefault(x => x.Id == id);
				if (catalog != null)
                {
					FillCatalogImages(catalog);

					_cache.Set(key, catalog,
						new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(_appSettings.Expiration)));
				}	
			}
			return catalog;
		}

		private List<Catalog> GetEmptyCatalogs()
		{
			var directories = Directory.GetDirectories(_rootPath);
			var catalogs = directories
				.Select(x => new Catalog { Name = new DirectoryInfo(x).Name })
				.ToList();

			return catalogs;
		}

		/// <summary>
		/// Картинки заполняем отдельно и при необходимости, на случай если их очень много
		/// </summary>
		private void FillCatalogImages(Catalog catalog)
        {
			var searchPattern = @"(\.jpg|\.jpeg|\.png|\.svg|\.webp)$";
			var catalogPath = Path.Combine(_rootPath, catalog.Name);

			var images = Directory.GetFiles(catalogPath, "*.*", SearchOption.AllDirectories)
				.Where(x => Regex.Match(x, searchPattern).Success)
				.Select(file => {
					var fileName = Path.GetFileName(file);
					var subDirectories = Path.GetDirectoryName(file.Replace(_rootPath, string.Empty));
					return new ImageItem
					{
						Name = fileName,
						Path = $"{FILES_PATH}\\{Path.Combine(catalog.Name, subDirectories, fileName)}"
					}; 
				})
				.ToList();

			catalog.Items = images;
		}
	}
}
