var labelData;
var ll2;
var ll3;
$(document).ready(function(){
  console.log("xxxxxxxxxxxx"+projectCode );
 searchDataProgram();
 ProjectManager();
 MuduleManager();
 var dataJsonData = {
  projectCode: projectCode
}
labelData = $.ajax({
  headers: {
   Accept: "application/json"
 },
 type: "GET",
 url: contextPath + '/projects/findProjectByProjectCode2',
 data : dataJsonData,
 complete: function(xhr){
 },
 async: false
});

var addData = labelData.responseJSON;
$('#lblName').text(addData[0].projectName);
$('#lblProjectCode').text(addData[0].projectCode);
$('#lblCostsPoint').text(addData[0].projectCost+"Point");
$('#lblStartDate').text(DateUtil.dataDateToFrontend(addData[0].dateStart,commonData.language));
$('#lblBalanceCostsPoint').text(addData[0].projectCost);
$('#lbldateEnd').text(DateUtil.dataDateToFrontend(addData[0].dateEnd,commonData.language));

});

var pagginationModule = Object.create(UtilPaggination);
pagginationModule.setEventPaggingBtn("paggingSimpleModuleProject",pagginationModule);
pagginationModule.loadTable = function loadTable (jsonData) {

  if(jsonData.length <= 0)
   bootbox.alert("ไม่พบข้อมูล");

 $('#ResualtSearchProgram').empty();
 var link = "";
 var i = 1;
 var tableData = "";
 var key = 1 ;
 
 jsonData.forEach(function(value){ 
   text =  ''
   +'<tr id ="trData'+key++ +'">'
   +'<td class="text-center"><button id="btnDetailModule' + value.moduleCode + '" type="button" class="btn btn-primary btn-lg" width="100">V</button></td>' 
   +'<td  id="tdModuleName' + key + '" class="text-center">' + value.moduleName + '</td>'
   +'<td  id="tdProgest' + key + '" class="progressbar-center"><div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 50%; ">'
   +'10%   '                                 
   +'</div>'
   +'</td>'
   +'<td  id="tdDateStart' + key + '"class="text-center">'+DateUtil.dataDateToFrontend(value.dateStart,commonData.language)+'</td>'
  
   +'<td id="tdDateEnd' + key + '"class="text-center">'+DateUtil.dataDateToFrontend(value.dateEnd,commonData.language)+' </td>'
   //+'<td id="tdEmpCode' + i + '"class="text-center">'+value.empCode+'</td>' 
   + '</tr>'
   $('#ResualtSearch').append(text);
 });
};
function searchDataProgram() {
 var dataJsonData = {
  projectCode: projectCode
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
  project: projectCode
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

function MuduleManager(){
  var dataJsonData = {

  moduleProject : "d.d"
}
ll3 = $.ajax({
  headers: {
   Accept: "application/json"
 },
 type: "GET",
 url: contextPath + '/modulemanagers/findModuleManagerByModuleProject',
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
// $('#Table').on("click", "[id^=btnDetailModule]", function () {
  
// });

// $('#data').on("click", "[id^=btnDetailModule]", function () {
//     var id =  this.id.split('btnDetailModule')[1];
//     console.log(id);
//     window.location.href = contextPath + '/projects/progressproject?id='+id;
// });

// function checkIdModule(id) {
//     var responseResult = null;
//     var dataJsonData = {
//         projectId: id

//     }
//     responseResult = $.ajax({
//         type: "GET",
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         headers: {
//             Accept: "application/json"
//         },
//         url: contextPath + '/moduleprojects/findProjectCheckID',
//         data: dataJsonData,
//         complete: function (xhr) {

//         },
//         async: false
//     });
//     dataModule = jQuery.parseJSON(responseResult.responseText);
//     console.log(dataModule);

// }
$('#Table').on("click", "[id^=btnDetailModule]", function () {
    var id =  this.id.split('btnDetailModule')[1];
    console.log(id);
    window.location.href = contextPath + '/moduleprojects/detailsModule?moduleProject='+id;
}); //-- link Progress --//