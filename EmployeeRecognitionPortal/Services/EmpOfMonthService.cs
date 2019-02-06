using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EmployeeRecognitionPortal.Exceptions;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Models.Response;
using EmployeeRecognitionPortal.Services;

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
           var newEOM = _mapper.Map<EmpOfMonthRequest, EmpOfMonth>(eom);

           //Grab User and dynamically write the LaTex File
           UserService gtusr = new UserService(_context, _mapper);
           UserResponse usr = gtusr.GetUser(newEOM.AwardCreatorId);
           User finUsr = _mapper.Map<UserResponse, User>(usr);
           newEOM.AwardCreator = finUsr.AwardCreator;

           //Create LaTex File
           newEOM.CreateLaTex();

           _context.EmpOfMonths.Add(newEOM);
           _context.SaveChanges();

           return _mapper.Map<EmpOfMonth, EmpOfMonthResponse>(newEOM);
        }

        public List<EmpOfMonthResponse> GetEmpOfMonths()
        {
            var eoms = _context.EmpOfMonths.ToList();
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