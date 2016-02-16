var projectName = ["Project 1","Project 2"];
var moduleProject = ["Module 1","Module 2"];
var teamName = ["Team 1","Team 2"];

var html = "";
for(var i=0;i<projectName.length;i++) {
	html = "<option>"+projectName[i]+"</option>";
	$("#ddlProject").append(html);
}
for(var i=0;i<moduleProject.length;i++) {
	html = "<option>"+moduleProject[i]+"</option>";
	$("#ddlModule").append(html);
}
for(var i=0;i<teamName.length;i++) {
	html = "<option>"+teamName[i]+"</option>";
	$("#ddlTeam").append(html);
}