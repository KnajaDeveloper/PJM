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
    var key = 1;

    jsonData.forEach(function (value) {

        tableData = ''

            + '<tr  style="background-color: #fff">'
            + '<td class="text-center">'
            + '<input id="chDelete' + key + '" class="check" type="checkbox" name="checkdDelete"  />'
            + '</td>'
            + '<td class="text-center">'
            + '<button id="btnEdit' + key + '" type="button" class="btn btn-info" data-toggle="modal" data-target="#ModalEdit" data-backdrop="static" ><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="tdTeamCode' + key + '" class="text-center" style="color: #000">'
            + value.teamCode
            + '</td>'
            + '<td id="tdTeamName' + key++ + '" class="text-center" style="color: #000">'
            + value.teamName
            + '</td>'
            + '</tr>';
        $('#ResualtSearch').append(
            tableData
        );

    });

};
function searchData() {

    var dataJsonData = {
        StDateBegin: $("#StDateBegin").val(),
        StDateEnd: $("#StDateEnd").val()
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