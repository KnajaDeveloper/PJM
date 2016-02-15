$("#checkAll").click(function () {
    $(".check").prop('checked', $(this).prop('checked'));
});

//------------------------------------------------------------------------------------

$('#search').click(function () {
    searchData();

});

var paggination = Object.create(UtilPaggination);

paggination.setEventPaggingBtn("paggingSimple", paggination);
paggination.loadTable = function loadTable(jsonData) {
    if (jsonData.length <= 0) {
        MessageUtil.alertBootBoxMessage({
            title: Message.NotHaveData,
            buttons: {
                cancel: {
                    label: Button.Approve,
                }
            }
        });
    }

    $('#tbody').empty();

    var i = 1;
    var tableData = "";
    jsonData.forEach(function (value) {

        tableData = ''
            + '<tr>'
            + '<td class="text-center">'
            + '<input class="check" type="checkbox" id="checkDelete' + i + '"/>'
            + '</td>'
            + '<td class="text-center">'
            + '<button id="btnEdit' + i + '" type="button" class="btn btn-info" data-toggle="modal" data-target="#edit" data-backdrop="static"><span  class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="tdTypeTaskCode' + i + '">'
            + value.code
            + '</td>'
            + '<td id="tdTypeTaskName' + i++ + '">'
            + value.name
            + '</td>'
            + '</tr>';

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

$("#table").on("click", '[id^=btnEdit]', function () {
    var id = this.id.split('t')[2];
    $("#eTypeTaskCode").val($("#tdTypeTaskCode" + id).text());
    $("#eTypeTaskName").val($("#tdTypeTaskName" + id).text());
});
//------------------------------------------------------------------------------------
var sizedata ;
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

            $("#aTypeTaskCode").popover('show');

        } else if ($("#aTypeTaskName").val() == "") {

            $("#aTypeTaskName").popover('show');

        } else {

            var typeTask = {
                typeTaskCode: $("#aTypeTaskCode").val(),
                typeTaskName: $("#aTypeTaskName").val()
            }


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









