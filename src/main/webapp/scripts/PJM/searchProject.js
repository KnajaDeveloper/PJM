var _language = commonData.language;  // ค่าของ language อยู่ในไฟล์ common.js
var dateLang = checkLanguageDatePicker(_language);
var _language2 = commonData.language;
var dateLang2 = checkLanguageDatePicker(_language2);
var paggination = Object.create(UtilPaggination);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#StDateBegin").datepicker(dateLang);
$("#StDateEnd").datepicker(dateLang);
$("#StDateBegin").on('change', function(){
    DateUtil.setMinDate('StDateBegin', 'StDateEnd');
});
$("#StDateEnd").on('change', function(){
    DateUtil.setMaxDate('StDateEnd', 'StDateBegin');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#FnDateBegin").datepicker(dateLang2);
$("#FnDateEnd").datepicker(dateLang2);
$("#FnDateBegin").on('change', function(){
    DateUtil.setMinDate('FnDateBegin', 'FnDateEnd');
});
$("#FnDateEnd").on('change', function(){
    DateUtil.setMaxDate('FnDateEnd', 'FnDateBegin');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#search").click(function(){
   searchData();
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#addProject").click(function () {
    window.location.href= contextPath + '/projects/createproject';
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
paggination.setEventPaggingBtn("paggingSimple", paggination);
paggination.loadTable = function loadTable(jsonData) {

    if (jsonData.length <= 0) {

    }

    $('#ResualtSearch').empty();

    var tableData = "";

    jsonData.forEach(function (value) {

        tableData = ''

            + '<tr  style="background-color: #fff">'
            + '<td class="text-center">'
            + ' <input id="checkAll" class="check" type="checkbox"/>'
            + '</td>'
            + '<td class="text-center">'
            + '<button class="btn btn-info" type="button">E</button>'
            + '</td>'
            + '<td class="text-center">'
            + '<button class="btn btn-info" type="button">A</button>'
            + '</td>'
            + '<td class="text-center">'
            + '<button class="btn btn-info" type="button">V</button>'
            + '</td>'
            + '<td id="tdTeamCode' + key + '" class="text-center" style="color: #000">'
            + value.projectName
            + '</td>'
            + '<td id="tdTeamName' + key++ + '" class="text-center" style="color: #000">'
            + value.dateStart
            + '</td>'
            + '<td id="tdTeamName' + key++ + '" class="text-center" style="color: #000">'
            + value.dateEnd
            + '</td>'
            + '<td id="tdTeamName' + key++ + '" class="text-center" style="color: #000">'
            + value.projectCost
            + '</td>'
            + '</tr>';
        $('#ResualtSearch').append(
            tableData
        );

    });

};
function searchData() {
    var convertFormatDateStart = new Date(convertDate($('#StDateBegin').val()));
    var convertFormatDateEnd = new Date(convertDate($('#StDateEnd').val()));
    var dataJsonData = {
        StDateBegin: convertFormatDateStart,
        StDateEnd  :convertFormatDateEnd
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

function convertDate(input){
    var x = input.split('/');
    return ""+x[1]+"/"+x[0]+"/"+x[2];
}
