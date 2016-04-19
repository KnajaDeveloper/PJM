var _language = commonData.language;  // ค่าของ language อยู่ในไฟล์ common.js
var paggination = $.extend({},UtilPaggination);
$(document).ready(function(){

    taskTodayPlanTofirstPage();

});


function taskTodayPlanTofirstPage() {
    var dataJsonData = {} ;
    paggination.setOptionJsonData({
        url: contextPath + "/plans/selectPlanTofirstPage",
        data: dataJsonData
    });
    paggination.setOptionJsonSize({
        url: contextPath + "/plans/planPaggingSize",
        data: dataJsonData
    });
    paggination.search(paggination);
}  //--functionSearch--//




    paggination.setEventPaggingBtn("paggingSimple", paggination);
    paggination.loadTable = function loadTable(jsonData) {
        $('#ResualtSearchTaskToday').empty();
        var tableData1 = "";
        jsonData.forEach(function (value) {
            tableData1 = ''
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
            $('#ResualtSearchTaskToday').append(
                tableData1
            );

        });
    }



