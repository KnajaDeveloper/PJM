var pagginationProgram = Object.create(UtilPaggination);
var pagginationTask = Object.create(UtilPaggination);

$(document).ready(function(){
  searchDataProgram();
  //searchDataTask();
  DDLData();
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
            + '<button id="btnEdit' + i + '" type="button" class="btn btn-info" data-toggle="modal" data-target="#modalProgram" data-backdrop="static"><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
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

$('#Table').on("click", "[id^=btnEdit]", function () {
    var id = this.id.split('t')[2];
    $('#btnModalProgramNext').hide();
	$(".modal-title").text("แก้ไขโปรแกรม");
	$('#txtProgramCode').val($('#tdProgramCode' + id).text()).attr('disabled', true);
	checkEdit = $('#tdPositionName' + id).text();
	$('#txtProgramName').val($('#tdProgramName' + id).text());
});

$('#Table').on("click", "[id^=tdProgramCode]", function () {
    var id = this.id.split('e')[1];
    bootbox.alert($('#tdProgramCode' + id).text());
});

// pagginationTask.setEventPaggingBtn("paggingSimpleTask",pagginationTask);
// pagginationTask.loadTable = function loadTable (jsonData) {

//     if(jsonData.length <= 0)
//        bootbox.alert("ไม่พบข้อมูล");

//     $('#ResualtSearchTask').empty();

//     var link = "";
//     var i = 1;
//     var tableData = "";

//     jsonData.forEach(function(value){
//         tableData = ''
// 		+ '<tr style="background-color: #fff">'
//             + '<td>'
//         	+ '<div id="chkBox' + i + '" class="text-center">'
//             + '<input  id="chkDelete' + i + '" class="check" type="checkbox" name="chkdelete" />'
//         	+ '</div>'
//             + '</td>'
//             + '<td class="text-center">'
//             + '<button id="btnEdit' + i + '" type="button" class="btn btn-info" data-toggle="modal" data-target="#modalProgram" data-backdrop="static"><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
//             + '</td>'
//             + '<td id="tdProgramCode' + i + '" class="text-center">'
//             + value.code
//             + '</td>'
//             + '<td id="tdProgramName' + i++ + '" class="text-center">'
//             + value.name
//             + '</td>'
//         + '</tr>';

//         $('#ResualtSearchTask').append(
//             tableData
//         );
//     });
// };

// function searchDataTask() {
//   	var dataJsonData = {
//   		moduleProject: ""
//     }

//     pagginationTask.setOptionJsonData({
//       	url:contextPath + "/programs/findPaggingDataProgram",
//       	data:dataJsonData
//     });

//     pagginationTask.setOptionJsonSize({
//         url:contextPath + "/programs/findPaggingSizeProgram",
//         data:dataJsonData
//     });

//     pagginationTask.search(pagginationTask);
// }

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
					}else if(xhr.status === 500){
						bootbox.alert("บันทึกข้อมูลไม่สำเร็จ");
					}
				},
				async: false
			});
		}
	}
});

function convertDate(input){
	var x = input.split('/');
	var year = parseInt(x[2])-543;
	x[2] = ""+year;
	return ""+x[1]+"/"+x[0]+"/"+x[2];
}

$('[id^=btnModalTask]').click(function() {
	var id = this.id.split('k')[1];
	if(id === 'Cancel'){
		$('#modalTask').modal('hide');
		$('#txtTaskCode').popover('hide'); $('#txtTaskCode').val(null);
		$('#txtTaskName').popover('hide'); $('#txtTaskName').val(null);
		$('#txtNumberCost').popover('hide'); $('#txtNumberCost').val(null);
		$('#ddlTypeTask').popover('hide');
		$('#txtCaretakerName').val(null);
		$('#dateStartProject').val(null);
		$('#dateEndProject').val(null);
		$('#txtaDescription').val("");
	}else{
		if($('#txtTaskCode').val() === ""){
			$('#txtTaskCode').attr("data-content" , "กรุณากรอกข้อมูลรหัสงาน").popover('show');
		}else if($('#txtTaskName').val() === ""){
			$('#txtTaskName').attr("data-content" , "กรุณากรอกข้อมูลชื่องาน").popover('show');
		}else if($('#txtNumberCost').val() === ""){
			$('#txtNumberCost').attr("data-content" , "กรุณากรอกข้อมูลจำนวนต้นทุน").popover('show');
		}else if($('#ddlTypeTask').val() === "<-- ประเภทงาน -->"){
			$('#ddlTypeTask').attr("data-content" , "กรุณาเลือกข้อมูลประเภทงาน").popover('show');
		}else{
			var pjmTask = {
				taskCode: $('#txtTaskCode').val(),
				taskName: $('#txtTaskName').val(),
				taskCost: parseInt($('#txtNumberCost').val()),
				typeTask: $('#ddlTypeTask').val(),
				empCode: $('#txtCaretakerName').val(),
				dateStart: new Date(convertDate($('#dateStartProject').val())),
				dateEnd: new Date(convertDate($('#dateEndProject').val())),
				detail: $('#txtaDescription').val(),
				progress: 0,
				program: "P0001"
			};

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
						$('#txtNumberCost').val(null);
						$('#txtCaretakerName').val(null);
						$('#dateStartProject').val(null);
						$('#dateEndProject').val(null);
						$('#txtaDescription').val("");
					}else if(xhr.status === 500){
						bootbox.alert("บันทึกข้อมูลไม่สำเร็จ");
					}
				},
				async: false
			});
		}
	}
});

var ddlData;
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

	var addData = ddlData.responseJSON;
	$('#ddlTypeTask').empty();
	$('#ddlTypeTask').append("<option><-- ประเภทงาน --></option>");
	addData.forEach(function(value){
		var text =  ""+ value.typeTaskName;
		$('#ddlTypeTask').append("<option>"+ text +"</option>");
	});
}