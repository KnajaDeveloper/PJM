var paggination = Object.create(UtilPaggination);

$(document).ready(function(){
  searchData();
  DDLData();
});

paggination.setEventPaggingBtn("paggingSimple",paggination);
paggination.loadTable = function loadTable (jsonData) {

    if(jsonData.length <= 0)
       bootbox.alert("ไม่พบข้อมูล");

    $('#ResualtSearch').empty();
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

        $('#ResualtSearch').append(
            tableData
        );
    });
};

function searchData() {
  	var dataJsonData = {
  		programCode: "",
		programName: ""
    }

    paggination.setOptionJsonData({
      	url:contextPath + "/programs/findPaggingData",
      	data:dataJsonData
    });

    paggination.setOptionJsonSize({
        url:contextPath + "/programs/findPaggingSize",
        data:dataJsonData
    });

    paggination.search(paggination);
}

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
				programName: $('#txtProgramName').val()
			};

			$.ajax({
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				headers: {
					Accept: "application/json"
				},
				type: "POST",
				url: contextPath + '/programs',
				data : JSON.stringify(pjmProgram),
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
		}else if($('#txtTaskName').val()  === ""){
			$('#txtTaskName').attr("data-content" , "กรุณากรอกข้อมูลชื่องาน").popover('show');
		}else if($('#txtNumberCost').val()  === ""){
			$('#txtNumberCost').attr("data-content" , "กรุณากรอกข้อมูลจำนวนต้นทุน").popover('show');
		}
		}else if($('#ddlTypeTask').val()  === ""){
			$('#ddlTypeTask').attr("data-content" , "กรุณาเลือกข้อมูลประเภทงาน").popover('show');
		}
		else{
			var pjmTask = {
				taskCode: $('#txtTaskCode').val(),
				taskName: $('#txtTaskName').val(),
				taskCost: $('#txtNumberCost').val(),
				typeTask: $('#ddlTypeTask').val(),
				empCode: $('#txtCaretakerName').val(),
				dateStart: $('#dateStartProject').val(),
				dateEnd: $('#dateEndProject').val(),
				detail: $('#txtaDescription').val(),
				progress: 0
			};

			$.ajax({
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				headers: {
					Accept: "application/json"
				},
				type: "POST",
				url: contextPath + '/tasks',
				data : JSON.stringify(pjmTask),
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