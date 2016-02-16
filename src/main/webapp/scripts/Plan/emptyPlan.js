var nameProject = ["Project 1","Project 2","Project 3"];
var moduleProject = ["Employee","Plan","Project"];
var typeProject = ["Developer","Analysis","Developer"];
var backColor = ["active","success","warning","danger","info"];

for(var i = 0 ; i < nameProject.length ; i++){
	var html = "";
	html+="<tr class='text-center "+backColor[i%backColor.length]+"'><td>"+nameProject[i]+"</td><td>"+moduleProject[i]+"</td><td>"+typeProject[i]+"</td></tr>"
	$("#tableEmpty").append(html);
}