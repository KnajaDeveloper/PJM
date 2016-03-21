var _language = commonData.language;  // ค่าของ language อยู่ในไฟล์ common.js
var dateLang = checkLanguageDatePicker(_language);
var paggination = Object.create(UtilPaggination);
var dateStart = $('#StDateBegin').val();
var dateEnd = $('#StDateEnd').val();
var fnDateStart = $('#FnDateBegin').val();
var fnDateEnd = $('#FnDateEnd').val();
var checkedRows = [];
var dataJsonData;
var DeSuccess = 0;
var DeFail = 0;
var dataModule = [];
var json = [];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#StDateBegin").datepicker(dateLang);
$("#StDateEnd").datepicker(dateLang);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#StDateBegin").on('change', function () {
    DateUtil.setMinDate('StDateBegin', 'StDateEnd');
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#calendarStartFrom').click(function () {
    $( "#StDateBegin" ).focus();
});
/////////////////////////////////////////////////////////////////////////////////////////////////
$('#calendarStartFrom').click(function () {
    $( "#StDateBegin" ).focus();
});
/////////////////////////////////////////////////////////////////////////////////////////////////
$("#StDateEnd").on('change', function () {
    DateUtil.setMaxDate('StDateEnd', 'StDateBegin');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#calendarStartTo').click(function () {
    $( "#StDateEnd" ).focus();
});
/////////////////////////////////////////////////////////////////////////////////////////////////
$("#FnDateBegin").datepicker(dateLang);
$("#FnDateEnd").datepicker(dateLang);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#FnDateBegin").on('change', function () {
    DateUtil.setMinDate('FnDateBegin', 'FnDateEnd');
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#calendarFnFrom').click(function () {
    $( "#FnDateBegin" ).focus();
});
/////////////////////////////////////////////////////////////////////////////////////////////////
$("#FnDateEnd").on('change', function () {
    DateUtil.setMaxDate('FnDateEnd', 'FnDateBegin');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#calendarFnTo').click(function () {
    $( "#FnDateEnd" ).focus();
});
/////////////////////////////////////////////////////////////////////////////////////////////////
$("#search").click(function () {

    if ($('#checkAll').prop('checked') == true){
        $('#checkAll').prop('checked', false);
    }
    if ($('#StDateBegin').val() != "") {

            dateStart = $('#StDateBegin').val();
            dateStart = DateUtil.dataDateToDataBase(dateStart, _language);
        console.log(dateStart+"stf");
    }
    else {
        dateStart = "";
    }

    if ($('#StDateEnd').val() != "") {
        dateEnd = $('#StDateEnd').val();
        dateEnd = DateUtil.dataDateToDataBase(dateEnd, _language); console.log(dateEnd+"stt");
    }
    else {
        dateEnd = "";
    }
    if ($('#FnDateBegin').val() != "") {
        fnDateStart = $('#FnDateBegin').val();
        fnDateStart = DateUtil.dataDateToDataBase(fnDateStart, _language);console.log(fnDateStart+"enf");
    }
    else {
        fnDateStart = "";
    }
    if ($('#FnDateEnd').val() != "") {
        fnDateEnd = $('#FnDateEnd').val();
        fnDateEnd = DateUtil.dataDateToDataBase(fnDateEnd, _language);console.log(fnDateEnd+"ent");
    }
    else {
        fnDateEnd = "";
    }

    dataJsonData = {
        projectManage: $('#projectManage').val(),
        StDateBegin: dateStart,
        StDateEnd: dateEnd,
        FnDateBegin: fnDateStart,
        FnDateEnd: fnDateEnd,
        costStart: $('#costStart').val(),
        costEnd: $('#costEnd').val(),
    }

    searchData();
    if(json.length <= 0)
    {
        bootbox.alert(MESSAGE.ALERT_DATA_NOT_FOUND);
    }
}); //-- searchData --//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#addProject").click(function () {
    window.location.href = contextPath + '/projects/createproject';
}); //-- link Addproject --//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#data').on("click", "[id^=editProject_]", function () {
    var id =  this.id.split('editProject_')[1];
    window.location.href = contextPath + '/projects/editproject?projectId='+id;
}); //-- link editProject --//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#data').on("click", "[id^=progress]", function () {
    var id =  this.id.split('progress')[1];
    //console.log(id);
    window.location.href = contextPath + '/projects/progressproject?id='+id;
}); //-- link Progress --//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
paggination.setEventPaggingBtn("paggingSimple", paggination);
paggination.loadTable = function loadTable(jsonData) {
        json = jsonData ;
    if (jsonData.length <= 0) {

    }

    $('#ResualtSearch').empty();

    var tableData = "";
    var key = 1;
    jsonData.forEach(function (value) {
        dataModule =[];
            tableData = ''
                + '<tr  style="background-color: #fff">'
                + '<td class="text-center">'
                + '<input id="' + (value.inUse > 0 ? 'checkBoxDisable_' : 'checkBoxDelete')+value.id+'" class="check" type="checkbox" '+(value.inUse > 0 ? '':'projectID="id_'+value.id+'" status="check"')+' />'
                + '</td>'
                + '<td class="text-center">'
                + '<button id="editProject_'+value.id+'" class="btn btn-info" type="button">E</button>'
                + '</td>'
                + '<td class="text-center">'
                + '<button id="addTask_'+value.id+'" class="btn btn-info" type="button">A</button>'
                + '</td>'
                + '<td class="text-center">'
                + '<button id="progress'+value.id+'" class="btn btn-info" type="button">V</button>'
                + '</td>'
                + '<td id="projectName' +key + '" class="text-center" style="color: #000">'
                + value.projectName
                + '</td>'
                + '<td id="dateStart' + key + '" class="text-center" style="color: #000">'
                + DateUtil.dataDateToFrontend(value.dateStart, _language)
                + '</td>'
                + '<td id="dateEnd' + key + '" class="text-center" style="color: #000">'
                + DateUtil.dataDateToFrontend(value.dateEnd, _language)
                + '</td>'
                + '<td id="projectCost' + key++ + '" class="text-center" style="color: #000">'
                + value.projectCost
                + '</td>'
                + '</tr>';
            $('#ResualtSearch').append(
                tableData
            );

    });

};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#data').on("click", "[id^=checkBoxDisable_]", function () {
   bootbox.alert(MESSAGE.ALERT_NOT_DELETE_THIS_DATA);
    var id = this.id.split('checkBoxDisable_')[1];
    $("#checkBoxDisable_"+id).attr('checked', false);

}); //--checkDisableDelete--//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#data').on("click", "[id^=checkBoxDelete]", function () {

    var checkNum = $('input[status=check]').length;
    var checkBoxCheck =  $('input[status=check]:checked').length;
    if (checkBoxCheck == checkNum){
        $('#checkAll').prop('checked', true);
    }
    else
    {
        $('#checkAll').prop('checked', false);
    }
}); //--checkDataDelete--//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#data').on("click", "#checkAll", function () {
    $('[id^=checkBoxDelete]').prop('checked', $(this).prop('checked'));
}); //--checkAllData--//
//////////////////////////////////////////////////////////////////////////////////////////////////
$("#btnDelete").click(function () {
    $('input[status=check]:checked').each(function () {
        if( $('input[status=check]:checked'))
        {
            var roleCode = $(this).attr('projectID').split("id_")[1];
            checkedRows.push(roleCode);
        }
    });
    console.log(checkedRows);
    if (checkedRows.length > 0) {
        bootbox.confirm(MESSAGE.REMOVE_DATA, function (result) {
            if (result === true) {
                for (var i=0; checkedRows.length > i; i++) {
                    DeleteData(i);
                }
                bootbox.alert( MESSAGE.ALERT_DELETE_SUCCESS +" " + DeSuccess +" "+  MESSAGE.ALERT_DELETE_FAIL + DeFail);
                DeSuccess = 0;
                DeFail = 0;
                checkedRows = [];
                $("#checkAll").attr('checked', false);
                searchData();
            }
        });
    } else if (checkedRows.length == 0) {
        bootbox.alert(MESSAGE.ALERT_PLEASE_SELECT_DATA);
    }
}); //-- deleteData--//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function searchData() {

    paggination.setOptionJsonData({
        url: contextPath + "/projects/findProjectSearchData",
        data: dataJsonData
    });
    paggination.setOptionJsonSize({
        url: contextPath + "/projects/projectPaggingSize",
        data: dataJsonData
    });
    paggination.search(paggination);
}  //--functionSearch--//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DeleteData(i) {
    var dataJsonData = {
        deleteCode: checkedRows[i]

    }
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/projects/deleteProjects',
        data: dataJsonData,

        complete: function (xhr) {
            if (xhr.status === 200) {
                DeSuccess++;

            } else if (xhr.status === 500) {
                DeFail++;

            }
        },
        async: false
    });
} //--functionDelete--//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkIdModule(id) {
    var responseResult = null;
    var dataJsonData = {
        projectId: id

    }
    responseResult = $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/moduleprojects/findProjectCheckID',
        data: dataJsonData,
        complete: function (xhr) {

        },
        async: false
    });
    dataModule = jQuery.parseJSON(responseResult.responseText);
    //console.log(dataModule);

} //--functionCheckID--//
/////////////////////////////////////////////////////////////////////////////////////////////////
$('#data').on("click", "[id^=addTask_]", function () {
    var id =  this.id.split('addTask_')[1];
    //console.log(id);
    checkIdModule(id);
    $('#ResualtModule').empty();
    var tableData = "";
    var key = 1;
    $.each(dataModule, function (key,value) {
        tableData = ''
            + '<tr>'
            + '<td class="text-center">'
            + '<button id="addTask_' + value.id + '" class="btn btn-info" type="button">A</button>'
            + '</td>'
            + '<td id="moduleName_' + key + '" class="text-center" style="color: #000">'
            + value.moduleName
            + '</td>'
            + '<td id="dateStart' + key + '" class="text-center" style="color: #000">'
            + DateUtil.dataDateToFrontend(value.dateStart, _language)
            + '</td>'
            + '<td id="dateEnd' + key + '" class="text-center" style="color: #000">'
            + DateUtil.dataDateToFrontend(value.dateEnd, _language)
            + '</td>'
            + '<td id="projectCost' + key++ + '" class="text-center" style="color: #000">'
            + value.moduleCost
            + '</td>'
            + '</tr>';
        $('#ResualtModule').append(
            tableData);
    });

        $("#modalAddModule").modal('show');

});
/////////////////////////////////////////////////////////////////////////////////////////////////
$('#tableAddTask').on("click", "[id^=addTask_]", function () {
    var id =  this.id.split('addTask_')[1];
    //console.log(id);
    window.location.href = contextPath + '/moduleprojects/detailsModule?id='+ id;

});
/////////////////////////////////////////////////////////////////////////////////////////////////
$("#close").click(function () {
    $("#modalAddModule").modal('hide');
    searchData();
}); //-- closeModal --//
/////////////////////////////////////////////////////////////////////////////////////////////////
$("[id^=paggingSimpleBtn]").click(function () {
    if ($('#checkAll').prop('checked') == true){
        $('input[type=checkbox]').prop('checked', false);
    }
}); //--paggingSimpleBtn--//
//////////////////////////////////////////////////////////////////////////////////////////////////
