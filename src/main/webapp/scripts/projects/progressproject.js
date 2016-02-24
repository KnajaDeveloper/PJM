var pagginationModule = Object.create(UtilPaggination);
pagginationModule.setEventPaggingBtn("paggingSimpleModuleProject",pagginationModule);
pagginationModule.loadTable = function loadTable (jsonData) {

    if(jsonData.length <= 0)
       bootbox.alert("ไม่พบข้อมูล");

    $('#ResualtSearchProgram').empty();
    var link = "";
    //var i = 1;
    var tableData = "";
  jsonData.forEach(function(value){ 
     text =  ''
     +'<tr >'
      + '<td class="text-center"><button type="button" class="btn btn-primary btn-lg" width="100">V</button></td>' 
       +'<td class="text-center">' + value.moduleName + '</td>'
       +'<td class="progressbar-center"><div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">'
       +'60%   '                                 
       +'</div>'
     +'</td>'
     +'<td class="text-center">'+value.dateStart+'</td>'
       +'<td class="text-center">'+value.dateEnd+' </td>'
       +'<td class="text-center">'+"5555"+'</td>' 
      + '</tr>'
      $('#ResualtSearch').append(text);
    });

 };

var labelData;
$(document).ready(function(){
   searchDataProgram();
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
  $('#lblCostsPoint').text(addData[0].projectCost);
  $('#lblStartDate').text(addData[0].dateStart);
  $('#lblCaretakerName').text(addData[0].projectCost);
  $('#lblBalanceCostsPoint').text(addData[0].projectCost);
  $('#lbldateEnd').text(addData[0].dateEnd);
 });

     // $('#lblProjectName').text(addData[0].projectName); 
     // $('#lblProjectCode').text(addData[0].projectCost); 
     // console.log(addData[0].projectCost);



 

// var pagginationModule = $.extend({},UtilPaggination);

// $(document).ready(function(){
//   searchDataProgram();
// });

// pagginationModule.setEventPaggingBtn("paggingSimpleProgram",pagginationModule);
// pagginationModule.loadTable = function loadTable (jsonData) {

//     if(jsonData.length <= 0)
//        bootbox.alert("ไม่พบข้อมูล");

//     $('#ResualtSearchProgram').empty();
//     var link = "";
//     var i = 1;
//     var tableData = "";

//     jsonData.forEach(function(value){
//         tableData = ''
//   + '<tr style="background-color: #fff">'
//             + '<td class="text-center">'
//             + '<button id="btnEditProgram' + i + '" type="button" class="btn btn-info" data-toggle="modal" data-target="#modalProgram" data-backdrop="static"><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
//             + '</td>'
//             + '<td id="tdProgramCode' + i + '" class="text-center">'
//             + value.code
//             + '</td>'
//             + '<td id="tdProgramName' + i++ + '" class="text-center">'
//             + value.name
//             + '</td>'
//         + '</tr>';

//         $('#ResualtSearchProgram').append(tableData);
//     });
// };

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