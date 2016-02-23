var _language = commonData.language;  // ค่าของ language อยู่ในไฟล์ common.js
var dateLang = checkLanguageDatePicker(_language);
//var _language2 = commonData.language;
//var dateLang2 = checkLanguageDatePicker(_language2);
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#StDateBegin").datepicker(dateLang);
$("#StDateEnd").datepicker(dateLang);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#StDateBegin").on('change', function () {
    DateUtil.setMinDate('StDateBegin', 'StDateEnd');
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#StDateEnd").on('change', function () {
    DateUtil.setMaxDate('StDateEnd', 'StDateBegin');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#FnDateBegin").datepicker(dateLang);
$("#FnDateEnd").datepicker(dateLang);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#FnDateBegin").on('change', function () {
    DateUtil.setMinDate('FnDateBegin', 'FnDateEnd');
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#FnDateEnd").on('change', function () {
    DateUtil.setMaxDate('FnDateEnd', 'FnDateBegin');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#search").click(function () {

    if ($('#StDateBegin').val() != "") {

            dateStart = $('#StDateBegin').val();
            dateStart = DateUtil.dataDateToDataBase(dateStart, _language);

    }
    else {
        dateStart = "";
    }

    if ($('#StDateEnd').val() != "") {
        dateEnd = $('#StDateEnd').val();
        dateEnd = DateUtil.dataDateToDataBase(dateEnd, _language);
    }
    else {
        dateEnd = "";
    }
    if ($('#FnDateBegin').val() != "") {
        fnDateStart = $('#FnDateBegin').val();
        fnDateStart = DateUtil.dataDateToDataBase(fnDateStart, _language);
    }
    else {
        fnDateStart = "";
    }
    if ($('#FnDateEnd').val() != "") {
        fnDateEnd = $('#FnDateEnd').val();
        fnDateEnd = DateUtil.dataDateToDataBase(fnDateEnd, _language);
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
}); //-- searchData --//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#addProject").click(function () {
    window.location.href = contextPath + '/projects/createproject';
}); //-- link Addproject --//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#data').on("click", "[id^=progress]", function () {
    var id =  this.id.split('progress')[1];
    console.log(id);
    window.location.href = contextPath + '/projects/progressproject?id='+id;
}); //-- link Progress --//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
paggination.setEventPaggingBtn("paggingSimple", paggination);
paggination.loadTable = function loadTable(jsonData) {

    if (jsonData.length <= 0) {

    }

    $('#ResualtSearch').empty();

    var tableData = "";
    var key = 1;
    jsonData.forEach(function (value) {
        dataModule =[];
        checkIdModule(value.id);
        if (dataModule != "") {
            tableData = ''

                + '<tr  style="background-color: #fff">'
                + '<td class="text-center">'
                + ' <input id="checkBoxDisable_'+value.id+'" class="check" type="checkbox" disabled="disabled"/>'
                + '</td>'
                + '<td class="text-center">'
                + '<button id="editProject'+key+'" class="btn btn-info" type="button">E</button>'
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
        }
        else
        {
            tableData = ''

                + '<tr  style="background-color: #fff">'
                + '<td class="text-center">'
                + ' <input id="checkBoxDisable_'+value.id+'" class="check" type="checkbox"/>'
                + '</td>'
                + '<td class="text-center">'
                + '<button id="editProject'+key+'" class="btn btn-info" type="button">E</button>'
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
        }


    });

};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#data').on("click", "[id^=checkBoxDisable_]", function () {
    var id = this.id.split('checkBoxDisable_')[1];
    if ($(this).prop('checked') == true) {
        checkedRows.push(id);
        alert(">>> " + checkedRows + "..");

    }
    else {
        var num = checkedRows.indexOf(id);
        checkedRows.splice(num, 1);
        alert(">>> " + checkedRows + "..");
    }
}); //--checkDataDelete--//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#data').on("click", "#checkAll", function () {

    $('[id^=checkBoxDelete]').prop('checked', $(this).prop('checked'));
    alert($('#data').find('tr').length);
    $('[id^=checkBoxDelete]').each(function() {
      var id =  this.id.split('checkBoxDelete')[1];
        if ($('#checkBoxDelete' + id).prop('checked') == true) {
                    num = checkedRows.indexOf(id)
                    if (num != "")
                    {
                        checkedRows.push(id);
                    }
                }
                else {
                    num = checkedRows.indexOf(id);
                    checkedRows.splice(num, 1);
                }
    });
    alert(">>> " + checkedRows + "..");
}); //--checkAllData--//
//////////////////////////////////////////////////////////////////////////////////////////////////
$("#btnDelete").click(function () {
    //alert(checkedRows.length);
    var i = 0;
    if (checkedRows.length > 0) {
        bootbox.confirm("คุณต้องการลบข้อมูลที่เลือกหรือไม่", function (result) {
            if (result === true) {
                for (i; checkedRows.length > i; i++) {
                    //alert(checkedRows[i] + 555555555);
                    //checkIdKey(i);
                    DeleteData(i);
                }
                bootbox.alert(" ลบข้อมูลสำเร็จ : " + DeSuccess + "  ลบข้อมูลไม่สำเร็จ : " + DeFail);
                DeSuccess = 0;
                DeFail = 0;
                checkedRows = [];
                $("#checkAll").attr('checked', false);

            }
            if (searchclick = true) {
                $("#checkAll").attr('checked', false);
                searchData();
            }
        });
    } else if (checkedRows.length == 0) {
        $("#checkAll").attr('checked', false);
        bootbox.alert("กรุณาเลือกข้อมูลที่ต้องการลบ");
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
        url: contextPath + '/projects/findDeleteProjects',
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
    console.log(dataModule);

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
            + '<td class="text-center">'
            + '<button id="addTask_' + value.moduleCode + '" class="btn btn-info" type="button">A</button>'
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
    var moduleCode =  this.id.split('addTask_')[1];
    console.log(moduleCode);
    window.location.href = contextPath + '/moduleprojects/detailsModule?moduleProject='+ moduleCode;

});
/////////////////////////////////////////////////////////////////////////////////////////////////
$("#close").click(function () {
    //$("#modalAddModule").modal('hide');
    //searchData();
}); //-- closeModal --//
/////////////////////////////////////////////////////////////////////////////////////////////////
