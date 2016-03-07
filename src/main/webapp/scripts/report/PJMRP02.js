var _language = commonData.language;  // ค่าของ language อยู่ในไฟล์ common.js

//--------------------------------------------------------------------------------
$(document).ready(function () {

    var ddlProject;
    ddlProject = $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        type: "GET",
        url: contextPath + '/projects/findAllProject',
        data: {},
        complete: function (xhr) {
        },
        async: false
    });

    var addData = ddlProject.responseJSON;
    $('#ddlProject').empty();
    $('#ddlProject').append("<option>กรุณาเลือก</option>");
    addData.forEach(function (value) {
        var text = value.projectName;
        $('#ddlProject').append("<option value=" + value.projectCode + ">" + text + "</option>");
    });

});

//--------------------------------------------------------------------------------
$("#ddlProject").change(function () {

    var ddlModule;


    var dataJsonData = {
        projectCode: $('#ddlProject').find('option:selected').val()
    }

    ddlModule = $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        type: "GET",
        url: contextPath + '/moduleprojects/findModuleByProjectCode',
        data: dataJsonData,
        complete: function (xhr) {
        },
        async: false
    });

    var addData = ddlModule.responseJSON;
    $('#ddlModule').empty();
    $('#ddlModule').append("<option>กรุณาเลือก</option>");
    addData.forEach(function (value) {
        var text = value.moduleName;
        $('#ddlModule').append("<option value=" + value.moduleCode + ">" + text + "</option>");
    });

});

//--------------------------------------------------------------------------------

$("#export").click(function () {

    sendData();
});

//--------------------------------------------------------------------------------

function sendData() {
    if ($("#ddlProject").val() == "กรุณาเลือก") {

        $("#ddlProject").attr("data-content", "กรุณากรอกข้อมูล").popover('show');
    }else {

    var date = new Date();

    var printDate = date.getDate() + "/" +
        (parseInt(date.getMonth()) + 1) + "/" +
        date.getFullYear();

    var projectCode = $('#ddlProject').find('option:selected').val();
    var moduleCode = $('#ddlModule').find('option:selected').val();
    var moduleName = $('#ddlModule').find('option:selected').text();
    console.log(moduleCode);
    console.log(moduleName);

    if (moduleCode =='กรุณาเลือก'){
        moduleCode = "NULL";
        moduleName = "ALL";
    }

    console.log(moduleCode);
    console.log(moduleName);

    var link = window.location.href = contextPath + '/reports/exportPJMRP02?projectCode=' + projectCode
        + '&moduleCode=' + moduleCode
        + '&moduleName=' + moduleName
        + '&printDate=' + printDate;

    }

}


