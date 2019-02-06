﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployeeRecognitionPortal.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Email = table.Column<string>(nullable: false),
                    Password = table.Column<string>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    IsAdmin = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AwardCreator",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Signature = table.Column<byte[]>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AwardCreator", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AwardCreator_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmpOfMonths",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    EmployeeName = table.Column<string>(nullable: false),
                    EmployeeEmail = table.Column<string>(nullable: false),
                    DateAwarded = table.Column<DateTime>(nullable: false),
                    AwardCreatorId = table.Column<int>(nullable: false),
                    LaTexFile = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmpOfMonths", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmpOfMonths_AwardCreator_AwardCreatorId",
                        column: x => x.AwardCreatorId,
                        principalTable: "AwardCreator",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmpOfYears",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    EmployeeName = table.Column<string>(nullable: false),
                    EmployeeEmail = table.Column<string>(nullable: false),
                    DateAwarded = table.Column<DateTime>(nullable: false),
                    AwardCreatorId = table.Column<int>(nullable: false),
                    LaTexFile = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmpOfYears", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmpOfYears_AwardCreator_AwardCreatorId",
                        column: x => x.AwardCreatorId,
                        principalTable: "AwardCreator",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AwardCreator_UserId",
                table: "AwardCreator",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmpOfMonths_AwardCreatorId",
                table: "EmpOfMonths",
                column: "AwardCreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_EmpOfYears_AwardCreatorId",
                table: "EmpOfYears",
                column: "AwardCreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmpOfMonths");

            migrationBuilder.DropTable(
                name: "EmpOfYears");

            migrationBuilder.DropTable(
                name: "AwardCreator");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
