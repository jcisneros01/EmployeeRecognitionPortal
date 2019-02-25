using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using AutoMapper;
using EmployeeRecognitionPortal.Exceptions;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Models.Response;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using Newtonsoft.Json;
using RestSharp;

namespace EmployeeRecognitionPortal.Services
{
    public class EmpOfYearService : IEmpOfYearService
    {
        private readonly Context _context;
        private readonly IMapper _mapper;

        public EmpOfYearService(Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public EmpOfYearResponse CreateEmpOfYear(EmpOfYearRequest eoy)
        {
           var empOfYear = _mapper.Map<EmpOfYearRequest, EmpOfYear>(eoy);

           GenerateLatexFile(eoy.AwardCreatorId, empOfYear);

           _context.EmpOfYears.Add(empOfYear);
           _context.SaveChanges();

           return _mapper.Map<EmpOfYear, EmpOfYearResponse>(empOfYear);
        }

        private void GenerateLatexFile(int AwardCreatorId, EmpOfYear empOfYear)
        {
            var awardCreator = _context.Users
                .Include(x => x.AwardCreator)
                .FirstOrDefault(x => x.Id == AwardCreatorId)?.AwardCreator;
            if (awardCreator == null)
            {
                throw new UserNotFoundException($"AwardCreator with id {AwardCreatorId} not found");
            }

            empOfYear.AwardCreator = awardCreator;
            empOfYear.CreateLaTex();

            //Convert award to json for post request to latex compile server
            var jsonAward = JsonConvert.SerializeObject(empOfYear, Formatting.None,
                new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });

            //Send post request to latex compile server
            string latexURL = "http://52.175.221.124:8080";
            IRestClient client = new RestClient(latexURL);
            var request = new RestRequest("/Latex/", Method.POST);
            request.AddParameter("application/json", jsonAward, ParameterType.RequestBody);
            request.RequestFormat = DataFormat.Json;
            client.Execute(request);

        }

        public List<EmpOfYearResponse> GetEmpOfYears()
        {
            var eoys = _context.EmpOfYears.ToList();
            return _mapper.Map<List<EmpOfYear>, List<EmpOfYearResponse>>(eoys);
        }

        public EmpOfYearResponse GetEmpOfYear(int id)
        {
          var eoy = _context.EmpOfYears.FirstOrDefault(x => x.Id == id);
          if(eoy == null)
          {
            throw new AwardNotFoundException($"Award with id {id} was not in the database.");
          }

          return _mapper.Map<EmpOfYear, EmpOfYearResponse>(eoy);
        }

        public void DeleteEmpOfYear(int id)
        {
          var eoy = _context.EmpOfYears.FirstOrDefault(x => x.Id == id);
          if(eoy == null)
          {
            throw new AwardNotFoundException($"Award with id {id} was not in the database.");
          }
          _context.EmpOfYears.Remove(eoy);
          _context.SaveChanges();
        }
    }
}
