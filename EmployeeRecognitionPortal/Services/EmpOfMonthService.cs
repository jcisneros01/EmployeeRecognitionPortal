using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EmployeeRecognitionPortal.Exceptions;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Models.Response;
using Microsoft.EntityFrameworkCore;

namespace EmployeeRecognitionPortal.Services
{
    public class EmpOfMonthService : IEmpOfMonthService
    {
        private readonly Context _context;
        private readonly IMapper _mapper;

        public EmpOfMonthService(Context context, IMapper mapper, IUserService userService)
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
