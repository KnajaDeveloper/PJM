var date=15;
var names=["Tony","Robert","Net","Pakinson"];
var works=["1,1===2,1===2,2,2,3,3,3,3,3,3,4,4,4,5===6","2===3===1,2===3===1,2,2,0,0,1,1","0,0,0,1,1,2,1","1,0,0,1,1,1,1,2"];
var backColor = ["active","success","warning","danger","info"];

// Add Date
for(var i=1; i <= date ; i++) 
	$("#tbDate").append("<th class='text-center' style='width:65px;'>"+i+"</th>");

// Add Name
for(var i=0; i<names.length; i++) {
	var _rowspan = findSameRow(works[i]);
	var html="";
	for(var num=0;num<_rowspan;num++){
		if(num==0) html+="<tr id='"+names[i]+num+"' class='text-center "+backColor[i%backColor.length]+"'><td rowspan='"+_rowspan+"'>"+names[i]+"</td></tr>";
		else html+="<tr id='"+names[i]+num+"' class='text-center "+backColor[i%backColor.length]+"'></tr>";
	}
	$("#tableData").append(html);
}

// Add Data Work
for(var i=0; i< names.length; i++){
	var _row = findSameRow(works[i]);
	var workRow = changeRowToString(works[i]);
	for(var j=0;j<_row;j++){
		var html = "";
		var work = workRow[j].split(",");
		for(var workDate=0; workDate<work.length; workDate++){
			var same = findSameCol(workRow[j],workDate);
			if(work[workDate]!=0)
				html+="<td colspan='"+same+"' style='width:65px;'><div class='progress-bar-info text-center' style='width: 100%;'>"+work[workDate]+"</div></td>";
			else
				html+="<td colspan='"+same+"' style='width:65px;'></td>";	
			if(same!=0) workDate+=same-1;
		}
		$("#"+names[i]+j).append(html);
	}
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