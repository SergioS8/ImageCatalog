using ImageCatalog.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ImageCatalog.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ImageController : Controller
    {
        private IImageService _imageService;

        public ImageController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpPost]
        public async Task<bool> Post([FromForm] ImageRequest request)
        {
            bool success = false;
            if (request.Path != null && request.Image != null)
            {
                success = await _imageService.UploadImageAsync(request.Image, request.Path);
            }
            return success;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return await _imageService.GetImageAsync(id);
        }

        public class ImageRequest
        {
            public string Path { get; set; }
            public IFormFile Image { get; set; }
        }
    }
}
