using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ImageCatalog.Services
{
    public interface IImageService
    {
        Task<FileContentResult> GetImageAsync(int id);
        Task<bool> UploadImageAsync(IFormFile image, string path);
    }
}