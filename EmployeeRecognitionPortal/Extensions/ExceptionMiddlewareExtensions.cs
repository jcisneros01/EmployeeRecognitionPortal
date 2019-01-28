using System;
using System.Net;
using EmployeeRecognitionPortal.Exceptions;
using EmployeeRecognitionPortal.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;

namespace EmployeeRecognitionPortal.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";
 
                    var error = context.Features.Get<IExceptionHandlerFeature>();
                    if(error != null)
                    {   
                        //todo: add status prop in exception class and use inheritance to check type for overriding statuscode
                        var ex = error.Error;    
                        if (ex is UserNotFoundException)
                            context.Response.StatusCode = (int) HttpStatusCode.NotFound;    
                        
                        await context.Response.WriteAsync(new ErrorModel()
                        {
                            Message = ex.Message
                        }.ToString());
                    }
                });
            });
        }
    }
}