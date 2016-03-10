var pagginationProgram = $.extend({},UtilPaggination);

function searchDataProgram() {
    var dataJsonData = {
        id: moduleProjectID
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

    var tableData = "";
    var i = 1;

    jsonData.forEach(function(value){
        tableData = ''
		+ '<tr id="trProgram' + i++ + '" style="background-color: #fff">'
            + '<td class="text-center">'
                + '<input inUse="' + (value.inUse > 0 ? 1 : 0) + '" id="' + value.id + '" class="checkboxTableProgram" type="checkbox" />'
            + '</td>'
            + '<td class="text-center">'
                + '<button onclick="openEditProgram($(this))" type="button" class="btn btn-info btn-xs" data-toggle="modal" data-target="#modalProgram" data-backdrop="static"><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="tdProgramCode" programId="' + value.id + '" class="text-center" onclick="onClickTrProgram(this)">' + value.programCode + '</td>'
            + '<td id="tdProgramName" programId="' + value.id + '" class="text-center" onclick="onClickTrProgram(this)">' + value.programName + '</td>'
        + '</tr>';

        $('#ResualtSearchProgram').append(
            tableData
        );
    });
};

var positionName;

function openEditProgram(element){
    chkAEProgram = 1;
    $('.modal-title').text('แก้ไขโปรแกรม');
    $('#txtProgramCode').popover('hide'); $('#txtProgramName').popover('hide');
    $('#txtProgramCode').val(null).attr('disabled', false); $('#txtProgramName').val(null);
    $('#btnModalProgramNext').hide();
    $('#txtProgramCode').val(element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdProgramCode").text()).attr('disabled', true);
    positionName = element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdProgramName").text();
    $('#txtProgramName').val(positionName);
}

var programCode;
var programId;

function onClickTrProgram(object) {
    programId = object.attributes.programid.textContent;
    paramProgramId(programId, object.parentElement.id.split('m')[1]);
    searchDataTask();
  	$('#checkboxAllTask').prop('checked', false);
  	$('#lblEmpName').text("");
	$('#lblTaskName').text("");
	$('#lblSDate').text("");
	$('#lblEDate').text("");
	$('#txtaDetail').val(null);

	var lengthTr = $('#TableProgram').find('tr').length;
    for(var i = 1; i < lengthTr; i++){
        $('#trProgram' + i).css('background-color', '#FFF');
    }

	$(object.parentElement).css('background-color', '#F5F5F5');
}

$('#btnAddProgram').click(function() {
    chkAEProgram = 0;
    $(".modal-title").text("เพิ่มโปรแกรม");
    $('#txtProgramCode').popover('hide'); $('#txtProgramName').popover('hide');
    $('#txtProgramCode').val(null).attr('disabled', false); $('#txtProgramName').val(null);
    $('#btnModalProgramNext').show();
});

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
                    id: moduleProjectID
                };

                if(chkAEProgram === 0){
                    if(checkDataProgram() === 0){
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
                    if($('#txtProgramName').val() === positionName){
                            bootbox.alert("ข้อมูลไม่มีการเปลี่ยนแปลง");
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

function checkDataProgram() {
    var checkdDb = $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/programs/findSizeProgramByProgramCode',
        data : {
            programCode: $('#txtProgramCode').val(),
            id: moduleProjectID
        },
        complete: function(xhr){
        },
        async: false
    });

    return checkdDb.responseJSON;
}

var statusProgram200 = 0;
var statusProgram500 = 0;

function deleteDataProgram() {
    $.each($(".checkboxTableProgram:checked"),function(index,value){
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            url: contextPath + '/programs/findDeleteProgram',
            data : {
                id: moduleProjectID,
                programId: $(this).attr("id")
            },
            complete: function(xhr){
                if(xhr.status === 200)
                    statusProgram200++;
                if(xhr.status === 500)
                    statusProgram500++;
            },
            async: false
        });
    });
}

$('#btnDeleteProgram').click(function() {
    if($(".checkboxTableProgram:checked").length <= 0){
            bootbox.alert("คุณยังไม่ได้เลือกข้อมูลที่ต้องการลบ");
            return false;
    }else{
        bootbox.confirm("คุณต้องการลบข้อมูลที่เลือกหรือไม่", function(result) {
            if(result == true){
                deleteDataProgram();
                searchDataProgram();
                $('#checkboxAllProgram').prop('checked', false);
                if(statusProgram500 === 0){
                    bootbox.alert("ลบข้อมูลสำเร็จ : " + statusProgram200 + " รายการ");
                }else{
                    bootbox.alert("ลบข้อมูลสำเร็จ : " + statusProgram200 + " รายการ ลบข้อมูลไม่สำเร็จ : " + statusProgram500 + " รายการ");
                }

                statusProgram200 = 0;
                statusProgram500 = 0;
            }
        });
    }
});

$("#checkboxAllProgram").click(function(){
    $(".checkboxTableProgram").prop('checked', $(this).prop('checked'));
    $.each($(".checkboxTableProgram[inUse=1]"),function(index, value){
        $(this).prop("checked", false);
    });
});

$('#TableProgram').on("click", ".checkboxTableProgram", function () {
    if($(".checkboxTableProgram:checked").length == $(".checkboxTableProgram[inUse=0]").length){
        $("#checkboxAllProgram").prop("checked", true);
    }else{
        $("#checkboxAllProgram").prop("checked", false);
    }

    if($(this).attr("inUse") > 0){
        $(this).prop("checked", false);
        bootbox.alert("ข้อมูลถูกเรียกใช้อยู่");
    }
});