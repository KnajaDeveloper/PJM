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

    $('#ResualtSearchProgram').empty();

    if(jsonData.length <= 0){
        $('#ResualtSearchProgram').append('<tr><td colspan = 4 class="text-center">' + Message.MSG_DATA_NOT_FOUND + '</td></tr>');
    }

    $('#checkboxAllProgram').prop('checked', false);

    var tableData = "";
    var i = 1;

    jsonData.forEach(function(value){
        tableData = ''
		+ '<tr id="trProgram' + i++ + '">'
            + '<td class="text-center">'
                + '<input inUse="' + (value.inUse > 0 ? 1 : 0) + '" id="' + value.id + '" class="checkboxTableProgram" type="checkbox" />'
            + '</td>'
            + '<td class="text-center">'
                + '<button onclick="openEditProgram($(this))" type="button" class="btn btn-info btn-xs" data-toggle="modal" data-target="#modalProgram" data-backdrop="static"><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="tdProgramCode" programId="' + value.id + '" class="text-center" onclick="onClickTrProgram(this)">' + value.programCode + '</td>'
            + '<td id="tdProgramName" programId="' + value.id + '" class="" onclick="onClickTrProgram(this)">' + value.programName + '</td>'
        + '</tr>';

        $('#ResualtSearchProgram').append(
            tableData
        );
    });
    $("#displayPage").hide();
};

var programID;
var positionName;

function openEditProgram(element){
    chkAEProgram = 1;
    $('.modal-title').text(Label.LABEL_EDIT_PROGRAM);
    $('#txtProgramCode').popover('hide'); $('#txtProgramName').popover('hide');
    $('#txtProgramCode').val(null).attr('disabled', false); $('#txtProgramName').val(null);
    $('#btnModalProgramNext').hide();
    programID = element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdProgramCode").attr("programId");
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
    $('#lblTaskFollower').text("-");
    $('#lblEmpName').text("-");
    $('#lblTaskName').text("-");
    $('#lblTaskImportance').text("-");
    $('#lblSDate').text("-");
    $('#lblEDate').text("-");
    $('#lblFileName').text("");
    $('#txtaDetail').val(null);

	var lengthTr = $('#TableProgram').find('tr').length;
    for(var i = 1; i < lengthTr; i++){
        $('#trProgram' + i).css('background-color', '#FFF');
    }

	$(object.parentElement).css('background-color', '#F5F5F5');
}

$('#btnAddProgram').click(function() {
    chkAEProgram = 0;
    $(".modal-title").text(Label.LABEL_ADD_PROGRAM);
    $('#txtProgramCode').popover('hide'); $('#txtProgramName').popover('hide');
    $('#txtProgramCode').val(null).attr('disabled', false); $('#txtProgramName').val(null);
    $('#btnModalProgramNext').show();
});

var chkAEProgram = 0;

// function checkProgramCode() {
//     var elem = document.getElementById('txtProgramCode').value;
//     if(!elem.match(/^([a-z0-9\_])+$/i))
//     {
//         $('#txtProgramCode').attr("data-content" , Message.MSG_PLEASE_ENTER_THE_PROGRAM_CODE_AS_a_TO_z_OR_A_TO_Z_OR_0_TO_9).popover('show');
//         return false;
//     }else{
//         return true;
//     }
// };

$('[id^=btnModalProgram]').click(function() {
    var iD = this.id.split('m')[1];
    if(iD == 'Cancel'){
        if(chkAEProgram == 1){
            if($('#txtProgramName').val() == positionName){
                $('#modalProgram').modal('hide');
                $('#txtProgramCode').popover('hide'); $('#txtProgramCode').val(null);
                $('#txtProgramName').popover('hide'); $('#txtProgramName').val(null);
            }else{
                bootbox.confirm(Message.MSG_WANT_TO_CANCEL_EDITING_THE_DATA_HAS_CHANGED_OR_NOT, function(result) {
                    if(result == true){
                        $('#modalProgram').modal('hide');
                        $('#txtProgramCode').popover('hide'); $('#txtProgramCode').val(null);
                        $('#txtProgramName').popover('hide'); $('#txtProgramName').val(null);
                    }
                });
            }
        }else{
            $('#modalProgram').modal('hide');
        }
    }else{
        if($('#txtProgramCode').val() == ""){
            $('#txtProgramCode').attr("data-content" , Message.MSG_PLEASE_COMPLETE_THIS_FIEID).popover('show');
        }else if($('#txtProgramName').val()  == ""){
            $('#txtProgramName').attr("data-content" , Message.MSG_PLEASE_COMPLETE_THIS_FIEID).popover('show');
        }else{
            if(chkAEProgram == 0){
                if(checkDataProgram() == 0){
                    $.ajax({
                        type: "POST",
                        headers: {
                            Accept: "application/json"
                        },
                        url: contextPath + '/programs/saveProgram',
                        data : {
                            programCode: $('#txtProgramCode').val(),
                            programName: $('#txtProgramName').val(),
                            id: moduleProjectID
                        },
                        complete: function(xhr){
                            if(xhr.status == 201){
                                if(iD == 'Add'){
                                    bootbox.alert(Message.MSG_SAVE_SUCCESS);
                                    $('#modalProgram').modal('hide');
                                }
                                $('#txtProgramCode').val(null);
                                $('#txtProgramName').val(null);
                                var pageNumber = $("#paggingSimpleProgramCurrentPage").val();
                                searchDataProgram();
                                pagginationProgram.loadPage(pageNumber, pagginationProgram);
                            }else if(xhr.status == 500 || xhr.status == 0){
                                bootbox.alert(Message.MSG_SAVE_FAILED);
                            }
                        },
                        async: false
                    });
                }else{
                    bootbox.alert(Message.MSG_PLEASE_ENTER_A_NEW_PROGRAM_CODE);
                }
            }else if(chkAEProgram == 1){
                if($('#txtProgramName').val() == positionName){
                        bootbox.alert(Message.MSG_NO_INFORMATION_CHANGED);
                }else{
                    $.ajax({
                        type: "POST",
                        headers: {
                            Accept: "application/json"
                        },
                        url: contextPath + '/programs/findEditProgram',
                        data : {
                            programCode: $('#txtProgramCode').val(),
                            programName: $('#txtProgramName').val(),
                            id: programID
                        },
                        complete: function(xhr){
                            if(xhr.status == 200){
                                bootbox.alert(Message.MSG_EDIT_SUCCESSFULLY);
                                $('#modalProgram').modal('hide');
                                $('#txtProgramCode').val(null);
                                $('#txtProgramName').val(null);
                                var pageNumber = $("#paggingSimpleProgramCurrentPage").val();
                                pagginationProgram.loadPage(pageNumber, pagginationProgram);
                            }else if(xhr.status == 500 || xhr.status == 0){
                                bootbox.alert(Message.MSG_EDIT_UNSUCCESSFUL);
                            }
                        },
                        async: false
                    });
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

    if(checkdDb.responseJSON == null){
        return 0;
    }

    return checkdDb.responseJSON;
}

var statusProgram0 = 0;
var statusProgram200 = 0;
var statusProgram500 = 0;

function deleteDataProgram() {
    $.each($(".checkboxTableProgram:checked"),function(index,value){
        $.ajax({
            type: "POST",
            headers: {
                Accept: "application/json"
            },
            url: contextPath + '/programs/findDeleteProgram',
            data : {
                id: moduleProjectID,
                programId: $(this).attr("id")
            },
            complete: function(xhr){
                if(xhr.status == 0)
                    statusProgram0++;
                if(xhr.status == 200)
                    statusProgram200++;
                if(xhr.status == 500)
                    statusProgram500++;
            },
            async: false
        });
    });
}

$('#btnDeleteProgram').click(function() {
    if($(".checkboxTableProgram:checked").length <= 0){
        bootbox.alert(Message.MSG_PLEASE_SELECT_THE_DATA_TO_BE_DELETED);
        return false;
    }else{
        bootbox.confirm(Message.MSG_DO_YOU_WANT_TO_REMOVE_THE_SELECTED_ITEMS, function(result) {
            if(result == true){
                deleteDataProgram();

                if(statusProgram0 > 0){
                    bootbox.alert(Message.MSG_DELETE_FAILED);
                }else if(statusProgram500 == 0){
                    bootbox.alert(Message.MSG_DELETE_SUCCESS + " " + statusProgram200 + " " + Message.MSG_LIST);
                }else{
                    bootbox.alert(Message.MSG_DELETE_SUCCESS + " " + statusProgram200 + " " + Message.MSG_LIST + " " + Message.MSG_DELETE_FAILED + " " + statusProgram500 + " " + Message.MSG_LIST);
                }

                statusProgram0 = 0;
                statusProgram200 = 0;
                statusProgram500 = 0;

                var pageNumber = $("#paggingSimpleProgramCurrentPage").val();
                searchDataProgram();
                pagginationProgram.loadPage(pageNumber, pagginationProgram);

                $('#checkboxAllProgram').prop('checked', false);
            }
        });
    }
});

$("#checkboxAllProgram").click(function(){
    if($(".checkboxTableProgram[inUse=0]").length == 0){
        bootbox.alert(Message.MSG_DATA_ALL_IN_USED);
        $(this).prop("checked", false);
    }
    $(".checkboxTableProgram").prop('checked', $(this).prop('checked'));
    $.each($(".checkboxTableProgram[inUse=1]"),function(index, value){
        $(this).prop("checked", false);
    });
});

$('#TableProgram').on("click", ".checkboxTableProgram", function () {
    if($(this).attr("inUse") > 0){
        $(this).prop("checked", false);
        bootbox.alert(Message.MSG_DATA_IS_USE);
    }
    if($(".checkboxTableProgram:checked").length == $(".checkboxTableProgram[inUse=0]").length && $(".checkboxTableProgram[inUse=0]").length != 0){
        $("#checkboxAllProgram").prop("checked", true);
    }else{
        $("#checkboxAllProgram").prop("checked", false);
    }
});