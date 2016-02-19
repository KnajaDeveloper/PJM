//var paggination = Object.create(UtilPaggination);
var tableData;
$(document).ready(function(){
   tableData = $.ajax({
      headers: {
         Accept: "application/json"
     },
     type: "GET",
     url: contextPath + '/moduleprojects/findProjectBymoduleProjectAll',
     data : {},
     complete: function(xhr){

     },
     async: false
 });
    var addData = tableData.responseJSON;
     var text
  addData.forEach(function(value){
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
      +'<td class="text-center">'+value.arr_moduleManager+'</td>' 
      + '</tr>'
     $('#ResualtSearch').append(text);});

 });



 //paggination.setEventPaggingBtn("paggingSimple",paggination);
// paggination.loadTable = function loadTable (jsonData) {

//     if(jsonData.length <= 0)
//        bootbox.alert("ไม่พบข้อมูล");

//     $('#ResualtSearch').empty();
//     var link = "";
//     var i = 1;
//     var tableData = "";

//     jsonData.forEach(function(value){
//         tableData = ''
//   + '<tr style="background-color: #fff">'
//             + '<td>'
//          + '<div id="chkBox' + i + '" class="text-center">'
//             + '<input  id="chkDelete' + i + '" class="check" type="checkbox" name="chkdelete" />'
//          + '</div>'
//             + '</td>'
//             + '<td class="text-center">'
//             + '<button id="btnEdit' + i + '" type="button" class="btn btn-info" data-toggle="modal" data-target="#modalProgram" data-backdrop="static"><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
//             + '</td>'
//             + '<td id="tdProgramCode' + i + '" class="text-center">'
//             + value.code
//             + '</td>'
//             + '<td id="tdProgramName' + i++ + '" class="text-center">'
//             + value.name
//             + '</td>'
//         + '</tr>';

//         $('#ResualtSearch').append(
//             tableData
//         );
//     });
// };

// function searchData() {
//    var dataJsonData = {
//     programCode: "",
//   programName: ""
//     }

//     paggination.setOptionJsonData({
//        url:contextPath + "/programs/findPaggingData",
//        data:dataJsonData
//     });

//     paggination.setOptionJsonSize({
//         url:contextPath + "/programs/findPaggingSize",
//         data:dataJsonData
//     });

//     paggination.search(paggination);
// }











