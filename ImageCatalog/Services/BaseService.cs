using ImageCatalog.Common;
using ImageCatalog.Models;
using ImageCatalog.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace ImageCatalog.Services
{
	public class BaseService: IBaseService
    {
		private readonly IFileSystemRepository _fileSystemRepository;
		private readonly IWebHostEnvironment _hostingEnvironment;
		private IMemoryCache _cache;
        private AppSettings _appSettings;

		private readonly string _rootPath;

		public BaseService(
			IFileSystemRepository fileSystemRepository,
			IMemoryCache memoryCache, 
			IWebHostEnvironment hostingEnvironment, 
			IOptions<AppSettings> appSettings)
		{
			//если каталоги обновляются редко, можно подключить кэш в appSettings.json -> UseCache = true
			_cache = memoryCache;
			_fileSystemRepository = fileSystemRepository;
			_hostingEnvironment = hostingEnvironment;
			_appSettings = appSettings.Value;


			_rootPath = Path.Combine(_hostingEnvironment.WebRootPath, Constants.FILES_PATH);
		}

		public List<Catalog> GetCatalogs()
        {
			var key = "all-catalogs";
            List<Catalog> catalogs = null;

			if (!_appSettings.UseCache || !_cache.TryGetValue(key, out catalogs))
            {
                catalogs = _fileSystemRepository.GetCatalogs(_rootPath, Constants.ALLOWED_FILES_PATTERN);

				if (catalogs.Any())
                {
					_cache.Set(key, catalogs,
						new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(_appSettings.Expiration)));
				}
            }
			return catalogs;
		}

        public Catalog GetCatalog(int id)
        {
			var key = string.Concat("catalog:", id);
			Catalog catalog = null;

			if (!_appSettings.UseCache || !_cache.TryGetValue(key, out catalog))
			{
				catalog = _fileSystemRepository.GetCatalog(_rootPath, id, Constants.ALLOWED_FILES_PATTERN);
				if (catalog != null)
                {
					_cache.Set(key, catalog,
						new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(_appSettings.Expiration)));
				}	
			}
			return catalog;
		}
	}
}
