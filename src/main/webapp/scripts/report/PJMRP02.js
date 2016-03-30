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
    $('#ddlProject').append("<option></option>");
    addData.forEach(function (value) {
        var text = value.projectName;
        $('#ddlProject').append("<option value=" + value.id + ">" + text + "</option>");
    });

});

//--------------------------------------------------------------------------------
$("#ddlProject").change(function () {

    var ddlModule;


    var dataJsonData = {
        projectId: $('#ddlProject').find('option:selected').val()
    }

    ddlModule = $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        type: "GET",
        url: contextPath + '/moduleprojects/findModuleByProjectId',
        data: dataJsonData,
        complete: function (xhr) {
        },
        async: false
    });

    var addData = ddlModule.responseJSON;
    $('#ddlModule').empty();
    $('#ddlModule').append("<option></option>");
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
    if ($("#ddlProject").val() == "") {

        $("#ddlProject").attr("data-content", Message.Please_Select).popover('show');
    }else {

    var date = new Date();


    var projectId = $('#ddlProject').find('option:selected').val();
    var projectName = $('#ddlProject').find('option:selected').text();
    var moduleCode = $('#ddlModule').find('option:selected').val();
    var moduleName = $('#ddlModule').find('option:selected').text();
    var plusYear = 0;
    console.log(moduleCode);
    console.log(moduleName);

    if (moduleCode == ""){
        moduleName = Message.All;
    }

    console.log(moduleCode);
    console.log(moduleName);

        if (_language == "TH") {

            var printDate = date.getDate() + "/" +
                (parseInt(date.getMonth()) + 1) + "/" +
                (parseInt(date.getFullYear()) + 543 );
            plusYear = 543;

            window.location.href = contextPath + '/reports/exportPJMRP02?projectId=' + projectId
                + '&projectName=' + projectName
                + '&moduleCode=' + moduleCode
                + '&moduleName=' + moduleName
                + '&printDate=' + printDate
                + '&plusYear=' + plusYear;

        }else if (_language == "EN" || _language == 'EN_US') {

            var printDate = date.getDate() + "/" +
                (parseInt(date.getMonth()) + 1) + "/" +
                (parseInt(date.getFullYear()) + 0 );
            plusYear = 0;

            window.location.href = contextPath + '/reports/exportPJMRP02?projectId=' + projectId
                + '&projectName=' + projectName
                + '&moduleCode=' + moduleCode
                + '&moduleName=' + moduleName
                + '&printDate=' + printDate
                + '&plusYear=' + plusYear;
        }

    }

}


