using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using AutoMapper;
using EmployeeRecognitionPortal.Models;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;


// This content lives on another server:  52.175.221.124
//    It was easier to perform the linux specific tasks separately
//    than on the Windows server we have our application deployed.


namespace EmployeeRecognitionPortal.Services
{
    public class LatexService
    {



      public LatexService(){

      }

      public static void CreateLatex(Award award){

        var filePath = BuildLatexFile(award);
        EmailAward(filePath, award);
        CleanupLatex(filePath);

      }

      private static string BuildLatexFile(Award award)
      {
          // Make temporary directory to hold necessary files
          Random rnd = new Random();
          int tempNum = rnd.Next(10000);
          string filePath = "empTemp" + tempNum + "/";

          DirectoryInfo di; // directory
          FileStream fs;   // actual LaTex file


          if (Directory.Exists(filePath))
          {
              Directory.Delete(filePath);
          }

          //Create directory and file
          di = Directory.CreateDirectory(filePath);
          fs = File.Create(di.ToString() + "latex" + tempNum.ToString() + ".tex");

          Byte[] lt = new UTF8Encoding(true).GetBytes(award.LaTexFile);
          fs.Write(lt, 0, lt.Length);
          fs.Close();



          //Convert 64bit encoded signature to png
          Base64ToImage(Convert.ToBase64String(award.AwardCreator.Signature), filePath + "sig.png");

          // Copy award background
          File.Copy(Directory.GetCurrentDirectory() + "/Entities/AwardTemplates/certBorder.jpg",
              di + "/certBorder.jpg");

          try
          {
              // Run latexmk
              var proc = new Process()
              {
                  StartInfo = new ProcessStartInfo
                  {
                      WorkingDirectory = di.Name,
                      FileName = "latexmk",
                      Arguments = $"-pdf -f " + "latex" + tempNum.ToString() + ".tex",
                      RedirectStandardOutput = false,
                      UseShellExecute = false,
                      CreateNoWindow = true
                  }
              };
              proc.Start();
              proc.WaitForExit();

          }
          catch (Exception ex)
          {
              Console.WriteLine(ex.ToString());
          }

          //Return pdf file
          return (@di.FullName.ToString() + "latex" +  tempNum.ToString() + ".pdf");
      }


      private static void Base64ToImage(string b64, string path)
      {
          File.WriteAllBytes(path, Convert.FromBase64String(b64));
      }


      private static void EmailAward(string filePath, Award award)
      {

          Console.WriteLine("INSIDE EMAIL AWARD");
          Console.WriteLine(filePath);
          Console.WriteLine(award.EmployeeName);

          //Create a new email object
          // Todo:  Differentiate based on award type
          var msg = new MailMessage(
              "employeerecognitionapp@gmail.com",
              award.EmployeeEmail,
              "Employee of the Month - Congratulations!",
              "Hi " + award.EmployeeName + ",\n\nThank you for all of your hard work this month!  See your attached award.\n\nBest,\n" + award.AwardCreator.Name
          );

          // Attach pdf for award
          var pdf = new Attachment(filePath, MediaTypeNames.Application.Pdf);
          msg.Attachments.Add(pdf);

          //Send
          var client = new SmtpClient
          {
              Host = "smtp.gmail.com",
              Port = 587,
              EnableSsl = true,
              DeliveryMethod = SmtpDeliveryMethod.Network,
              Credentials = new NetworkCredential("employeerecognitionapp@gmail.com", "osuBeavers19"),
              Timeout = 20000
          };

          try
          {
              client.Send(msg);
              pdf.Dispose();
          }
          catch (Exception ex)
          {
              Console.Write(ex.ToString());
          }
      }

      private static void CleanupLatex(string filePath)
      {
          //get directory from string
          filePath = filePath.Remove(filePath.IndexOf("latex",0, filePath.Length, StringComparison.Ordinal));
          var di = new DirectoryInfo(filePath);

          //delete all files within dir
          foreach (var f in di.GetFiles())
          {
              f.Delete();
          }

          // delete dir
          di.Delete();
      }



    }

}
