var labelData;
var ll2;
var ll3;

$(document).ready(function(){
 searchDataProgram();
 ProjectManager();
 var dataJsonData = {
     projectID: projectID
}
labelData = $.ajax({
  headers: {
   Accept: "application/json"
 },
 type: "GET",
 url: contextPath + '/projects/findProjectByIdProject',
 data : dataJsonData,
 complete: function(xhr){
 },
 async: false
});

  var  CostTotal = $.ajax({
        headers: {
            Accept: "application/json"
        },
        type: "GET",
        url: contextPath + '/moduleprojects/findModuleProjectCostforSum',
        data : {id: projectID},
        complete: function(xhr){
        },
        async: false
    });

var addData = labelData.responseJSON;
$('#lblName').text(addData.Project[0].projectName);
$('#lblProjectCode').text(addData.Project[0].projectCode);
$('#lblCostsPoint').text(addData.Project[0].projectCost+Message.MSG_SPACE+ Message.MSG_POINT);
$('#lblStartDate').text(DateUtil.dataDateToFrontend(addData.Project[0].dateStart,commonData.language));
$('#lbldateEnd').text(DateUtil.dataDateToFrontend(addData.Project[0].dateEnd,commonData.language));
$('#lblBalanceCostsPoints').text(parseInt($('#lblCostsPoint').text()) -  CostTotal.responseJSON + Message.MSG_SPACE+Message.MSG_POINT);
});
var dataJsonData = {
    project: projectID
}
ll2 = $.ajax({
    headers: {
        Accept: "application/json"
    },
    type: "GET",
    url: contextPath + '/projectmanagers/findManagerByProject',
    data : dataJsonData,
    complete: function(xhr){
    },
    async: false
});


var addData = ll2.responseJSON;
var Managers = "";
var empCode = [];
addData.forEach(function(value){
    empCode.push(value.empCode);
});

findEmpNameAndEmpPositionNameByEmpCode(empCode);
for(var i = 0; i < empLastName.length; i++){
    $("#lblCaretakerName").append(empFirstName[i] + " " +
        empLastName[i] + " (" + empPositionName[i] + ")" + '<br/>');
}


function onClickTrProgram(object) {
    check = true;
    MuduleManager (object.attributes.moduleId.textContent);
    $('#lblNameManager').text(Label.LABEL_LABEL_MODULE_MANAGER)
    var lengthTr = $('#Table').find('tr').length;
    for(var i = 1; i < lengthTr; i++){
        $('#trData' + i).css('background-color', '#FFF');
    }

    $(object.parentElement).css('background-color', '#F5F5F5');


}
var pagginationModule = $.extend({},UtilPaggination);
function searchDataProgram() {
 var dataJsonData = {
     id : projectID
}

pagginationModule.setOptionJsonData({
 url:contextPath + "/moduleprojects/findPaggingData",
 data:dataJsonData
});
pagginationModule.setOptionJsonSize({
  url:contextPath + "/moduleprojects/findPaggingSize",
  data:dataJsonData
});
pagginationModule.search(pagginationModule);
}
//var pagginationModule = Object.create(UtilPaggination);
pagginationModule.setEventPaggingBtn("paggingSimpleModuleProject",pagginationModule);
pagginationModule.loadTable = function loadTable (jsonData) {
    $('#ResualtSearch').empty();
    if(jsonData.length <= 0)
        $('#ResualtSearch').append('<tr><td colspan = 5 class="text-center">' + Message.MSG_DATA_NOT_FOUND + '</td></tr>');
    var link = "";
    var i = 1;
    var tableData = "";
    var key = 1 ;

    jsonData.forEach(function(value){
        var checkProgress = value.progress == "" ? '0' : value.progress;
        var colorProgress =  value.progress == "100" ? "progress-bar-success" : "progress-bar-warning";
        var checkPercent;
        if((value.progress + "").indexOf('.') == -1){
            checkPercent = checkProgress;
        }else{
            checkPercent = parseFloat(checkProgress).toFixed(4);
            //console.log(checkPercent);
        }
        text =  ''
            +'<tr id ="trData' + key++ + '">'
            +'<td class="text-center"><button id="btnDetailModule' + value.id + '" type="button" class="btn btn-info btn-xs" ><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button></td>'
            +'<td  id="tdModuleName" moduleId="' + value.id + '" class="text-left" onclick="onClickTrProgram(this)">' + value.moduleName + '</td>'
            +'<td  id="tdProgest" moduleId="' + value.id + '"onclick="onClickTrProgram(this)"> <div class="progress-bar ' + colorProgress + '" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: '+ parseFloat(checkProgress).toFixed(2) + '%; color:#000">'
            + checkPercent  + '%'
            +'</div>'
            +'</td>'
            +'<td  id="tdDateStart" moduleId="' + value.id + '" class="text-center" onclick="onClickTrProgram(this)">'+ConvertDate(value.dateStart,commonData.language)+'</td>'

            +'<td id="tdDateEnd" moduleId="' + value.id + '" class="text-center" onclick="onClickTrProgram(this)">'+ConvertDate(value.dateEnd,commonData.language)+' </td>'
            + '</tr>'

        $('#ResualtSearch').append(
            text
        );
    });
};



function ProjectManager(){
}

function MuduleManager(moduleProjectID){
  var dataJsonData = {

      id: moduleProjectID
}
ll3 = $.ajax({
  headers: {
   Accept: "application/json"
 },
 type: "GET",
 url: contextPath + '/moduleprojects/findModuleProjectByModuleProjectID',
 data : dataJsonData,
 complete: function(xhr){
 },
 async: false
});
$('#lblModuleManager').empty();
var addData2 = ll3.responseJSON;
var Managers1 = "";
var empCode = [];
addData2.forEach(function(value){
    empCode.push(value.empCode);
});

findEmpNameAndEmpPositionNameByEmpCode(empCode);
for(var i = 0; i < empLastNameModuleproject.length; i++){
    $("#lblModuleManager").append(empFirstNameModuleproject[i] + " " +
        empLastNameModuleproject[i] + " (" + empPositionModuleproject[i] + ")" + '<br/>');
}

}

$('#Table').on("click", "[id^=btnDetailModule]", function () {
    var moduleProjectId =  this.id.split('btnDetailModule')[1];
    window.location.href = contextPath + '/moduleprojects/detailsModule?projectId='+ projectID +'&moduleProjectId='+moduleProjectId;
}); //-- link Progress --//


function ConvertDate(date,lang){
    var dateResult = ""
    var spritDate =  (date.split(" ")[0]).split("-");
    if(lang=='EN' || lang=='EN_US'){
        dateResult = spritDate[2] + "/" + spritDate[1]+"/"+spritDate[0];
    }if(lang=='TH'){
        dateResult =  spritDate[2] + "/" + spritDate[1]+"/"+(parseInt(spritDate[0])+ 543);
    }
    return dateResult ;
}
var empLastName = [];
var empFirstName = [];
var empPositionName = [];
var empFirstNameModuleproject = [];
var empLastNameModuleproject = [];
var empPositionModuleproject = [];
var check = false;

function findEmpNameAndEmpPositionNameByEmpCode(empCode){
    var valueEmp = $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/moduleprojects/findEmpNameAndEmpPositionNameByEmpCode',
        data: JSON.stringify(empCode),
        complete: function(xhr){
        },
        async: false
    });


    empFirstName = [];
    empLastName = [];
    empPositionName = [];
    empFirstNameModuleproject = [];
    empLastNameModuleproject = [];
    empPositionModuleproject = [];

    valueEmp = valueEmp.responseJSON
    valueEmp.forEach(function(value){
        if(!check){
        empFirstName.push(value.empFirstName);
        empLastName.push(value.empLastName);
        empPositionName.push(value.empPositionName);
        }else{
            empFirstNameModuleproject.push(value.empFirstName);
            empLastNameModuleproject.push(value.empLastName);
            empPositionModuleproject.push(value.empPositionName);
        }
    });

    check = false;
}
