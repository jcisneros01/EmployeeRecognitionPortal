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
            
           //string pdfFilePath = 
               
           GenerateLatexFile(eoy.AwardCreatorId, empOfYear);
            
           _context.EmpOfYears.Add(empOfYear);
           _context.SaveChanges();
           
           //EmailAward(pdfFilePath, eoy.AwardCreatorId, empOfYear);
           
           //CleanupLatex(pdfFilePath);
           
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
            
            //return BuildLatexFile(empOfYear, Convert.ToBase64String(awardCreator.Signature));

        }
        
//         private string BuildLatexFile(EmpOfYear empOfYear, string sig)
//        {
//            // Make temporary directory to hold necessary files
//            Random rnd = new Random();
//            int tempNum = rnd.Next(10000);
//            string filePath = "empTemp" + tempNum + "/";
//
//            DirectoryInfo di; // directory
//            FileStream fs;   // actual LaTex file
//
//          
//            if (Directory.Exists(filePath))
//            {
//                Directory.Delete(filePath);
//            }
//
//            //Create directory and file
//            di = Directory.CreateDirectory(filePath);
//            fs = File.Create(di.ToString() + "latex" + tempNum.ToString() + ".tex");
//
//            Byte[] lt = new UTF8Encoding(true).GetBytes(empOfYear.LaTexFile);
//            fs.Write(lt, 0, lt.Length);
//            fs.Close();
//            
//            //Convert 64bit encoded signature to png
//            Base64ToImage(sig, filePath + "sig.png");
//
//            // Copy award background
//            File.Copy(Directory.GetCurrentDirectory() + "/Entities/AwardTemplates/certBorder.jpg",
//                di + "/certBorder.jpg");
//                
//            try
//            {
//                // Run latexmk
//                var proc = new Process()
//                {
//                    StartInfo = new ProcessStartInfo
//                    {
//                        WorkingDirectory = di.Name,
//                        FileName = "latexmk",
//                        Arguments = $"-pdf -f " + "latex" + tempNum.ToString() + ".tex",
//                        RedirectStandardOutput = false,
//                        UseShellExecute = false,
//                        CreateNoWindow = true
//                    }
//                };
//                proc.Start();
//                proc.WaitForExit();
//
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine(ex.ToString());
//            }
//                   
//            //Return pdf file
//            return (@di.FullName.ToString() + "latex" +  tempNum.ToString() + ".pdf");
//        }
//        
//
//        private void Base64ToImage(string b64, string path)
//        {
//            File.WriteAllBytes(path, Convert.FromBase64String(b64));
//        }
//        
//
//        private void EmailAward(string filePath,int awardCreatorId, EmpOfYear empOfYear)
//        {
//            
//            var awardCreator = _context.Users
//                .Include(x => x.AwardCreator)
//                .FirstOrDefault(x => x.Id == awardCreatorId)?.AwardCreator;
//            
//            //Create a new email object
//            var msg = new MailMessage(
//                awardCreator.User.Email,
//                empOfYear.EmployeeEmail,
//                "WOW!   Employee of the Year - Congratulations!",
//                "Hi " + empOfYear.EmployeeName + ",\n\nThank you for all of your hard work this YEAR!  See your attached award.\n\nBest,\n" + awardCreator.Name
//            );
//            
//            // Attach pdf for award
//            Console.WriteLine("SENDING IN EMAIL: " + filePath);
//            var pdf = new Attachment(filePath, MediaTypeNames.Application.Pdf);
//            msg.Attachments.Add(pdf);
//            
//            //Send
//            var client = new SmtpClient
//            {
//                Host = "smtp.gmail.com",
//                Port = 587,
//                EnableSsl = true,
//                DeliveryMethod = SmtpDeliveryMethod.Network,
//                Credentials = new NetworkCredential("employeerecognitionapp@gmail.com", "osuBeavers19"),
//                Timeout = 20000
//            };
//
//            try
//            {
//                client.Send(msg);
//                pdf.Dispose();
//            }
//            catch (Exception ex)
//            {
//                Console.Write(ex.ToString());
//            }
//        }
//        
//        private void CleanupLatex(string filePath)
//        {
//            //get directory from string
//            filePath = filePath.Remove(filePath.IndexOf("latex",0, filePath.Length, StringComparison.Ordinal));
//            var di = new DirectoryInfo(filePath);
//            
//            //delete all files within dir
//            foreach (var f in di.GetFiles())
//            {
//                f.Delete();
//            }
//            
//            // delete dir
//            di.Delete();
//        }

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
