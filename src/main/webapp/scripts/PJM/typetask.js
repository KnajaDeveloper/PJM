//-----Check Syntax-------------------------------------------------------------------------------
function checkString() {
    var checkS = $("#aTypeTaskCode").val();
    if (/[^A-Za-z0-9\-\d]/.test(checkS)) {
        $('#aTypeTaskCode').attr("data-content", Message.Please_Input_As).popover('show');
        $("#aTypeTaskName").popover('hide');
    }
}
//------------------------------------------------------------------------------------


$('#search').click(function () {
    searchData();
});

var paggination = Object.create(UtilPaggination);

paggination.setEventPaggingBtn("paggingSimple", paggination);
paggination.loadTable = function loadTable(jsonData) {
    if (jsonData.length <= 0) {
        bootbox.alert(Message.Data_not_found);
    }

    $('#tbody').empty();

    var tableData = "";
    jsonData.forEach(function (value) {

        tableData = ''
            + '<tr>'
            + '<td class="text-center">'
            + '<input inUse="' + value.inUse + '" id="' + value.id + '" class="checkboxTable" type="checkbox" />'
            + '</td>'
            + '<td class="text-center">'
            + '<button onclick="openModalEdit($(this))" type="button" class="btn btn-xs btn-info" data-toggle="modal" data-target="#edit" data-backdrop="static"><span  class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="tdTypeTaskCode" class="text-center">' + value.typeTaskCode + '</td>'
            + '<td id="tdTypeTaskName" class="text-center">' + value.typeTaskName + '</td>'
            + '</tr>';

        $('#tbody').append(tableData);
    });
};

//------------------------------------------------------------------------------------

var typeTaskName;

function openModalEdit(element) {
    $('#eTypeTaskCode').val(element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdTypeTaskCode").text()).attr('disabled', true);
    typeTaskName = element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdTypeTaskName").text();
    $('#eTypeTaskName').val(typeTaskName);
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


    } else {

        if ($("#aTypeTaskCode").val() == "") {

            $("#aTypeTaskCode").attr("data-content", Message.PLEASE_INPUT).popover('show');

        } else if ($("#aTypeTaskName").val() == "") {

            $("#aTypeTaskName").popover('show');

            if ($("#aTypeTaskCode").val() != "") {

                checkString();

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
                                searchData();
                            }

                            $('#aTypeTaskCode').val(null);
                            $('#aTypeTaskName').val(null);
                        } else if (xhr.status == 500) {

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
    if ($(".checkboxTable:checked").length == $(".checkboxTable").length) {
        $("#checkAll").prop("checked", true);
    } else {
        $("#checkAll").prop("checked", false);
    }

    if ($(this).attr("inUse") > 0) {
        $(this).prop("checked", false);
        bootbox.alert(Message.Data_is_use);
    }
});

$('#checkAll').click(function () {
    $(".checkboxTable").prop('checked', $(this).prop('checked'));

    $.each($(".checkboxTable:checked"), function (index, value) {
        if ($(this).attr("inUse") > 0) {
            $(this).prop("checked", false);
            $("#checkAll").prop("checked", false);
        }
    });
});

//-----Function Delete-------------------------------------------------------------------------------
var success = 0;
var fail = 0;

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
                }
            },
            async: false
        });
    });
}


//-----Edit-------------------------------------------------------------------------------


$('#btnMUpdate').click(function () {
    if ($('#eTypeTaskName').val() === typeTaskName) {
        bootbox.alert(Message.No_information_changed);
        $('#edit').modal('hide');
    } else {

        editData();
    }
});

//-----Function Edit-------------------------------------------------------------------------------

function editData() {
    var dataJsonData = {
        editTypeCode: $('#eTypeTaskCode').val(),
        editTypeName: $('#eTypeTaskName').val()
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
            if (xhr.status === 200) {
                bootbox.alert(Message.Edit_Success);
                searchData();
            } else if (xhr.status === 500) {
                bootbox.alert(Message.Edit_Failed);
            }
        },
        async: false
    });
}


function check(id) {
    var responsResult = null;
    var dataJsonData = {
        typeTask: id

    };

    responsResult = $.ajax({
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

    ids = jQuery.parseJSON(responsResult.responseText);
    console.log(ids);

}
