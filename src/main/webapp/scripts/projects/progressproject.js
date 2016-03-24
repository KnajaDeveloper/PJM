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

var pagginationModule = Object.create(UtilPaggination);
pagginationModule.setEventPaggingBtn("paggingSimpleModuleProject",pagginationModule);
pagginationModule.loadTable = function loadTable (jsonData) {

  if(jsonData.length <= 0)
   bootbox.alert(Message.MSG_DATA_NOT_FOUND);

 $('#ResualtSearchProgram').empty();
 var link = "";
 var i = 1;
 var tableData = "";
 var key = 1 ;

 jsonData.forEach(function(value){
     var checkProgress = value.progress == "" ? '0' : value.progress;
     var colorProgress =  value.progress == "100" ? "progress-bar-success" : "progress-bar-warning";
     text =  ''
   +'<tr id ="trData' + key++ + '">'
   +'<td class="text-center"><button id="btnDetailModule' + value.id + '" type="button" class="btn btn-primary btn-xs" >V</button></td>'
   +'<td  id="tdModuleName" moduleId="' + value.id + '" class="text-center" onclick="onClickTrProgram(this)">' + value.moduleName + '</td>'
   +'<td  id="tdProgest" moduleId="' + value.id + '"onclick="onClickTrProgram(this)"> <div class="progress-bar ' + colorProgress + '" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: '+ parseFloat(checkProgress).toFixed(2) + '%; color:#000">'
   + parseFloat(checkProgress).toFixed(2) + '%'
   +'</div>'
   +'</td>'
   +'<td  id="tdDateStart" moduleId="' + value.id + '" class="text-center" onclick="onClickTrProgram(this)">'+ConvertDate(value.dateStart,commonData.language)+'</td>'

   +'<td id="tdDateEnd" moduleId="' + value.id + '" class="text-center" onclick="onClickTrProgram(this)">'+ConvertDate(value.dateEnd,commonData.language)+' </td>'
   + '</tr>'

   $('#ResualtSearch').append(text);
 });
};
function onClickTrProgram(object) {
    MuduleManager (object.attributes.moduleId.textContent);
    $('#lblNameManager').text(Label.LABEL_LABEL_MODULE_MANAGER)
    var lengthTr = $('#Table').find('tr').length;
    for(var i = 1; i < lengthTr; i++){
        $('#trData' + i).css('background-color', '#FFF');
    }

    $(object.parentElement).css('background-color', '#F5F5F5');


}
function searchDataProgram() {
 var dataJsonData = {
  projectCode: projectID
}
pagginationModule.setOptionJsonData({
 url:contextPath + "/moduleprojects/findModuleByProjectCode2",
 data:dataJsonData
});
pagginationModule.setOptionJsonSize({
  url:contextPath + "/moduleprojects/findPaggingSizeModuleProject",
  data:dataJsonData
});
pagginationModule.search(pagginationModule);
}



function ProjectManager(){
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


$('#lblCaretakerName').empty();
var addData = ll2.responseJSON;
var Managers = "";
addData.forEach(function(value){
  Managers += value.empCode +"<br/>";
});

$('#lblCaretakerName').append(Managers);

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
addData2.forEach(function(value){
  Managers1 += value.empCode +"<br/>";
});

$('#lblModuleManager').append(Managers1);

}

$('#Table').on("click", "[id^=btnDetailModule]", function () {
    var id =  this.id.split('btnDetailModule')[1];
    console.log(id);
    window.location.href = contextPath + '/moduleprojects/detailsModule?id='+id;
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