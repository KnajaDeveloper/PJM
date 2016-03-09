var pagginationProgram = $.extend({},UtilPaggination);

function searchDataProgram() {
    var dataJsonData = {
        id: id
    }

    pagginationProgram.setOptionJsonData({
        url:contextPath + "/programs/findPaggingData",
        data:dataJsonData
    });

    pagginationProgram.setOptionJsonSize({
        url:contextPath + "/programs/findPaggingSize",
        data:dataJsonData
    });

    pagginationProgram.search(pagginationProgram);
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
        tableData = ''
		+ '<tr id="trProgram' + i + '" style="background-color: #fff">'
            + '<td class="text-center">'
            + '<input id="chkDeleteProgram' + i + '" class="checkProgram" type="checkbox" name="chkdelete" />'
            + '</td>'
            + '<td class="text-center">'
            + '<button id="btnEditProgram' + i + '" type="button" class="btn btn-info" data-toggle="modal" data-target="#modalProgram" data-backdrop="static"><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="tdProgramCode' + i + '" class="text-center" onclick="onClickTrProgram(this)">'
            + value.programCode
            + '</td>'
            + '<td id="tdProgramName' + i++ + '" class="text-center" onclick="onClickTrProgram(this)">'
            + value.programName
            + '</td>'
        + '</tr>';

        $('#ResualtSearchProgram').append(
            tableData
        );
    });
};

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
    var iD = this.id.split('m')[1];
    if(iD === 'Cancel'){
        $('#modalProgram').modal('hide');
        $('#txtProgramCode').popover('hide'); $('#txtProgramName').popover('hide');
        $('#txtProgramCode').val(null).attr('disabled', false); $('#txtProgramName').val(null);
        $('#btnModalProgramNext').show();
        $(".modal-title").text("เพิ่มโปรแกรม");
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
                    id: id
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
                                    if(iD === 'Add'){
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
        id: id
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