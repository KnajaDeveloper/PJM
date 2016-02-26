var pagginationProgram = $.extend({},UtilPaggination);
var pagginationTask = $.extend({},UtilPaggination);

$(document).ready(function(){

	var dataJsonData = {
		moduleCode: moduleCode
	}

    var checkdDb = $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/moduleprojects/findModuleProjectByModuleCode',
		data: dataJsonData,
		complete: function(xhr){
		},
		async: false
	});

	checkdDb = checkdDb.responseJSON;
	$("#lblModuleNeme").text(checkdDb[0].moduleProject.moduleName);
	$("#lblModuleInitial").text(checkdDb[0].moduleProject.moduleCode);
	$("#lblModuleCost").text(checkdDb[0].moduleProject.moduleCost);
	$("#lblModuleDateStart").text(DateUtil.dataDateToFrontend(checkdDb[0].moduleProject.dateStart,commonData.language));
	$("#lblModuleDateEnd").text(DateUtil.dataDateToFrontend(checkdDb[0].moduleProject.dateEnd,commonData.language));
	$("#lblModuleCostBalance").text(searchTaskCost(checkdDb[0].moduleProject.moduleCost));

	checkdDb.forEach(function(value){
		$("#lblModuleManager").append(value.empCode + '<br/>');
	});

	$("#lblModuleManager").append('<br/>');


	searchDataProgram();
  	$('#checkboxAllProgram').prop('checked', false);
});

function searchTaskCost(moduleCost){

	var dataJsonData = {
		moduleProject: moduleCode
	}

    var checkdDb = $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/tasks/findTaskCostforSum',
		data: dataJsonData,
		complete: function(xhr){
		},
		async: false
	});

	return moduleCost - checkdDb.responseJSON;
}

pagginationProgram.setEventPaggingBtn("paggingSimpleProgram",pagginationProgram);
pagginationProgram.loadTable = function loadTable (jsonData) {

    if(jsonData.length <= 0)
       bootbox.alert("ไม่พบข้อมูลโปรแกรม");

   $('#checkboxAllProgram').prop('checked', false);
    $('#ResualtSearchProgram').empty();
    var link = "";
    var i = 1;
    var tableData = "";

    jsonData.forEach(function(value){

    	var dataJsonData = {
  			program: value.code
    	}

        var checkdDb = $.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			headers: {
				Accept: "application/json"
			},
			url: contextPath + '/tasks/findCheckProgramCode',
			data: dataJsonData,
			complete: function(xhr){
			},
			async: false
		});

		checkdDb = checkdDb.responseJSON;

		var chkDB = false;
		if(checkdDb > 0){
			chkDB = true;
		}

        tableData = ''
		+ '<tr id="trProgram' + i + '" style="background-color: #fff">'
            + '<td class="text-center">'
            + '<input chkBoxDB' + i + '="' + chkDB +'" id="chkDeleteProgram' + i + '" class="checkProgram" type="checkbox" name="chkdelete" />'
            + '</td>'
            + '<td class="text-center">'
            + '<button id="btnEditProgram' + i + '" type="button" class="btn btn-info" data-toggle="modal" data-target="#modalProgram" data-backdrop="static"><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="tdProgramCode' + i + '" class="text-center" onclick="onClickTrProgram(this)">'
            + value.code
            + '</td>'
            + '<td id="tdProgramName' + i++ + '" class="text-center" onclick="onClickTrProgram(this)">'
            + value.name
            + '</td>'
        + '</tr>';

        $('#ResualtSearchProgram').append(
            tableData
        );
    });
};

function searchDataProgram() {
  	var dataJsonData = {
  		moduleProject: moduleCode
    }

    pagginationProgram.setOptionJsonData({
      	url:contextPath + "/programs/findPaggingDataProgram",
      	data:dataJsonData
    });

    pagginationProgram.setOptionJsonSize({
        url:contextPath + "/programs/findPaggingSizeProgram",
        data:dataJsonData
    });

    pagginationProgram.search(pagginationProgram);
}

var checkProgramName;

$('#TableProgram').on("click", "[id^=btnEditProgram]", function () {
	chkAEProgram = 1;
    var id = this.id.split('m')[1];
    $('#btnModalProgramNext').hide();
	$(".modal-title").text("แก้ไขโปรแกรม");
	$('#txtProgramCode').val($('#tdProgramCode' + id).text()).attr('disabled', true);
	checkProgramName = $('#tdProgramName' + id).text();
	$('#txtProgramName').val($('#tdProgramName' + id).text());
});

var ProgramCode;
var idPC;

function onClickTrProgram(object) {
    var id = object.id.split('e')[1];

    ProgramCode = $('#tdProgramCode' + id).text();
    searchDataTask();
  	$('#checkboxAllTask').prop('checked', false);
  	$('#lblEmpName').text("");
	$('#lblTaskName').text("");
	$('#lblSDate').text("");
	$('#lblEDate').text("");
	$('#txtaDetail').val(null);

	idPC = id;

	var lengthTr = $('#TableProgram').find('tr').length;
    for (var i = 1; i < lengthTr; i++) {
		$('#trProgram' + i).css('background-color', '#FFF');
	}

	$('#trProgram' + id).css('background-color', '#F5F5F5');
}

var dataTypeTask = []
var dataTypeTaskName = []
var dataEmpCode = []
var dataDateStart = []
var dataDateEnd = []
var dataDetail = []

function convertdataDate(input){
	var x = input.split('-');
	var year = parseInt(x[0]);
	x[0] = "" + year;
	return ""+x[2]+"/"+x[1]+"/"+x[0];
}

pagginationTask.setEventPaggingBtn("paggingSimpleTask",pagginationTask);
pagginationTask.loadTable = function loadTable (jsonData) {

	$('#formADTask').show();
    $('#formTask').show();

    if(jsonData.length <= 0)
       bootbox.alert("ไม่พบข้อมูลงาน");

    $('#ResualtSearchTask').empty();

    var link = "";
    var i = 1;
    var tableData = "";

    dataTypeTask = [];
	dataEmpCode = [];
	dataDateStart = [];
	dataDateEnd = [];
	dataDetail = [];

    jsonData.forEach(function(value){
    	dataTypeTask.push(value.typeTask.typeTaskCode);
    	dataTypeTaskName.push(value.typeTask.typeTaskName);
    	dataEmpCode.push(value.empCode);

    	if(convertdataDate((value.dateStart).split(' ')[0]) === "01/01/1970")
    		dataDateStart.push("");
    	else
    		dataDateStart.push(convertdataDate((value.dateStart).split(' ')[0]));

    	if(convertdataDate((value.dateEnd).split(' ')[0]) === "01/01/1970")
    		dataDateEnd.push("");
    	else
    		dataDateEnd.push(convertdataDate((value.dateEnd).split(' ')[0]));

    	dataDetail.push(value.detail);

    	var colorProgress = "progress-bar-warning";
    	if(value.progress === "100"){
    		colorProgress = "progress-bar-success"
    	}

        tableData = ''
		+ '<tr id="trTask' + i + '" style="background-color: #fff">'
            + '<td class="text-center">'
            + '<input id="chkDeleteTask' + i + '" class="checkTask" type="checkbox" name="chkdelete" />'
            + '</td>'
            + '<td class="text-center">'
            + '<button id="btnEditTask' + i + '" type="button" class="btn btn-info" data-toggle="modal" data-target="#modalTask" data-backdrop="static"><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="tdCodeTask' + i + '" class="text-center" onclick="onClickTrTask(this)">'
            + value.taskCode
            + '</td>'
            + '<td id="tdNameTask' + i + '" class="text-center" onclick="onClickTrTask(this)">'
            + value.taskName
            + '</td>'
            + '<td id="tdCostTask' + i + '" class="text-center" onclick="onClickTrTask(this)">'
            + value.taskCost
            + ' Point</td>'
            + '<td id="tdProgressTask' + i++ + '" onclick="onClickTrTask(this)">'
            + '<div class="progress-bar ' + colorProgress + '" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"'
            + 'style="width: ' + value.progress + '%;">'
            + value.progress
            + '%</div>'
            + '</td>'
        + '</tr>';

        $('#ResualtSearchTask').append(
            tableData
        );
    });
};

function searchDataTask() {
  	var dataJsonData = {
  		program: ProgramCode
    }

    pagginationTask.setOptionJsonData({
      	url:contextPath + "/tasks/findPaggingDataTask",
      	data:dataJsonData
    });

    pagginationTask.setOptionJsonSize({
        url:contextPath + "/tasks/findPaggingSizeTask",
        data:dataJsonData
    });

    pagginationTask.search(pagginationTask);
}

var checkTaskName;
var checkTaskCost;
var checkTypeTask;
var checkEmpName;
var checkdateStart;
var checkdateEnd;
var checkProgress;
var checkDescription;

$('#TableTask').on("click", "[id^=btnEditTask]", function () {
	chkAETask = 1;
    var id = this.id.split('k')[1];
    DDLData();
    $('#btnModalTaskNext').hide();
	$(".modal-title").text("แก้ไขงาน");
	$('#txtTaskCode').val($('#tdCodeTask' + id).text()).attr('disabled', true);
	checkTaskName = $('#tdNameTask' + id).text();
	$('#txtTaskName').val($('#tdNameTask' + id).text());
	checkTaskCost = $('#tdCostTask' + id).text().split(' ')[0];
	$('#txtTaskCost').val($('#tdCostTask' + id).text().split(' ')[0]);
	checkTypeTask = dataTypeTask[id - 1];
	document.getElementById("ddlTypeTask").value = dataTypeTask[id - 1];
	checkEmpName = dataEmpCode[id - 1];
	$('#txtEmpName').val(dataEmpCode[id - 1]);
	checkdateStart = dataDateStart[id - 1];
	$('#dateStartProject').val(dataDateStart[id - 1]);
	checkdateEnd = dataDateEnd[id - 1];
	$('#dateEndProject').val(dataDateEnd[id - 1]);
	checkProgress = $('#tdProgressTask' + id).text().split('%')[0];
	$('#txtProgress').val($('#tdProgressTask' + id).text().split('%')[0]).attr('disabled', false);
	checkDescription = dataDetail[id - 1];
	$('#txtaDescription').val(dataDetail[id - 1]);
});

function onClickTrTask(object){
	var id = object.id.split('k')[1];
	$('#lblEmpName').text(dataEmpCode[id - 1]);
	$('#lblTaskName').text(dataTypeTaskName[id - 1]);
	$('#lblSDate').text(dataDateStart[id - 1]);
	$('#lblEDate').text(dataDateEnd[id - 1]);
	$('#txtaDetail').val(dataDetail[id - 1]);

	var lengthTr = $('#TableTask').find('tr').length;
    for (var i = 1; i < lengthTr; i++) {
		$('#trTask' + i).css('background-color', '#FFF');
	}

	$('#trTask' + id).css('background-color', '#F5F5F5');
}

$('#btnAddProgram').click(function() {
	chkAEProgram = 0;
	$(".modal-title").text("เพิ่มโปรแกรม");
	$('#btnModalProgramNext').show();
	$('#txtProgramCode').attr('disabled', false);
	$('#txtProgramCode').val(null);
	$('#txtProgramName').val(null);
});

var dataProgramCode = [];
var sendDataProgram = "";

$('#btnDeleteProgram').click(function() {
	if(dataProgramCode.length > 0){
		bootbox.confirm("คุณต้องการลบข้อมูลที่เลือกหรือไม่", function(result) {
			if(result == true){
				for(var i = 0; i < dataProgramCode.length; i++){
					sendDataProgram = dataProgramCode[i];
					deleteDataProgram();
				}
				dataProgramCode = [];
				searchDataProgram();
				$('#checkboxAllProgram').prop('checked', false);

				if(chkDProgramStatus500 === 0){
					bootbox.alert("ลบข้อมูลสำเร็จ : " + chkDProgramStatus200 + " รายการ");
				}else{
					bootbox.alert("ลบข้อมูลสำเร็จ : " + chkDProgramStatus200 + " รายการ ลบข้อมูลไม่สำเร็จ : " + chkDProgramStatus500 + " รายการ");
				}

				chkDProgramStatus200 = 0;
				chkDProgramStatus500 = 0;
			}
		});
	}else{
		bootbox.alert("คุณยังไม่ได้เลือกข้อมูลที่ต้องการลบ");
	}
});

$('#TableProgram').on("click", "[id^=chkDeleteProgram]", function () {
    var id = this.id.split('m')[1];
    if ($(this).prop('checked') == true) {
    	if($("[chkBoxDB" + id + "=true]").attr("chkBoxDB" + id + "") === "true"){
        	$('#chkDeleteProgram' + id).prop('checked', false);
        	bootbox.alert("ข้อมูลนี้ถูกเรียกใช้อยู่");
        }else{
        	dataProgramCode.push($('#tdProgramCode' + id).text());
    	}
    }
    else if ($(this).prop('checked') == false) {
        var num = dataProgramCode.indexOf($('#tdProgramCode' + id).text());
        dataProgramCode.splice(num, 1);
    }
});

$('#checkboxAllProgram').click(function(){
	dataProgramCode = [];
	$(".checkProgram").prop('checked', $(this).prop('checked'));
	var lengthTr = $('#TableProgram').find('tr').length;
    for (var i = 1; i < lengthTr; i++) {
        if ($(this).prop('checked') == true) {
        	if($("[chkBoxDB" + i + "=true]").attr("chkBoxDB" + i + "") === "true"){
        		$('#chkDeleteProgram' + i).prop('checked', false);
        	}
            var num = dataProgramCode.indexOf($('#tdProgramCode' + i).text())
            if (num != "") {
                dataProgramCode.push($('#tdProgramCode' + i).text());
            }
        }
        else {
            var num = dataProgramCode.indexOf($('#tdProgramCode' + i).text());
            dataProgramCode.splice(num, 1);
        }
    }
});

var chkDProgramStatus200 = 0;
var chkDProgramStatus500 = 0;

function deleteDataProgram() {
  	var dataJsonData = {
  		programCode:sendDataProgram,
  		moduleProject: moduleCode
    }

    $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/programs/findDeleteProgram',
		data : dataJsonData,
		complete: function(xhr){
			if(xhr.status === 200)
				chkDProgramStatus200++;
			if(xhr.status === 500)
				chkDProgramStatus500++;
		},
		async: false
	});
}

var chkAEProgram = 0;

function checkProgramCode() {
  	var elem = document.getElementById('txtProgramCode').value;
  	if(!elem.match(/^([a-z0-9\_])+$/i))
  	{
  		$('#txtProgramCode').attr("data-content" , "กรุณากรอกข้อมูลรหัสโปรแกรมเป็น a-Z หรือ A-Z หรือ 0-9").popover('show');
  		return false;
  	}else{
  		return true;
  	}
};

$('[id^=btnModalProgram]').click(function() {
	var id = this.id.split('m')[1];
	if(id === 'Cancel'){
		$('#modalProgram').modal('hide');
		$('#txtProgramCode').popover('hide'); $('#txtProgramName').popover('hide');
		$('#txtProgramCode').val(null); $('#txtProgramName').val(null);
	}else{
		if($('#txtProgramCode').val() === ""){
			$('#txtProgramCode').attr("data-content" , "กรุณากรอกข้อมูลรหัสโปรแกรม").popover('show');
		}else if($('#txtProgramName').val()  === ""){
			if(checkProgramCode() === true){
				$('#txtProgramName').attr("data-content" , "กรุณากรอกข้อมูลชื่อโปรแกรม").popover('show');
			}
		}else{
			if(checkProgramCode() === true){
				var pjmProgram = {
					programCode: $('#txtProgramCode').val(),
					programName: $('#txtProgramName').val(),
					moduleProject: moduleCode
				};

				if(chkAEProgram === 0){
					checkDataProgram();
					if(chkDbProgram === 0){
						$.ajax({
							headers: {
								Accept: "application/json"
							},
							type: "POST",
							url: contextPath + '/programs/saveProgram',
							data : pjmProgram,
							complete: function(xhr){
								if(xhr.status === 201){
									if(id === 'Add'){
										bootbox.alert("บันทึกข้อมูลสำเร็จ");
										$('#modalProgram').modal('hide');
									}
									$('#txtProgramCode').val(null);
									$('#txtProgramName').val(null);
									searchDataProgram();
								}else if(xhr.status === 500){
									bootbox.alert("บันทึกข้อมูลไม่สำเร็จ");
								}
							},
							async: false
						});
					}else{
						bootbox.alert("รหัสโปรแกรมมีแล้ว");
					}
				}else if(chkAEProgram === 1){
					if($('#txtProgramName').val() === checkProgramName){
							bootbox.alert("ข้อมูลไม่มีการเปลี่ยนแปลง");
							$('#modalProgram').modal('hide');
					}else{
						$.ajax({
							headers: {
								Accept: "application/json"
							},
							type: "GET",
							url: contextPath + '/programs/findEditProgram',
							data : pjmProgram,
							complete: function(xhr){
								if(xhr.status === 200){
									bootbox.alert("แก้ไขข้อมูลสำเร็จ");
									$('#modalProgram').modal('hide');
									$('#txtProgramCode').val(null);
									$('#txtProgramName').val(null);
									searchDataProgram();
								}else if(xhr.status === 500){
									bootbox.alert("แก้ไขข้อมูลไม่สำเร็จ");
								}
							},
							async: false
						});
					}
				}
			}
		}
	}
});

var chkDbProgram;
function checkDataProgram() {
	var dataJsonData = {
  		programCode: $('#txtProgramCode').val(),
  		moduleProject: moduleCode
    }

    var checkdDb = $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/programs/findSizeProgramByProgramCode',
		data : dataJsonData,
		complete: function(xhr){
		},
		async: false
	});

    chkDbProgram = checkdDb.responseJSON;
}

$('#btnAddTask').click(function() {
	chkAETask = 0;
	$(".modal-title").text("เพิ่มงาน");
	$('#btnModalTaskNext').show();
	DDLData();
	$('#txtTaskCode').attr('disabled', false);
	$('#txtProgress').attr('disabled', true);
	$('#txtTaskCode').val(null);
	$('#txtTaskName').val(null);
	$('#txtTaskCost').val(null);
	$('#txtEmpName').val(null);
	$('#dateStartProject').val(null);
	$('#dateEndProject').val(null);
	$('#txtProgress').val("0");
	$('#txtaDescription').val("");
});

var dataTaskCode = [];
var sendDataTask = "";

$('#btnDeleteTask').click(function() {
	if(dataTaskCode.length > 0){
		bootbox.confirm("คุณต้องการลบข้อมูลที่เลือกหรือไม่", function(result) {
			if(result == true){
				for(var i = 0; i < dataTaskCode.length; i++){
					sendDataTask = dataTaskCode[i];
					deleteDataTask();
				}
				dataTaskCode = [];
				searchDataTask();
				searchDataProgram();
				$('#trProgram' + idPC).css('background-color', '#F5F5F5');
				$('#checkboxAllTask').prop('checked', false);

				if(chkDTaskStatus500 === 0){
					bootbox.alert("ลบข้อมูลสำเร็จ : " + chkDTaskStatus200 + " รายการ");
				}else{
					bootbox.alert("ลบข้อมูลสำเร็จ : " + chkDTaskStatus200 + " รายการ ลบข้อมูลไม่สำเร็จ : " + chkDTaskStatus500 + " รายการ");
				}

				chkDTaskStatus200 = 0;
				chkDTaskStatus500 = 0;
			}
		});
	}else{
		bootbox.alert("คุณยังไม่ได้เลือกข้อมูลที่ต้องการลบ");
	}
});

$('#TableTask').on("click", "[id^=chkDeleteTask]", function () {
    var id = this.id.split('k')[2];
    if ($(this).prop('checked') == true) {
        dataTaskCode.push($('#tdCodeTask' + id).text());
    }
    else if ($(this).prop('checked') == false) {
        var num = dataTaskCode.indexOf($('#tdCodeTask' + id).text());
        dataTaskCode.splice(num, 1);
    }
});

$('#checkboxAllTask').click(function(){
	dataTaskCode = [];
	$(".checkTask").prop('checked', $(this).prop('checked'));
	var lengthTr = $('#TableTask').find('tr').length;
    for (var i = 1; i < lengthTr; i++) {
        if ($(this).prop('checked') == true) {
        	// if($('#chkDeleteTask' + i).prop('disabled') == true){
        	// 	$('#chkDeleteTask' + i).prop('checked', false);
        	// }
            var num = dataTaskCode.indexOf($('#tdCodeTask' + i).text())
            if (num != "") {
                dataTaskCode.push($('#tdCodeTask' + i).text());
            }
        }
        else {
            var num = dataTaskCode.indexOf($('#tdCodeTask' + i).text());
            dataTaskCode.splice(num, 1);
        }
    }
});

var chkDTaskStatus200 = 0;
var chkDTaskStatus500 = 0;

function deleteDataTask() {
  	var dataJsonData = {
  		taskCode:sendDataTask,
  		program: ProgramCode
    }

    $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/tasks/findDeleteTask',
		data : dataJsonData,
		complete: function(xhr){
			if(xhr.status === 200)
				chkDTaskStatus200++;
			if(xhr.status === 500)
				chkDTaskStatus500++;
		},
		async: false
	});
}

function convertDate(input){
	var x = input.split('/');
	var year = parseInt(x[2]);
	x[2] = ""+year;
	return ""+x[1]+"/"+x[0]+"/"+x[2];
}

var chkAETask = 0;

function checkTaskCode() {
  	var elem = document.getElementById('txtTaskCode').value;
  	if(!elem.match(/^([a-z0-9\_])+$/i))
  	{
  		$('#txtTaskCode').attr("data-content" , "กรุณากรอกข้อมูลรหัสงานเป็น a-Z หรือ A-Z หรือ 0-9").popover('show');
  		return false;
  	}else{
  		return true;
  	}
};

$('[id^=btnModalTask]').click(function() {
	var id = this.id.split('k')[1];
	if(id === 'Cancel'){
		$('#modalTask').modal('hide');
		$('#txtTaskCode').popover('hide'); $('#txtTaskCode').val(null);
		$('#txtTaskName').popover('hide'); $('#txtTaskName').val(null);
		$('#txtTaskCost').popover('hide'); $('#txtTaskCost').val(null);
		$('#ddlTypeTask').popover('hide');
		$('#txtEmpName').val(null);
		$('#dateStartProject').val(null);
		$('#dateEndProject').val(null);
		$('#txtaDescription').val("");
	}else{
		if($('#txtTaskCode').val() === ""){
			$('#txtTaskCode').attr("data-content" , "กรุณากรอกข้อมูลรหัสงาน").popover('show');
		}else if($('#txtTaskName').val() === ""){
			if(checkTaskCode() === true){
				$('#txtTaskName').attr("data-content" , "กรุณากรอกข้อมูลชื่องาน").popover('show');
			}
		}else if($('#txtTaskCost').val() === ""){
			if(checkTaskCode() === true){
				$('#txtTaskCost').attr("data-content" , "กรุณากรอกข้อมูลจำนวนต้นทุน").popover('show');
			}
		}else if($('#ddlTypeTask').val() === "<-- ประเภทงาน -->"){
			if(checkTaskCode() === true){
				$('#ddlTypeTask').attr("data-content" , "กรุณาเลือกข้อมูลประเภทงาน").popover('show');
			}
		}else{
			if(checkTaskCode() === true){
				myFunction();

				var dateStart = $('#dateStartProject').val();
				if(dateStart === "")
					dateStart =	null;
				else
					dateStart = convertDate(dateStart)

				var dateEnd = $('#dateStartProject').val();
				if(dateEnd === "")
					dateEnd =	null;
				else
					dateEnd = convertDate(dateEnd)

				var pjmTask = {
					taskCode: $('#txtTaskCode').val(),
					taskName: $('#txtTaskName').val(),
					taskCost: parseInt($('#txtTaskCost').val()),
					typeTask: dataTypeTaskCode[index],
					empCode: $('#txtEmpName').val(),
					dateStart: new Date(dateStart),
					dateEnd: new Date(dateEnd),
					detail: $('#txtaDescription').val(),
					progress: $('#txtProgress').val(),
					program: ProgramCode
				};

				if(chkAETask === 0){
					checkDataTask();
					if(chkDbTask === 0){
						$.ajax({
							headers: {
								Accept: "application/json"
							},
							type: "POST",
							url: contextPath + '/tasks/saveTask',
							data : pjmTask,
							complete: function(xhr){
								if(xhr.status === 201){
									if(id === 'Add'){
										bootbox.alert("บันทึกข้อมูลสำเร็จ");
										$('#modalTask').modal('hide');
									}
									$('#txtTaskCode').val(null);
									$('#txtTaskName').val(null);
									$('#txtTaskCost').val(null);
									$('#txtEmpName').val(null);
									$('#dateStartProject').val(null);
									$('#dateEndProject').val(null);
									$('#txtaDescription').val("");
									DDLData();
									searchDataTask();
									searchDataProgram();
									$('#trProgram' + idPC).css('background-color', '#F5F5F5');
								}else if(xhr.status === 500){
									bootbox.alert("บันทึกข้อมูลไม่สำเร็จ");
								}
							},
							async: false
						});
					}else{
						bootbox.alert("รหัสงานมีแล้ว");
					}
				}else if(chkAETask === 1){
					if($('#txtTaskName').val() === checkTaskName && $('#txtTaskCost').val() === checkTaskCost &&
					dataTypeTaskCode[index] === checkTypeTask && $('#txtEmpName').val() === checkEmpName &&
					$('#dateStartProject').val() === checkdateStart && $('#dateEndProject').val() === checkdateEnd &&
					$('#txtProgress').val() === checkProgress && $('#txtaDescription').val() === checkDescription){
						bootbox.alert("ข้อมูลไม่มีการเปลี่ยนแปลง");
						$('#modalTask').modal('hide');
					}else{
						$.ajax({
							headers: {
								Accept: "application/json"
							},
							type: "GET",
							url: contextPath + '/tasks/findEditTask',
							data : pjmTask,
							complete: function(xhr){
								if(xhr.status === 200){
									bootbox.alert("แก้ไขข้อมูลสำเร็จ");
									$('#modalTask').modal('hide');
									$('#txtTaskCode').val(null);
									$('#txtTaskName').val(null);
									$('#txtTaskCost').val(null);
									$('#txtEmpName').val(null);
									$('#dateStartProject').val(null);
									$('#dateEndProject').val(null);
									$('#txtaDescription').val("");
									searchDataTask();
								}else if(xhr.status === 500){
									bootbox.alert("แก้ไขข้อมูลไม่สำเร็จ");
								}
							},
							async: false
						});
					}
				}
			}
		}
	}
});

var chkDbTask;
function checkDataTask() {
	var dataJsonData = {
  		taskCode: $('#txtTaskCode').val(),
		program: ProgramCode
    }

    var checkdDb = $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/tasks/findSizeTaskByTaskCode',
		data : dataJsonData,
		complete: function(xhr){
		},
		async: false
	});

    chkDbTask = checkdDb.responseJSON;
}

var ddlData;
var dataTypeTaskCode = [];
function DDLData() {
	ddlData = $.ajax({
		headers: {
			Accept: "application/json"
		},
		type: "GET",
		url: contextPath + '/typetasks/findAllTypeTask',
		data : {},
		complete: function(xhr){

		},
		async: false
	});

	dataTypeTaskCode = [];
	var addData = ddlData.responseJSON;
	$('#ddlTypeTask').empty();
	$('#ddlTypeTask').append("<option><-- ประเภทงาน --></option>");
	addData.forEach(function(value){
		dataTypeTaskCode.push(value.typeTaskCode);
		var text = value.typeTaskName;
		$('#ddlTypeTask').append("<option value=" + value.typeTaskCode + ">" + text + "</option>");
	});
}

var index;
function myFunction() {
    index = (document.getElementById("ddlTypeTask").selectedIndex) - 1;
}