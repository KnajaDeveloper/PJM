var pagginationProgram = $.extend({},UtilPaggination);
var pagginationTask = $.extend({},UtilPaggination);

$(document).ready(function(){
  searchDataProgram();
  searchDataTask();
});

pagginationProgram.setEventPaggingBtn("paggingSimpleProgram",pagginationProgram);
pagginationProgram.loadTable = function loadTable (jsonData) {

    if(jsonData.length <= 0)
       bootbox.alert("ไม่พบข้อมูล");

    $('#ResualtSearchProgram').empty();
    var link = "";
    var i = 1;
    var tableData = "";

    jsonData.forEach(function(value){
        tableData = ''
		+ '<tr style="background-color: #fff">'
            + '<td>'
        	+ '<div id="chkBox' + i + '" class="text-center">'
            + '<input  id="chkDelete' + i + '" class="check" type="checkbox" name="chkdelete" />'
        	+ '</div>'
            + '</td>'
            + '<td class="text-center">'
            + '<button id="btnEditProgram' + i + '" type="button" class="btn btn-info" data-toggle="modal" data-target="#modalProgram" data-backdrop="static"><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="tdProgramCode' + i + '" class="text-center">'
            + value.code
            + '</td>'
            + '<td id="tdProgramName' + i++ + '" class="text-center">'
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
  		moduleProject: "MP0001"
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

$('#TableProgram').on("click", "[id^=tdProgramCode]", function () {
    var id = this.id.split('e')[1];
    bootbox.alert($('#tdProgramCode' + id).text());
});

var dataTypeTask = []
var dataTypeTaskName = []
var dataEmpCode = []
var dataDateStart = []
var dataDateEnd = []
var dataDetail = []

function convertdataDate(input){
	var x = input.split('-');
	var year = parseInt(x[0])+543;
	x[0] = "" + year;
	return ""+x[2]+"/"+x[1]+"/"+x[0];
}

pagginationTask.setEventPaggingBtn("paggingSimpleTask",pagginationTask);
pagginationTask.loadTable = function loadTable (jsonData) {

    if(jsonData.length <= 0)
       bootbox.alert("ไม่พบข้อมูล");

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
    	dataDateStart.push(convertdataDate((value.dateStart).split(' ')[0]));
    	dataDateEnd.push(convertdataDate((value.dateEnd).split(' ')[0]));
    	dataDetail.push(value.detail);

        tableData = ''
		+ '<tr style="background-color: #fff">'
            + '<td>'
        	+ '<div id="chkBox' + i + '" class="text-center">'
            + '<input  id="chkDelete' + i + '" class="check" type="checkbox" name="chkdelete" />'
        	+ '</div>'
            + '</td>'
            + '<td class="text-center">'
            + '<button id="btnEditTask' + i + '" type="button" class="btn btn-info" data-toggle="modal" data-target="#modalTask" data-backdrop="static"><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="tdTaskCode' + i + '" class="text-center">'
            + value.taskCode
            + '</td>'
            + '<td id="tdTaskName' + i + '" class="text-center">'
            + value.taskName
            + '</td>'
            + '<td id="tdTaskCost' + i + '" class="text-center">'
            + value.taskCost
            + ' Point</td>'
            + '<td>'
            + '<div id="tdProgress' + i++ + '" class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"'
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
  		program: "P0001"
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
	$('#txtTaskCode').val($('#tdTaskCode' + id).text()).attr('disabled', true);
	checkTaskName = $('#tdTaskName' + id).text();
	$('#txtTaskName').val($('#tdTaskName' + id).text());
	checkTaskCost = $('#tdTaskCost' + id).text().split(' ')[0];
	$('#txtTaskCost').val($('#tdTaskCost' + id).text().split(' ')[0]);
	checkTypeTask = dataTypeTask[id - 1];
	document.getElementById("ddlTypeTask").value = dataTypeTask[id - 1];
	checkEmpName = dataEmpCode[id - 1];
	$('#txtEmpName').val(dataEmpCode[id - 1]);
	checkdateStart = dataDateStart[id - 1];
	$('#dateStartProject').val(dataDateStart[id - 1]);
	checkdateEnd = dataDateEnd[id - 1];
	$('#dateEndProject').val(dataDateEnd[id - 1]);
	checkProgress = $('#tdProgress' + id).text().split('%')[0];
	$('#txtProgress').val($('#tdProgress' + id).text().split('%')[0]).attr('disabled', false);
	checkDescription = dataDetail[id - 1];
	$('#txtaDescription').val(dataDetail[id - 1]);
});

$('#TableTask').on("click", "[id^=tdTaskCode]", function () {
    var id = this.id.split('e')[1];
	$('#lblEmpName').text(dataEmpCode[id - 1]);
	$('#lblTaskName').text(dataTypeTaskName[id - 1]);
	$('#lblSDate').text(dataDateStart[id - 1]);
	$('#lblEDate').text(dataDateEnd[id - 1]);
	$('#txtaDetail').val(dataDetail[id - 1]);
});

$('#btnAddProgram').click(function() {
	$('#txtProgramCode').attr('disabled', false);
	$('#txtProgramCode').val(null);
	$('#txtProgramName').val(null);
});

var chkAEProgram = 0;

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
			$('#txtProgramName').attr("data-content" , "กรุณากรอกข้อมูลชื่อโปรแกรม").popover('show');
		}else{
			var pjmProgram = {
				programCode: $('#txtProgramCode').val(),
				programName: $('#txtProgramName').val(),
				moduleProject: "MP0001"
			};

			if(chkAEProgram === 0){
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
						}else if(xhr.status === 500){
							bootbox.alert("บันทึกข้อมูลไม่สำเร็จ");
						}
					},
					async: false
				});
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
								searchDataProgram();
							}else if(xhr.status === 500){
								bootbox.alert("แก้ไขข้อมูลไม่สำเร็จ");
							}
						},
						async: false
					});
				}
			}
			$('#txtProgramCode').val(null);
			$('#txtProgramName').val(null);
		}
	}
});

$('#btnAddTask').click(function() {
	DDLData();
	$('#txtTaskCode').attr('disabled', false);
	$('#txtProgress').attr('disabled', true);
	$('#txtTaskCode').val(null);
	$('#txtTaskName').val(null);
	$('#txtTaskCost').val(null);
	$('#txtEmpName').val(null);
	$('#dateStartProject').val(null);
	$('#dateEndProject').val(null);
	$('#txtaDescription').val("");
});

function convertDate(input){
	var x = input.split('/');
	var year = parseInt(x[2])-543;
	x[2] = ""+year;
	return ""+x[1]+"/"+x[0]+"/"+x[2];
}

var chkAETask = 0;

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
			$('#txtTaskName').attr("data-content" , "กรุณากรอกข้อมูลชื่องาน").popover('show');
		}else if($('#txtTaskCost').val() === ""){
			$('#txtTaskCost').attr("data-content" , "กรุณากรอกข้อมูลจำนวนต้นทุน").popover('show');
		}else if($('#ddlTypeTask').val() === "<-- ประเภทงาน -->"){
			$('#ddlTypeTask').attr("data-content" , "กรุณาเลือกข้อมูลประเภทงาน").popover('show');
		}else{

			myFunction();
			var pjmTask = {
				taskCode: $('#txtTaskCode').val(),
				taskName: $('#txtTaskName').val(),
				taskCost: parseInt($('#txtTaskCost').val()),
				typeTask: dataTypeTaskCode[index],
				empCode: $('#txtEmpName').val(),
				dateStart: new Date(convertDate($('#dateStartProject').val())),
				dateEnd: new Date(convertDate($('#dateEndProject').val())),
				detail: $('#txtaDescription').val(),
				progress: $('#txtProgress').val(),
				program: "P0001"
			};

			if(chkAETask === 0){
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
						}else if(xhr.status === 500){
							bootbox.alert("บันทึกข้อมูลไม่สำเร็จ");
						}
					},
					async: false
				});
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
								searchDataTask();
							}else if(xhr.status === 500){
								bootbox.alert("แก้ไขข้อมูลไม่สำเร็จ");
							}
						},
						async: false
					});
				}
			}
			$('#txtTaskCode').val(null);
			$('#txtTaskName').val(null);
			$('#txtTaskCost').val(null);
			$('#txtEmpName').val(null);
			$('#dateStartProject').val(null);
			$('#dateEndProject').val(null);
			$('#txtaDescription').val("");
		}
	}
});

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