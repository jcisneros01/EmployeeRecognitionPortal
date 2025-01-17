using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using AutoMapper;
using EmployeeRecognitionPortal.Exceptions;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Models.Response;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RestSharp;


namespace EmployeeRecognitionPortal.Services
{
    public class EmpOfMonthService : IEmpOfMonthService
    {
        private readonly Context _context;
        private readonly IMapper _mapper;

        public EmpOfMonthService(Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public EmpOfMonthResponse CreateEmpOfMonth(EmpOfMonthRequest eom)
        {
           var empOfMonth = _mapper.Map<EmpOfMonthRequest, EmpOfMonth>(eom);

           GenerateLatexFile(eom.AwardCreatorId, empOfMonth);

           _context.EmpOfMonths.Add(empOfMonth);
           _context.SaveChanges();

           return _mapper.Map<EmpOfMonth, EmpOfMonthResponse>(empOfMonth);
        }

        private void GenerateLatexFile(int AwardCreatorId, EmpOfMonth empOfMonth)
        {
            var awardCreator = _context.Users
                .Include(x => x.AwardCreator)
                .FirstOrDefault(x => x.Id == AwardCreatorId)?.AwardCreator;
            if (awardCreator == null)
            {
                throw new UserNotFoundException($"AwardCreator with id {AwardCreatorId} not found");
            }

            empOfMonth.AwardCreator = awardCreator;
            empOfMonth.CreateLaTex();


            //Convert award to json for post request to latex compile server
           var jsonAward = JsonConvert.SerializeObject(empOfMonth, Formatting.None,
               new JsonSerializerSettings()
               {
                   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
               });

           //Send post request to latex compile server
           string latexURL = "http://52.247.199.88:8080";
           IRestClient client = new RestClient(latexURL);
           var request = new RestRequest("/Latex/", Method.POST);
           request.AddParameter("application/json", jsonAward, ParameterType.RequestBody);
           request.RequestFormat = DataFormat.Json;
           client.Execute(request);

        }

        public List<EmpOfMonthResponse> GetEmpOfMonths(int userId)
        {
            var eoms = _context.EmpOfMonths.Where(x => x.AwardCreator.UserId == userId).ToList();
            return _mapper.Map<List<EmpOfMonth>, List<EmpOfMonthResponse>>(eoms);
        }

        public EmpOfMonthResponse GetEmpOfMonth(int id)
        {
          var eom = _context.EmpOfMonths.FirstOrDefault(x => x.Id == id);
          if(eom == null)
          {
            throw new AwardNotFoundException($"Award with id {id} was not in the database.");
          }

          return _mapper.Map<EmpOfMonth, EmpOfMonthResponse>(eom);
        }

        public void DeleteEmpOfMonth(int id)
        {
          var eom = _context.EmpOfMonths.FirstOrDefault(x => x.Id == id);
          if(eom == null)
          {
            throw new AwardNotFoundException($"Award with id {id} was not in the database.");
          }
          _context.EmpOfMonths.Remove(eom);
          _context.SaveChanges();
        }
    }
}
