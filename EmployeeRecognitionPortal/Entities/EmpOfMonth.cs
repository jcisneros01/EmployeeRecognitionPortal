using System;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace EmployeeRecognitionPortal.Models
{
    public class EmpOfMonth : Award
    {
        //Initialize LaTexFile
        public override void CreateLaTex()
        {
        StringBuilder s = new StringBuilder();
        
        s.Append(@"%========import packages============
            \documentclass[fontsize=18pt]{scrartcl} % document type
            \usepackage[letterpaper,top=3cm,right=3cm,bottom=3cm, left=3cm,]{geometry}  % define margins
            \usepackage{pdflscape,setspace}  %landscape
            \usepackage{tgschola} % font
            \usepackage{fourier-orns} % font ornaments
            \usepackage{wallpaper} % background
        
            %=========begin doc=============
            \begin{document}
            \begin{landscape}
            \begin{center}
            \linespread{2}\selectfont
            \pagestyle{empty}
        
            %=========background=============
            \TileWallPaper{1\paperwidth}{1\paperheight}{certBorder.jpg}
        
            %========Title EOM=========
        
            \begin{minipage}[c]{8in}
                \centering
                \onehalfspacing
                \Huge\bfseries\color{red}{ Employee of the Month \\ \par}
            \end{minipage}
            \vskip .3em
        
            %=======Certificate of Apprec, symbol============
        
            \begin{minipage}[c]{8in}
                \centering
                \onehalfspacing
                \Large\bfseries{Certificate of Appreciation}
                \par
                \Huge\leafright\quad{\textxswup}\quad\leafleft\par
            \end{minipage}
            \vskip 1em
        
            %=========Awarded to:====================
        
            \begin{minipage}[c]{8.2in}
                \centering
                \linespread{1.1}
                \Large{Hereby Awarded to: \\ }
                \vskip .2em
                \Huge{ \underline{ ");
        s.Append(this.EmployeeName);
        s.Append(@"}}
            \Large{ \\");
        s.Append(this.EmployeeEmail);
        s.Append(@"}
            \LARGE{ \\");
        s.Append(this.DateAwarded.ToShortDateString());
        s.Append(@"}
            \end{minipage}
        
            %=========Signature====================
            \vfill
            \begin{minipage}[c]{3in}
            \centering
            \includegraphics[width=.5\linewidth]{");
        s.Append(this.AwardCreator.Signature);
        s.Append(@"}
        
            \parbox{3in}{\shortstack{
                \vrule width 3in height 0.5pt \\
                \small{");
        s.Append(this.AwardCreator.Name);
        s.Append(@"} \\
             \small {");
        s.Append(this.AwardCreator.User.Email);
        s.Append(@"}}}
            \end{minipage}
            \pagebreak
        
            %============End Doc=================
            \end{center}
            \end{landscape}
            \end{document}");
        
        
        this.LaTexFile = s.ToString();       
        }
    }
}
