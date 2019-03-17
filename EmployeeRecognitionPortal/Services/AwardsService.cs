using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using AutoMapper;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Response;

namespace EmployeeRecognitionPortal.Services
{
    public class AwardsService : IAwardsService
    {
        private readonly Context _context;

        public AwardsService(Context context, IMapper mapper)
        {
            _context = context;
        }

        public AwardsByTypeResponse GetAwardsByTypeData()
        {    
            var empOfTheMonthCount = 
                _context.EmpOfMonths.Count(x => x.DateAwarded >= GetDate(1, 1) && x.DateAwarded <= GetDate(12, 31));
            var empOfTheYearCount = 
                _context.EmpOfYears.Count(x => x.DateAwarded >= GetDate(1, 1) && x.DateAwarded <= GetDate(12, 31));
            int awardTotal = empOfTheMonthCount + empOfTheYearCount;
            
            return GetAwardsByTypeResponse(empOfTheMonthCount, empOfTheYearCount, awardTotal);   
        }

        private AwardsByTypeResponse GetAwardsByTypeResponse(int empOfTheMonthCount, int empOfTheYearCount, int awardTotal)
        {
            return new AwardsByTypeResponse
            {
                Awards = new List<AwardByTypeData>
                {
                    new AwardByTypeData
                    {
                        AwardName = "Employee of the Month",
                        AwardCount = empOfTheMonthCount
                    },

                    new AwardByTypeData
                    {
                        AwardName = "Employee of the Year",
                        AwardCount = empOfTheYearCount
                    }
                },
                AwardTotal = awardTotal
            };
        }

        public AwardDataByMonthResponse GetAwardDataByMonth()
        {
            var databyMonth = new Dictionary<string, AwardDataByMonth>();
            
            var eomAwardCountByMonth = _context.EmpOfMonths
                .Where(x => x.DateAwarded >= GetDate(1, 1) && x.DateAwarded <= GetDate(12, 31))
                .GroupBy(x => new 
                {
                    Month = x.DateAwarded.Month,
                })
                .Select(x => new AwardDataByMonth
                {
                    MonthNumber = x.Key.Month,
                    Month = CultureInfo.CurrentCulture.DateTimeFormat.GetAbbreviatedMonthName(x.Key.Month),
                    Awards = x.Count(),
                    Users = x.Select( y => y.AwardCreatorId).Distinct().Count()
                   
                })
                .OrderByDescending(x => x.MonthNumber)
                .ToList();  
            
            foreach (var month in eomAwardCountByMonth)
            {
                databyMonth.Add(month.Month, month);
            }
            
            var eoyAwardCountByMonth = _context.EmpOfYears
                .Where(x => x.DateAwarded >= GetDate(1, 1) && x.DateAwarded <= GetDate(12, 31))
                .GroupBy(x => new 
                {
                    Month = x.DateAwarded.Month,
                })
                .Select(x => new AwardDataByMonth
                {
                    MonthNumber = x.Key.Month,
                    Month = CultureInfo.CurrentCulture.DateTimeFormat.GetAbbreviatedMonthName(x.Key.Month),
                    Awards = x.Count(),
                    Users = x.Select( y => y.AwardCreatorId).Distinct().Count()
                    
                })
                .OrderByDescending(x => x.MonthNumber)
                .ToList();
            
            foreach (var month in eoyAwardCountByMonth)
            {
                if (!databyMonth.ContainsKey(month.Month))
                {
                    databyMonth.Add(month.Month, month);
                }
                else
                {
                    databyMonth[month.Month] = new AwardDataByMonth
                    {
                        MonthNumber = month.MonthNumber,
                        Month = month.Month,
                        Awards =  databyMonth[month.Month].Awards + month.Awards,
                        Users =   databyMonth[month.Month].Users + month.Users
                    };
                }
            }

            var data = databyMonth.Values.ToList().OrderBy(x => x.MonthNumber).ToList(); 
            return new AwardDataByMonthResponse
            {
                AwardDataByMonth = data
            };
        }

        private DateTime GetDate(int month, int day)
        {
            return new DateTime(DateTime.Now.Year , month, day);
        }
    }
}