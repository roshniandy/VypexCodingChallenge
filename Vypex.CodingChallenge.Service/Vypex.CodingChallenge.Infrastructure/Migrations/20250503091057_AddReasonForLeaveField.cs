using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Vypex.CodingChallenge.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddReasonForLeaveField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Reason",
                table: "LeaveDays",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reason",
                table: "LeaveDays");
        }
    }
}
