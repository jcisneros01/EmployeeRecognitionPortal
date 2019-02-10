using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using EmployeeRecognitionPortal.Extensions;
using EmployeeRecognitionPortal.Filters;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;

namespace EmployeeRecognitionPortal
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper();
            services.AddCors(options => options.AddPolicy("AllowAllOrigins", 
            builder =>
            {
                builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));            
                        
            // configure jwt auth
            var key = Encoding.UTF8.GetBytes("this is my custom Secret key for authentication"); //Todo: move to config
            services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                }) 
               .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidIssuer = "http://localhost:5000",

                        ValidAudiences = new List<string>
                        {
                            "https://localhost:5001",
                            "http://localhost:5000"
                        },

                        ValidAudience = "https://localhost:5001"

                    };
                });
            
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Employee Recognition Portal API", Version = "v1" });
            });

            // Connect to database
            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production")
            {
                services.AddDbContext<Context>(options =>
                    options.UseSqlServer(Configuration.GetConnectionString("DbConnection")));
            }
            else
            {
                services.AddDbContext<Context>(options =>
                    options.UseSqlite("Data Source=EmployeeRecognition.db"));
            }
            services.BuildServiceProvider().GetService<Context>().Database.Migrate();            
            
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IEmpOfMonthService, EmpOfMonthService>();
            services.AddScoped<IEmpOfYearService, EmpOfYearService>();
            services.AddScoped<ValidateModelAttribute>();
                
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.ConfigureExceptionHandler();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseCors("AllowAllOrigins");
            app.UseAuthentication();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Employee Recognition Portal API");
            });
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}