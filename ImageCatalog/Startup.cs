using System;
using ImageCatalog.Common;
using ImageCatalog.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ImageCatalog
{
    public class Startup
    {
        public IConfiguration AppConfiguration { get; }

        public Startup()
        {
            var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json");
            AppConfiguration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc(options =>
                {
                    options.OutputFormatters.RemoveType<HttpNoContentOutputFormatter>();
                })
                .AddJsonOptions(opt =>
                {
                    //для маппинга типов typescript с UpperCase
                    opt.JsonSerializerOptions.PropertyNamingPolicy = null;
                });

            services.AddMemoryCache();
            services.AddResponseCompression(options => options.EnableForHttps = true);

            var appSettingsSection = AppConfiguration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            //DI
            services.AddScoped<IBaseService, BaseService>();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseResponseCompression();
            app.UseResponseCaching();

            //кэшируем статические файлы, картинки в том числе
            app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = ctx =>
                {
                    var halfHour = TimeSpan.FromMinutes(30).TotalSeconds;
                    ctx.Context.Response.Headers.Add("Cache-Control", $"public,max-age={halfHour}");
                }
            });

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

                //важно для роутинга BrowserRouter
                endpoints.MapFallbackToController("Index", "Home");
            });
        }
    }
}
