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
    checkDateFormat($(this), MESSAGE.DATE_FORMAT, "");
    //if($(this).val != '')
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
    checkDateFormat($(this), MESSAGE.DATE_FORMAT, "");
    //if($(this).val != '')
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
    checkDateFormat($(this), MESSAGE.DATE_FORMAT, "");
    //if($(this).val != '')
    DateUtil.setMinDate('FnDateBegin', 'FnDateEnd');
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#calendarFnFrom').click(function () {
    $( "#FnDateBegin" ).focus();
});
/////////////////////////////////////////////////////////////////////////////////////////////////
$("#FnDateEnd").on('change', function () {
    checkDateFormat($(this), MESSAGE.DATE_FORMAT, "");
    //if($(this).val != '')
    DateUtil.setMaxDate('FnDateEnd', 'FnDateBegin');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#calendarFnTo').click(function () {
    $( "#FnDateEnd" ).focus();
});
var st,en = 0 ;
/////////////////////////////////////////////////////////////////////////////////////////////////
$("#search").click(function () {
    st = 0; en = 0;

    if ($('#checkAll').prop('checked') == true){
        $('#checkAll').prop('checked', false);
    }
    if ($('#StDateBegin').val() != "") {

            dateStart = $('#StDateBegin').val();
            dateStart = DateUtil.dataDateToDataBase(dateStart, _language);
        //console.log(dateStart+"stf");
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

    if($('#costStart').val() != "") {
        if ($.isNumeric($('#costStart').val())){
            if($('#costStart').val().indexOf('.') > -1 ) {
                if (($('#costStart').val().length - 1) - $('#costStart').val().indexOf('.') > 4) {
                    $('#costStart').attr("data-content", MESSAGE.ALERT_PLEASE_ENTER_NO_MORE_THAN_FOUR_DECIMAL_NUMBERS).popover('show');
                    st = 0;
                }
                else {
                    st = 1;
                }
            }
            else {
                st = 1;
            }

        }
        else {
            $('#costStart').attr("data-content", MESSAGE.ALERT_PLEASE_ENTER_ONLY_NUMBERS).popover('show');
            st = 0;
        }
    }
    else {st = 1 ;}

    if($('#costEnd').val() != "") {
        if ($.isNumeric($('#costEnd').val())){
            if($('#costEnd').val().indexOf('.') > -1 ) {
                if (($('#costEnd').val().length - 1) - $('#costEnd').val().indexOf('.') > 4) {
                    $('#costEnd').attr("data-content", MESSAGE.ALERT_PLEASE_ENTER_NO_MORE_THAN_FOUR_DECIMAL_NUMBERS).popover('show');
                    en = 0;
                }
                else {
                    en = 1;
                }
            }
            else {
                en = 1;
            }
        }
        else {
            $('#costEnd').attr("data-content", MESSAGE.ALERT_PLEASE_ENTER_ONLY_NUMBERS).popover('show');
            en = 0;
        }
    }
    else {en = 1 ;}

    if(st ==1 && en == 1)
    {
        searchData();
    }


}); //-- searchData --//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#addProject").click(function () {
    window.location.href = contextPath + '/projects/createproject';
}); //-- link Addproject --//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#data').on("click", "[id^=editProject_]", function () {
    var projectId =  this.id.split('editProject_')[1];
    var result =  roleProjectAndModuleProject(projectId);
     //console.log(s);
    if(result)
    {
        window.location.href = contextPath + '/projects/editproject?projectId='+projectId;
    }
    else
    {
        bootbox.alert(MESSAGE.ALERT_YOU_NOT_ACCESS_RIGHTS);
    }

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
    $('input[type=checkbox]').prop('checked', false);

    $('#ResualtSearch').empty();

    var tableData = "";
    var key = 1;
    if(jsonData.length > 0 ) {
    jsonData.forEach(function (value) {
        dataModule =[];
            tableData = ''
                + '<tr>'
                + '<td class="text-center">'
                + '<input id="' + (value.inUse > 0 ? 'checkBoxDisable_' : 'checkBoxDelete')+value.id+'" checkBox="check" class="check" type="checkbox" '
                +(value.inUse > 0 ? '':'projectID="id_'+value.id+'" status="check"')+''+(value.rolePm == true ? 'rolePm="'+value.rolePm+'"':'rolePm="'+value.rolePm+'"')+' />'
                + '</td>'
                + '<td class="text-center">'
                + '<button id="editProject_'+value.id+'" class="btn btn-info btn-xs" type="button"><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
                + '</td>'
                + '<td class="text-center">'
                + '<button id="addTask_'+value.id+'" class="btn btn-info btn-xs" type="button"><span name="editClick" class="glyphicon glyphicon-plus" aria-hidden="true" ></span></button>'
                + '</td>'
                + '<td class="text-center">'
                + '<button id="progress'+value.id+'" class="btn btn-info btn-xs" type="button"><span name="editClick" class="glyphicon glyphicon-align-left" aria-hidden="true" ></span></button>'
                + '</td>'
                + '<td id="projectName' +key + '" class="text-left" style="color: #000">'
                + value.projectName
                + '</td>'
                + '<td id="dateStart' + key + '" class="text-center" style="color: #000">'
                + DateUtil.dataDateToFrontend(value.dateStart, _language)
                + '</td>'
                + '<td id="dateEnd' + key + '" class="text-center" style="color: #000">'
                + DateUtil.dataDateToFrontend(value.dateEnd, _language)
                + '</td>'
                + '<td id="projectCost' + key++ + '" class="text-center" style="color: #000">'
                + value.projectCost +' '+ MESSAGE.LABEL_POINT+''
                + '</td>'
                + '</tr>';
            $('#ResualtSearch').append(
                tableData
            );

    });
    }
    else {
        tableData = ''
            + '<tr class="text-center" >'
            + '<td colspan="8" style="color: #000">'
            + MESSAGE.ALERT_DATA_NOT_FOUND
            + '</td>'
            + '</tr>';
        $('#ResualtSearch').append(
            tableData
        );
    }

};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#data').on("click", "[id^=checkBoxDisable_]", function () {
    var id = this.id.split('checkBoxDisable_')[1];
    if($("#checkBoxDisable_"+id).attr('rolePm') == 'false'){
        bootbox.alert( MESSAGE.ALERT_YOU_NOT_REMOVE);
    }
    if($("#checkBoxDisable_"+id).attr('rolePm') == 'true'){
        bootbox.alert(MESSAGE.ALERT_NOT_DELETE_THIS_DATA);
    }
    $("#checkBoxDisable_"+id).attr('checked', false);

}); //--checkDisableDelete--//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#data').on("click", "[id^=checkBoxDelete]", function () {
    var id = this.id.split('checkBoxDelete')[1];
    if($("#checkBoxDelete"+id).attr('rolePm') == 'false'){
        bootbox.alert( MESSAGE.ALERT_YOU_NOT_REMOVE);
        $("#checkBoxDelete"+id).prop('checked', false);
    }
    var checkNum = $('input[rolePm=true][status=check]').length;
    var checkBoxCheck =  $('input[rolePm=true][status=check]:checked').length;
    //console.log(checkBoxCheck +"2......"+ checkNum)
    if (checkBoxCheck >0 && checkBoxCheck == checkNum){
        $('#checkAll').prop('checked', true);
    }
    else
    {
        $('#checkAll').prop('checked', false);
    }
}); //--checkDataDelete--//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#data').on("click", "#checkAll", function () {

        $('input[rolePm=true][status=check]').prop('checked', $(this).prop('checked'));
    var num =  $('input[rolePm=true]:checked ').length;
    var status =  $('input[rolePm=true]').length;
    //console.log(status); console.log(num+"ss");
    if (status > 0 && num <= 0 && $('#checkAll').prop('checked') == true ){
       $('#checkAll').prop('checked', false);
      bootbox.alert(MESSAGE.ALERT_INUSE_OR_NOT_REMOVE);
    }
}); //--checkAllData--//
//////////////////////////////////////////////////////////////////////////////////////////////////
var sessionError  = false ;
$("#btnDelete").click(function () {
    checkedRows = [];
    $('input[status=check]:checked').each(function () {
        if( $('input[status=check]:checked'))
        {
            var roleCode = $(this).attr('projectID').split("id_")[1];
            checkedRows.push(roleCode);
        }
    });
    //console.log(checkedRows);
    if (checkedRows.length > 0) {
        bootbox.confirm(MESSAGE.REMOVE_DATA, function (result) {
            if (result === true) {
                for (var i=0; checkedRows.length > i; i++) {
                    DeleteData(i);
                    //console.log(i);
                    if(sessionError){break;}
                }
                if(DeSuccess > 0 && sessionError == false){
                    bootbox.alert(MESSAGE.ALERT_DELETE_SUCCESS +" " + DeSuccess + " " + MESSAGE.ALERT_LIST);
                    $("#checkAll").attr('checked', false);
                    DeSuccess = 0;
                    DeFail = 0;
                    checkedRows = [];
                    searchData();
                }else if(DeFail > 0 && sessionError == false) {
                    bootbox.alert(MESSAGE.ALERT_DELETE_SUCCESS+ " " + DeSuccess +" "+ MESSAGE.ALERT_LIST + " " + MESSAGE.ALERT_DELETE_FAIL + DeFail + " " + MESSAGE.ALERT_LIST);
                    DeSuccess = 0;
                    DeFail = 0;
                    checkedRows = [];
                    searchData();
                }
                //bootbox.alert( MESSAGE.ALERT_DELETE_SUCCESS +" : " + DeSuccess +" "+  MESSAGE.ALERT_DELETE_FAIL +" : "+ DeFail);
                sessionError = false;
            }
        });
    } else if (checkedRows.length == 0) {
        bootbox.alert(MESSAGE.ALERT_PLEASE_SELECT_DATA);
    }
}); //-- deleteData--//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function searchData() {
    dataJsonData = {
        projectManage: $("#lovPm").data("dataCode"),
        moduleManager: $("#lovMm").data("dataCode"),
        StDateBegin: dateStart,
        StDateEnd: dateEnd,
        FnDateBegin: fnDateStart,
        FnDateEnd: fnDateEnd,
        costStart: $('#costStart').val(),
        costEnd: $('#costEnd').val(),
    }
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
        projectId: checkedRows[i]

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
            }else if (xhr.status === 0 ){

                bootbox.alert(MESSAGE.ALERT_DELETE_FAIL);
                sessionError = true ;
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
    if(dataModule.length > 0 ) {
    $.each(dataModule, function (key,value) {
        tableData = ''
            + '<tr>'
            + '<td class="text-center">'
            + '<button id="addTask_' + value.id + '" class="btn btn-info btn-xs" type="button" projectid="'+id+'"><span name="editClick" class="glyphicon glyphicon-plus" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="moduleName_' + key + '" class="text-left" style="color: #000">'
            + value.moduleName
            + '</td>'
            + '<td id="dateStart' + key + '" class="text-center" style="color: #000">'
            + DateUtil.dataDateToFrontend(value.dateStart, _language)
            + '</td>'
            + '<td id="dateEnd' + key + '" class="text-center" style="color: #000">'
            + DateUtil.dataDateToFrontend(value.dateEnd, _language)
            + '</td>'
            + '<td id="projectCost' + key++ + '" class="text-center" style="color: #000">'
            + value.moduleCost +' '+ MESSAGE.LABEL_POINT+''
            + '</td>'
            + '</tr>';
        $('#ResualtModule').append(
            tableData);
    });
    }
    else {
        tableData = ''
            + '<tr class="text-center" >'
            + '<td colspan="5" style="color: #000">'
            + MESSAGE.ALERT_DATA_NOT_FOUND
            + '</td>'
            + '</tr>';
        $('#ResualtModule').append(
            tableData
        );
    }

        $("#modalAddModule").modal('show');

});
/////////////////////////////////////////////////////////////////////////////////////////////////
$('#tableAddTask').on("click", "[id^=addTask_]", function () {
    var moduleProjectId =  this.id.split('addTask_')[1];
    var projectId = $(this).attr("projectid");
    // console.log(projectId);
   var result =  roleProject(projectId,moduleProjectId);
   // console.log(s);
   if(result)
   {
    window.location.href = contextPath + '/moduleprojects/detailsModule?projectId='+ projectId +'&moduleProjectId='+moduleProjectId;
   }
   else
   {
    bootbox.alert(MESSAGE.ALERT_YOU_NOT_ACCESS_RIGHTS);
   }
    

});
/////////////////////////////////////////////////////////////////////////////////////////////////
$("#close").click(function () {
    $("#modalAddModule").modal('hide');
    searchData();
}); //-- closeModal --//
///////////////////////////////////////////////////////////////////////////////////////////////////
//$("[id^=paggingSimpleBtn]").click(function () {
//    if ($('#checkAll').prop('checked') == true){
//        $('input[type=checkbox]').prop('checked', false);
//    }
//}); //--paggingSimpleBtn--//
////////////////////////////////////////////////////////////////////////////////////////////////////
