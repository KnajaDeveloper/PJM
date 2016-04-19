var _language = commonData.language;  // ค่าของ language อยู่ในไฟล์ common.js
var pagginationBackLog = $.extend({},UtilPaggination);

$(document).ready(function(){

    taskBacklogPlanTofirstPage();

});


function taskBacklogPlanTofirstPage() {
    var dataJsonData = {} ;
    pagginationBackLog.setOptionJsonData({
        url: contextPath + "/plans/selectPlanBaclLogTofirstPage",
        data: dataJsonData
    });
    pagginationBackLog.setOptionJsonSize({
        url: contextPath + "/plans/planPaggingSizeTaskBackLog",
        data: dataJsonData
    });
    pagginationBackLog.search(pagginationBackLog);
}  //--functionSearch--//



pagginationBackLog.setEventPaggingBtn("paggingSimple2", pagginationBackLog);
pagginationBackLog.loadTable = function loadTable(jsonData) {
    $('#ResualtSearchTaskBackLog').empty();
    var tableData = "";
    jsonData.forEach(function (value) {
        tableData = ''
            + '<tr>'
            + '<td id="taskCode' + value.id + '" class="text-center" style="color: #000">'
            + value.taskCode
            + '</td>'
            + '<td id="taskName' + value.id + '" class="text-left" style="color: #000">'
            + value.taskName
            + '</td>'
            + '<td id="dateStart' + value.id + '" class="text-center" style="color: #000">'
            + DateUtil.dataDateToFrontend(value.stDate, _language)
            + '</td>'
            + '<td id="dateEnd' + value.id + '" class="text-center" style="color: #000">'
            + DateUtil.dataDateToFrontend(value.enDate, _language)
            + '</td>'
            + '</tr>';
        $('#ResualtSearchTaskBackLog').append(
            tableData
        );

    });
}