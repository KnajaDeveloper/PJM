var labelData;
var ll2;
$(document).ready(function(){
 searchDataProgram();
 ProjectManager();
 var dataJsonData = {
  projectCode: "ก"
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
$('#lblCostsPoint').text(addData[0].projectCost+""+""+""+"Point");
$('#lblStartDate').text(addData[0].dateStart);
$('#lblBalanceCostsPoint').text(addData[0].projectCost);
$('#lbldateEnd').text(addData[0].dateEnd);

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
 jsonData.forEach(function(value){ 
   text =  ''
   +'<tr >'
   + '<td class="text-center"><button id="btnDetailModule' + i + '" type="button" class="btn btn-primary btn-lg" width="100">V</button></td>' 
   +'<td  id="tdModuleName' + i + '" class="text-center">' + value.moduleName + '</td>'
   +'<td  id="tdProgest' + i + '" class="progressbar-center"><div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 50%; ">'
   +'10%   '                                 
   +'</div>'
   +'</td>'
   +'<td  id="tdDateStart' + i + '"class="text-center">'+value.dateStart+'</td>'
   +'<td id="tdDateEnd' + i + '"class="text-center">'+value.dateEnd+' </td>'
   //+'<td id="tdEmpCode' + i + '"class="text-center">'+value.empCode+'</td>' 
   + '</tr>'
   $('#ResualtSearch').append(text);
 });
};


function searchDataProgram() {
 var dataJsonData = {
  projectCode: "ก"
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
  project: "Mr.Son"
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

