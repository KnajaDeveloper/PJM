var ids = [];
//-----Check Syntax-------------------------------------------------------------------------------
function checkString() {
    var checkS = $("#aTypeTaskCode").val();
    if (/[^A-Za-z0-9\-\d]/.test(checkS)) {
        $('#aTypeTaskCode').attr("data-content", "กรุณากรอกข้อมูลรหัสพนักงานเป็น a-Z หรือ A-Z หรือ 0-9").popover('show');
        $("#aTypeTaskName").popover('hide');
    }
}
//------------------------------------------------------------------------------------
var chk = false;

$('#search').click(function () {

    chk = true;
    searchData();
});

var paggination = Object.create(UtilPaggination);

paggination.setEventPaggingBtn("paggingSimple", paggination);
paggination.loadTable = function loadTable(jsonData) {
    if (jsonData.length <= 0) {
        bootbox.alert("ไม่มีข้อมูล");
    }

    $('#tbody').empty();

    var i = 1;
    var tableData = "";
    jsonData.forEach(function (value) {

        check(value.id);
        console.log(value.id);
        if (ids == ""){
            tableData = ''
                + '<tr>'
                + '<td class="text-center">'
                + '<input class="check" type="checkbox" id="checkDelete' + i + '"/>'
                + '</td>'
                + '<td class="text-center">'
                + '<button id="btnEdit' + i + '" type="button" class="btn btn-info" data-toggle="modal" data-target="#edit" data-backdrop="static"><span  class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
                + '</td>'
                + '<td id="tdTypeTaskCode' + i + '">'
                + value.typeTaskCode
                + '</td>'
                + '<td id="tdTypeTaskName' + i++ + '">'
                + value.typeTaskName
                + '</td>'
                + '</tr>';
        }else {

            tableData = ''
                + '<tr>'
                + '<td class="text-center">'
                + '<input class="check" type="checkbox" id="DischeckDelete' + i + '" disabled="disabled"/>'
                + '</td>'
                + '<td class="text-center">'
                + '<button id="btnEdit' + i + '" type="button" class="btn btn-info" data-toggle="modal" data-target="#edit" data-backdrop="static"><span  class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
                + '</td>'
                + '<td id="tdTypeTaskCode' + i + '">'
                + value.typeTaskCode
                + '</td>'
                + '<td id="tdTypeTaskName' + i++ + '">'
                + value.typeTaskName
                + '</td>'
                + '</tr>';
        }
        $('#tbody').append(tableData);
    });
};

function searchData() {
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
var checkEdit = "";

$("#table").on("click", '[id^=btnEdit]', function () {
    var id = this.id.split('t')[2];
    $("#eTypeTaskCode").val($("#tdTypeTaskCode" + id).text());
    $("#eTypeTaskName").val($("#tdTypeTaskName" + id).text());
    checkEdit = $('#tdTypeTaskName' + id).text();
});
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

            $("#aTypeTaskCode").attr("data-content", "กรุณากรอกข้อมูล").popover('show');

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
                                bootbox.alert("บันทึกข้อมูลสำเร็จ");
                            }

                            $('#aTypeTaskCode').val(null);
                            $('#aTypeTaskName').val(null);
                        } else if (xhr.status == 500) {

                            bootbox.alert("บันทึกข้อมูลไม่สำเร็จ");
                        }
                    },
                    async: false /*ต้องใส่*/
                });
            } else {
                bootbox.alert("มีข้อมูลแล้ว");
            }
        }
    }

});

//-----Delete-------------------------------------------------------------------------------

var dataTypeTaskCode = [];
var sendData = "";


$('#btnDelete').click(function () {
    if (dataTypeTaskCode.length > 0) {
        bootbox.confirm("คุณต้องการลบข้อมูลที่เลือกหรือไม่", function (result) {
            if (result === true) {

                for (var i = 0; i < dataTypeTaskCode.length; i++) {
                    sendData = dataTypeTaskCode[i];
                    deleteData();
                }

                dataTypeTaskCode.splice(0, dataTypeTaskCode.length);
                bootbox.alert("ลบข้อมูลสำเร็จ  " + success + "ลบข้อมูลไม่สำเร็จ  " + fail );
                success = 0;
                fail = 0;
                if (chk = true) {
                    searchData();
                }
                $('#checkAll').prop('checked', false);
            }
        });
    } else if (dataTypeTaskCode.length == 0) {
        bootbox.alert("กรุณาเลือกข้อมูลที่ต้องการลบ");
    }



});

$('#table').on("click", "[id^=checkDelete]", function () {
    var id = this.id.split('e')[4];
    if ($(this).prop('checked') == true) {
        dataTypeTaskCode.push($('#tdTypeTaskCode' + id).text());
    }
    else if ($(this).prop('checked') == false) {
        var num = dataTypeTaskCode.indexOf($('#tdTypeTaskCode' + id).text());
        dataTypeTaskCode.splice(num, 1);
    }
});

$('#checkAll').click(function () {
    $('[id^=checkDelete]').prop('checked', $(this).prop('checked'));
    var lengthTr = $('#table').find('tr').length;
    for (var i = 1; i < lengthTr; i++) {
        if ($("#checkDelete" + i).prop('checked') == true) {
            var num = dataTypeTaskCode.indexOf($('#tdTypeTaskCode' + i).text())
            if (num != "") {
                dataTypeTaskCode.push($('#tdTypeTaskCode' + i).text());
            }
        }
        else {
            var num = dataTypeTaskCode.indexOf($('#tdTypeTaskCode' + i).text());
            dataTypeTaskCode.splice(num, 1);
        }
    }
    //
    //console.log(dataTypeTaskCode);
});

//-----Function Delete-------------------------------------------------------------------------------
var success = 0;
var fail = 0;

function deleteData() {
    var dataJsonData = {
        delTypeCode: sendData
    }

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/typetasks/deleteAllProject',
        data: dataJsonData,
        complete: function (xhr) {

            if (xhr.status == 200) {

                success++;


            } else if (xhr.status == 500) {
                fail++;

            }
        },
        async: false
    });
}


//-----Edit-------------------------------------------------------------------------------


$('#btnMUpdate').click(function () {
    if ($('#eTypeTaskName').val() === checkEdit) {
        bootbox.alert("ข้อมูลไม่มีการเปลี่ยนแปลง");
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
                bootbox.alert("แก้ไขข้อมูลสำเร็จ");
                searchData();
            } else if (xhr.status === 500) {
                bootbox.alert("แก้ไขข้อมูลไม่สำเร็จ");
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




