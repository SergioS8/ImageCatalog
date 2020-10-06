using System.Collections.Generic;
using ImageCatalog.Models;
using ImageCatalog.Services;
using Microsoft.AspNetCore.Mvc;

namespace ImageCatalog.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BaseController : Controller
    {
        readonly IBaseService _baseService;

		public BaseController(IBaseService baseService)
		{
			_baseService = baseService;
		}

		[HttpGet]
		public List<Catalog> Get()
		{
			return _baseService.GetCatalogs();
		}

		[HttpGet("{catalogId}")]
		public Catalog GetById(int catalogId)
		{
			return _baseService.GetCatalog(catalogId);
		}
	}
}
