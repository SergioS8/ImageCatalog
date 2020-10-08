using ImageCatalog.Common;
using ImageCatalog.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ImageCatalog.Services
{
    public class ImageService : IImageService
    {
        private IWebHostEnvironment _hostingEnvironment;
        private readonly IFileSystemRepository _fileSystemRepository;

        private readonly string _rootPath;

        public ImageService(IWebHostEnvironment hostingEnvironment, IFileSystemRepository fileSystemRepository)
        {
            _hostingEnvironment = hostingEnvironment;
            _fileSystemRepository = fileSystemRepository;

            _rootPath = Path.Combine(_hostingEnvironment.WebRootPath, Constants.FILES_PATH);
        }

        private ushort POSSIBLE_MAX_IMAGE_SIZE = 5024;

        public async Task<bool> UploadImageAsync(IFormFile image, string path)
        {
            var imageSize = Math.Round((double)image.Length / 1024, 0);
            if (imageSize >= POSSIBLE_MAX_IMAGE_SIZE && !Regex.Match(image.FileName, Constants.ALLOWED_FILES_PATTERN).Success)
            {
                throw new Exception($"Недопустимый размер (не более 5 мб) или формат файла.");
            }
            var fullPath = Path.Combine(_hostingEnvironment.WebRootPath, path);

            using (var fileStream = new FileStream(fullPath, FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
            }

            return true;
        }

        public async Task<FileContentResult> GetImageAsync(int id)
        {
            return await GetBytesImageAsync(id);
        }

        private async Task<FileContentResult> GetBytesImageAsync(int id)
        {
            var catalogs = _fileSystemRepository.GetCatalogs(_rootPath, Constants.ALLOWED_FILES_PATTERN);
            var image = catalogs.SelectMany(x => x.Items).FirstOrDefault(x => x.Id == id);
            if (image == null)
                return null;

            var imgFullPath = Path.Combine(_hostingEnvironment.WebRootPath, image.Path);
            var imageBytes = await File.ReadAllBytesAsync(imgFullPath);

            return new FileContentResult(imageBytes, "image/png");
        }
    }
}
