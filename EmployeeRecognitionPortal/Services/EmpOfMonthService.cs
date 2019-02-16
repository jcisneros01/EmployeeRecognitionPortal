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

           //string pdfFilePath = 
           
           GenerateLatexFile(eom.AwardCreatorId, empOfMonth);
           
           _context.EmpOfMonths.Add(empOfMonth);
           _context.SaveChanges();
           
           //EmailAward(pdfFilePath, eom.AwardCreatorId, empOfMonth);
           
           //CleanupLatex(pdfFilePath);
           
           return _mapper.Map<EmpOfMonth, EmpOfMonthResponse>(empOfMonth);
        }

        private void GenerateLatexFile(int awardCreatorId, EmpOfMonth empOfMonth)
        {
            var awardCreator = _context.Users
                .Include(x => x.AwardCreator)
                .FirstOrDefault(x => x.Id == awardCreatorId)?.AwardCreator;
            if (awardCreator == null)
            {
                throw new UserNotFoundException($"AwardCreator with id {awardCreatorId} not found");
            }
            
            empOfMonth.AwardCreator = awardCreator;
            empOfMonth.CreateLaTex();
            
            //return BuildLatexFile(empOfMonth, Convert.ToBase64String(awardCreator.Signature));
           
        }

//        private string BuildLatexFile(EmpOfMonth empOfMonth, string sig)
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
//            Byte[] lt = new UTF8Encoding(true).GetBytes(empOfMonth.LaTexFile);
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
//        private void EmailAward(string filePath,int awardCreatorId, EmpOfMonth empOfMonth)
//        {
//            
//            var awardCreator = _context.Users
//                .Include(x => x.AwardCreator)
//                .FirstOrDefault(x => x.Id == awardCreatorId)?.AwardCreator;
//            
//            //Create a new email object
//            var msg = new MailMessage(
//                awardCreator.User.Email,
//                empOfMonth.EmployeeEmail,
//                "Employee of the Month - Congratulations!",
//                "Hi " + empOfMonth.EmployeeName + ",\n\nThank you for all of your hard work this month!  See your attached award.\n\nBest,\n" + awardCreator.Name
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
