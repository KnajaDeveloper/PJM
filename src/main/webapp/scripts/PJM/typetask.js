var checkPaggingLoad = false;
var version;
//-----Check Syntax-------------------------------------------------------------------------------

//function checkString() {
//    var checkS = $("#aTypeTaskCode").val();
//    if (/[^A-Za-z0-9\-\d]/.test(checkS)) {
//        $('#aTypeTaskCode').attr("data-content", Message.Please_Input_As).popover('show');
//        $("#aTypeTaskName").popover('hide');
//    }
//}

//------------------------------------------------------------------------------------

$('#search').click(function () {
    searchData();
    checkPaggingLoad = true;
});

var paggination = Object.create(UtilPaggination);

paggination.setEventPaggingBtn("paggingSimple", paggination);
paggination.loadTable = function loadTable(jsonData) {
    $('#tbody').empty();

    if (jsonData.length <= 0) {
        //bootbox.alert(Message.Data_not_found);
        $('#tbody').append('<tr><td colspan = 4 class="text-center">' + Message.Data_not_found + '</td></tr>');
    }


    $("#checkAll").prop("checked", false);

    var tableData = "";
    jsonData.forEach(function (value) {

        tableData = ''
            + '<tr>'
            + '<td class="text-center">'
            + '<input '+ (value.inUseTask > 0 || value.inUseOtherTask > 0 ?' inUseTask="' + value.inUseTask + '" inUseOtherTask="' + value.inUseOtherTask + '" ': 'status="check" ') + '  id="' + value.id + '"  class="checkboxTable" type="checkbox" />'
            + '</td>'
            + '<td class="text-center">'
            + '<button  onclick="openModalEdit($(this))" type="button" class="btn btn-xs btn-info" data-toggle="modal" data-target="#edit" data-backdrop="static" version="'+ value.version +'"><span  class="glyphicon glyphicon-pencil" aria-hidden="true"  ></span></button>'
            + '</td>'
            + '<td id="tdTypeTaskCode" typeTaskID=" ' + value.id + ' " class="text-center">' + value.typeTaskCode + '</td>'
            + '<td id="tdTypeTaskName" class="">' + value.typeTaskName + '</td>'
            + '</tr>';

        $('#tbody').append(tableData);
    });
};

//------------------------------------------------------------------------------------
var typeTaskID;
var typeTaskName;


function openModalEdit(element) {
    $('#eTypeTaskCode').val(element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdTypeTaskCode").text()).attr('disabled', true);
    typeTaskID = element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdTypeTaskCode").attr("typeTaskID");
    typeTaskName = element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdTypeTaskName").text();
    $('#eTypeTaskName').val(typeTaskName);
    version= element.attr('version');
    console.log(version);
}

//------------------------------------------------------------------------------------

function searchData() {

    $('#checkAll').prop('checked', false);
    var dataJsonData = {
        findTypeCode: $('#sTypeTaskCode').val(),
        findTypeName: $('#sTypeTaskName').val()
    };

    paggination.setOptionJsonData({
        url: contextPath + "/typetasks/testPaggingData",
        data: dataJsonData
    });

    paggination.setOptionJsonSize({
        url: contextPath + "/typetasks/testPaggingSize",
        data: dataJsonData
    });

    paggination.search(paggination);
}

//------------------------------------------------------------------------------------

var sizedata;
//ส่ง ค่าเข้าไป check ข้างใน active แล้ว return กลับมาเป็นเลข แล้วเอามา check
function checkData() {
    var checkTypeTask = {
        //ตรงกับ RequestParam value
        checkTypeCode: $("#aTypeTaskCode").val()
    };

    var checkdata = $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/typetasks/checkAllProject',
        data: checkTypeTask,
        complete: function (xhr) {
          if (xhr.status == 0) {

              bootbox.alert(Message.Save_Failed);

          }
        },
        async: false /*ต้องใส่*/
    });

    sizedata = jQuery.parseJSON(checkdata.responseText);
}

//------------------------------------------------------------------------------------

$('[id^=btnM]').click(function () {
    var id = this.id.split('M')[1];
    if (id == 'Cancel') {

        $('#aTypeTaskCode').popover('hide');
        $('#aTypeTaskName').popover('hide');
        $('#aTypeTaskCode').val(null);
        $('#aTypeTaskName').val(null);

    }else if (id == 'Update'){
      edit();
    } else {

        if ($("#aTypeTaskCode").val() == "") {

            $("#aTypeTaskCode").attr("data-content", Message.PLEASE_INPUT).popover('show');

        } else if ($("#aTypeTaskName").val() == "") {

            $("#aTypeTaskName").popover('show');

            if ($("#aTypeTaskCode").val() != "") {
                //checkString();
            }

        } else {

            var typeTask = {
                typeTaskCode: $("#aTypeTaskCode").val(),
                typeTaskName: $("#aTypeTaskName").val()
            };

            checkData();

            if (sizedata == 0) {
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    headers: {
                        Accept: "application/json"
                    },
                    url: contextPath + '/typetasks',
                    data: JSON.stringify(typeTask),
                    complete: function (xhr) {

                        if (xhr.status == 201) {
                            if (id == 'Add') {

                                $('#add').modal('hide');
                                bootbox.alert(Message.Save_Success);
                                if(checkPaggingLoad == true){
                                    searchData();
                                    console.log(checkPaggingLoad);
                                }
                            }

                            if(id == "Next"){
                              if(checkPaggingLoad == true){
                                  searchData();
                                  console.log(checkPaggingLoad);
                              }
                            }

                            $('#aTypeTaskCode').val(null);
                            $('#aTypeTaskName').val(null);

                        } else  {
                            bootbox.alert(Message.Save_Failed);
                        }
                    },
                    async: false /*ต้องใส่*/
                });
            } else {
                bootbox.alert(Message.Data_have_already);
            }
        }
    }


});

//-----Delete-------------------------------------------------------------------------------


var sendData = "";


$('#btnDelete').click(function () {
    if ($(".checkboxTable:checked").length <= 0) {
        bootbox.alert(Message.Please_Select_Delete);
        return false;
    } else {
        bootbox.confirm(Message.You_Want_Remove, function (result) {
            if (result == true) {
                deleteData();
                searchData();
                $('#checkAll').prop('checked', false);
                if (fail === 0) {
                    bootbox.alert(Message.Delete_Success+ " " + success+ " " + Message.List);
                } else {
                    bootbox.alert(Message.Delete_Success+ " " + success+ " " + Message.List+ " " + Message.Delete_Failed + " " + fail + " " + Message.List);
                }
                success = 0;
                fail = 0;
            }
        });
    }
});

$('#table').on("click", ".checkboxTable", function () {
    var checkNum = $('input[status=check]').length;
    var checkBoxCheck =  $('input[status=check]:checked').length;


        if (checkNum == checkBoxCheck) {
            if (checkBoxCheck > 0 ) {
            $("#checkAll").prop("checked", true);
            }
        } else {
            $("#checkAll").prop("checked", false);
        }

    if ($(this).attr("inUseTask") > 0 || $(this).attr("inUseOtherTask") > 0) {
        $(this).prop("checked", false);
        bootbox.alert(Message.Data_is_use);
    }

});

$('#checkAll').click(function () {
    $(".checkboxTable").prop('checked', $(this).prop('checked'));
    var checkBoxCheck =  $('input[status=check]:checked').length;

    if (checkBoxCheck <= 0 && $("#checkAll").prop("checked") == true){
        bootbox.alert(Message.M_Data_all_is_use);
        $('#checkAll').prop('checked', false);
    }

    $.each($(".checkboxTable:checked"), function (index, value) {
        if ($(this).attr("inUseTask") > 0) {
            $(this).prop("checked", false);
        }

        if ($(this).attr("inUseOtherTask") > 0) {
            $(this).prop("checked", false);
        }
    });
});

//-----Function Delete-------------------------------------------------------------------------------
var success = 0;
var fail = 0;
var session = true;
function deleteData() {

    $.each($(".checkboxTable:checked"), function (index, value) {
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            url: contextPath + '/typetasks/deleteAllProject',
            data: {
                typetaskID: $(this).attr("id")
            },
            complete: function (xhr) {
                if (xhr.status == 200) {
                    success++;
                } else if (xhr.status == 500) {
                    fail++;
                }else if (xhr.status == 0) {
                    session = false;
                }
            },
            async: false
        });
    });

  if (session == false){

    bootbox.alert(Message.Delete_Failed);
  }
}


//-----Edit-------------------------------------------------------------------------------


function edit() {
  console.log("as");
    if ($('#eTypeTaskName').val() === typeTaskName) {
        bootbox.alert(Message.No_information_changed);
    } else {
        editData();
    }
}

//-----Function Edit-------------------------------------------------------------------------------

function editData() {

    var dataJsonData = {
        editTypeID: typeTaskID,
        editTypeName: $('#eTypeTaskName').val(),
        version : version
    };

    $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        type: "GET",
        url: contextPath + '/typetasks/editAllProject',
        data: dataJsonData,
        complete: function (xhr) {
          console.log(xhr.status);
            if (xhr.status == 200) {
                bootbox.alert(Message.Edit_Success);
                $('#edit').modal('hide');
                searchData();
            } else if (xhr.status == 500) {
                bootbox.alert(Message.Edit_Failed);
            }else if (xhr.status == 0) {
                bootbox.alert(Message.Edit_Failed);
            }else if (xhr.status == 404) {
                bootbox.alert(Message.M_Not_updated_data);
            }
        },
        async: false
    });
}


function check(id) {
    var responsResultTask = null;
    //var responsResultOtherTask = null;

    var dataJsonData = {
        typeTask: id
    };

    responsResultTask = $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        type: "GET",
        url: contextPath + '/tasks/findProjectByTask',
        data: dataJsonData,
        complete: function (xhr) {

        },
        async: false
    });

    ids = jQuery.parseJSON(responsResultTask.responseText);
    console.log(ids);
}

$("#btnECancel").click(function(){
    if ($('#eTypeTaskName').val() === typeTaskName) {
        $('#edit').modal('hide');
        $('#eTypeTaskCode').popover('hide');
        $('#eTypeTaskName').popover('hide');

    }else {
        bootbox.confirm(Message.Want_to_cancel, function (result) {

            if (result === true) {
                $('#edit').modal('hide');
                $('#eTypeTaskCode').popover('hide');
                $('#eTypeTaskName').popover('hide');


            }
        });
    }
});
