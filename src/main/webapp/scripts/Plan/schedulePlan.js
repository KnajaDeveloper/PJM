// Parameter Schedule
var date=15;
var names=["Tony","Robert","Net","Pakinson"];
var works=["Employee,Employee===Project,Employee===Project,Project,Project,Security,Security,Security,Security,Security,Security,Service,Service,Service,5===6","Project===Security===Employee,Project===Security===Employee,Project,Project,0,0,Employee,Employee","0,0,0,Employee,Employee,Project,Employee","Employee,0,0,Employee,Employee,Employee,Employee,Project"];
var backColor = ["success","warning","danger","info"];
var days = [Label.Sun,Label.Mon,Label.Tue,Label.Wed,Label.Thu,Label.Fri,Label.Sat] ;
var months = [Label.Jan,Label.Feb,Label.Mar,Label.Apr,Label.May,Label.Jun,Label.Jul,Label.Aug,Label.Oct,Label.Nov,Label.Dec] ;
var recieveWork ;

// Parameter Empty Plan
var nameProject = ["Project 1","Project 2","Project 3"];
var moduleProject = ["Employee","Plan","Project"];
var typeProject = ["Developer","Analysis","Developer"];
var resultEmptyTask;

//$("#panelEmployee").hide();
//$("#panelPlan").hide();
addEmptyTask();

function addDate(dateStart,dateEnd){
	var diff = dateEnd.getTime() - dateStart.getTime();
	var diffDays = diff / (24 * 60 * 60 * 1000);
	var numDate = dateStart ;
	numDate.setDate(dateStart.getDate()-1);
	for(var i=0; i <= diffDays ; i++) {
		numDate.setDate(dateStart.getDate()+1);
		$("#tbSevenDay").append("<th class='text-center' style='min-width:100px; height:10px; padding: 0px;'>"+days[numDate.getDay()]+"</th>");
		var dateMonth = ""+months[numDate.getMonth()]+" "+numDate.getDate()+", "+numDate.getFullYear();
		$("#tbDate").append("<td class='text-center' style='min-width:100px;'><font size='2'>"+dateMonth+"</font></td>");
	}
}

function addName() {
	recieveWork = null ;
	var year = parseInt($("#txtYear").val()) ;
	var start = "01/01/"+year;
	var end = "31/12/"+year;
	var projectId = $("#ddlProject").val();
	if(projectId=="null") projectId=null;
	var moduleId = $("#ddlModule").val();
	if(moduleId=="null") moduleId=null;
	var teamId = $("#ddlTeam").val();
	if(teamId=="null") teamId=null;

	var dataJsonData = {
		statProject: ""+DateUtil.dataDateToDataBase(start,"EN") ,
		endProject: ""+DateUtil.dataDateToDataBase(end,"EN") ,
		projectId: projectId ,
		moduleProjectId:moduleId ,
		teamId:teamId
	};
	recieveWork = $.ajax({
		headers: {
			Accept: "application/json"
		},
		type: "GET",
		url: contextPath + '/plans/findDataByYearAndProjectAndModuleProjectAndTeam',
		data : dataJsonData,
		complete: function(xhr){
			if(xhr.status === 201 || xhr.status === 200){

			}else if(xhr.status === 500){

			}
		},
		async: false
	});

	if(recieveWork!=null){
		names = [];
		for(var i = 0 ; i < recieveWork.responseJSON.Name.length ; i++){
			names.push(""+recieveWork.responseJSON.Name[i]);
		}
	}

	for (var i = 0; i < names.length; i++) {
		var _rowspan = findSameRow(works[i]);
		var html = "";
		for (var num = 0; num < _rowspan; num++) {
			if (num == 0) html += "<tr id='" + names[i] + num + "' class='text-center'><td rowspan='" + _rowspan + "'  style='vertical-align: middle; padding: 0px;'>" + names[i] + "</td></tr>";
			else html += "<tr id='" + names[i] + num + "' class='text-center' style='padding: 0px;'></tr>";
		}
		$("#tableData").append(html);
	}
}

function addWork() {
	for (var i = 0; i < names.length; i++) {
		var _row = findSameRow(works[i]);
		var workRow = changeRowToString(works[i]);
		for (var j = 0; j < _row; j++) {
			var html = "";
			var work = workRow[j].split(",");
			for (var workDate = 0; workDate < work.length; workDate++) {
				var same = findSameCol(workRow[j], workDate);
				var class_ = "progress-bar-" + backColor[i % backColor.length] + " text-center";
				if (work[workDate] != 0)
					html += "<td colspan='" + same + "' style='width:65px; padding: 0px;'><div class='" + class_ + "' style='width: 100%;'><font color='white' size='1'>" + work[workDate] + "</font></div></td>";
				else
					html += "<td colspan='" + same + "' style='width:65px; padding: 0px;'></td>";
				if (same != 0) workDate += same - 1;
			}
			$("#" + names[i] + j).append(html);
		}
	}
}

function addEmptyTask(){
	resultEmptyTask = $.ajax({
		headers: {
			Accept: "application/json"
		},
		type: "GET",
		url: contextPath + '/tasks/findEmptyTask',
		complete: function(xhr){
			if(xhr.status === 201 || xhr.status === 200){

			}else if(xhr.status === 500){

			}
		},
		async: false
	});

	for(var i = 0 ; i < resultEmptyTask.responseJSON.Task.length ; i++){
		var html = "";
		html+="<tr class='text-center'>" +
			"<td>"+resultEmptyTask.responseJSON.Task[i].taskName+"</td>" +
			"<td>"+resultEmptyTask.responseJSON.Task[i].program.moduleProject.moduleName+"</td>" +
			"<td>"+resultEmptyTask.responseJSON.Task[i].typeTask.typeTaskName+"</td>" +
			"</tr>";
		$("#tableEmpty").append(html);
	}
	for(var i = 0 ; i < resultEmptyTask.responseJSON.OtherTask.length ; i++){
		var html = "";
		html+="<tr class='text-center'>" +
			"<td>"+resultEmptyTask.responseJSON.OtherTask[i].taskName+"</td>" +
			"<td>"+" "+"</td>" +
			"<td>"+resultEmptyTask.responseJSON.OtherTask[i].typeTask.typeTaskName+"</td>" +
			"</tr>";
		$("#tableEmpty").append(html);
	}

	//for(var i = 0 ; i < nameProject.length ; i++){
	//	var html = "";
	//	html+="<tr class='text-center'><td>"+nameProject[i]+"</td><td>"+moduleProject[i]+"</td><td>"+typeProject[i]+"</td></tr>";
	//	$("#tableEmpty").append(html);
	//}
}

function changeRowToString(input){
	var sameRow = findSameRow(input);
	var message = [];
	for(var i=0;i<sameRow;i++) {
		message.push("");
		for(var j=0;j<date;j++){
			if(j!=date-1) message[i]+="0,";
			else message[i]+="0";
		}
	}

	var x = input.split(',');
	for(var i=0;i<x.length;i++){
		var y = x[i].split("===");
		for(var j=0;j<y.length;j++){
			message[j] = replaceMessage(i,y[j],message[j]);
		}
	}
	var textAlert = "";
	for(var i=0;i<sameRow;i++) textAlert+="Message["+i+"] : "+message[i]+"\n";
	//alert(textAlert+"\n X : "+x);
	return message ;
}

function findSameCol(input,startindex){
	var subInput = input.split(",");
	var key=subInput[startindex];
	var count = 0 ;
	for(var i=startindex ; i < subInput.length ; i++){
		if(subInput[i]==key) count++;
		else break;
	}
	return count;
}

function findSameRow(input){
	var subInput = input.split(",");
	var maxRow = 1 ;
	for(var i=0;i<subInput.length;i++){
		var checkRow = subInput[i].split("===");
		if(checkRow.length>maxRow) maxRow=checkRow.length;
	}
	return maxRow;
}

function replaceMessage(index,data,inputMessage){
	var subInput = inputMessage.split(',');
	subInput[index] = data;
	var stringReturn = "";
	for(var i=0;i<subInput.length;i++){
		if(i!=subInput.length-1) stringReturn += ""+subInput[i]+",";
		else  stringReturn += ""+subInput[i];
	}
	return stringReturn;
}