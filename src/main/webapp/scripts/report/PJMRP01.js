var _language = commonData.language;  // ค่าของ language อยู่ในไฟล์ common.js
var dateLang = checkLanguageDatePicker(_language);

$("#cDateBegin").datepicker(dateLang);
$("#cDateEnd").datepicker(dateLang);

//--------------------------------------------------------------------------------

$("#spanBegin").click(function () {
    $("#cDateBegin").focus();
});

$("#spanEnd").click(function () {
    $("#cDateEnd").focus();
});

//--------------------------------------------------------------------------------

$("#cDateBegin").on('change', function () {
    checkDateFormat($(this), Message.Date_format_invalid, Message.PLEASE_SELECT_DATE);
    DateUtil.setMinDate('cDateBegin', 'cDateEnd');
});

$("#cDateEnd").on('change', function () {
    checkDateFormat($(this), Message.Date_format_invalid, Message.PLEASE_SELECT_DATE);
    DateUtil.setMaxDate('cDateEnd', 'cDateBegin');
});

//--------------------------------------------------------------------------------

$("#export").click(function () {

    sendData();
});

//--------------------------------------------------------------------------------
$('#cDateBegin').datepicker({
    format: 'mm/dd/yyyy',
    forceParse: false
});
//--------------------------------------------------------------------------------

function sendData() {
    if ($("#emp").val() == "") {

        $("#emp").attr("data-content", Message.PLEASE_INPUT).popover('show');
    } else if ($("#cDateBegin").val() == "") {

        $("#cDateBegin").attr("data-content", Message.PLEASE_SELECT_DATE).popover('show');
    } else if ($("#cDateEnd").val() == "") {

        $("#cDateEnd").attr("data-content", Message.PLEASE_SELECT_DATE).popover('show');
    } else {
        //ตรงกับ RequestParam value

        var date = new Date();


        var empCode = $("#emp").val();
        var dateStart = $("#cDateBegin").val();
        var dateEnd = $("#cDateEnd").val();
        var dateStartBase = $("#cDateBegin").val();
        var dateEndBase = $("#cDateEnd").val();
        var plusYear = 0;

        if (dateStartBase != "") {
            dateStartBase = DateUtil.dataDateToDataBase(dateStartBase, _language);
            dateStartBase = DateUtil.dataDateToFrontend(dateStartBase, 'EN');

        }

        if (dateEndBase != "") {
            dateEndBase = DateUtil.dataDateToDataBase(dateEndBase, _language);
            dateEndBase = DateUtil.dataDateToFrontend(dateEndBase, 'EN');
        }

        var dataJsonData = {
            empCode: $("#emp").val()
        };

        var responseResult = null;

        responseResult = $.ajax({
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            type: "GET",
            url: contextPath + '/reports/getEmpNameByEmpCodeAjex',
            data: dataJsonData,
            complete: function (xhr) {
                console.log(xhr);

            },
            async: false
        });

        checksize = jQuery.parseJSON(responseResult.responseText);

        console.log(checksize);

        if(checksize == 1){

            if (_language == "TH") {
                var printDate = date.getDate() + "/" +
                    (parseInt(date.getMonth()) + 1) + "/" +
                    (parseInt(date.getFullYear()) + 543 );
                plusYear = 543;
                window.location.href = contextPath + '/reports/exportPJMRP01?empCode=' + empCode
                    + '&dateStartBase=' + dateStartBase
                    + '&dateEndBase=' + dateEndBase
                    + '&dateStart=' + dateStart
                    + '&dateEnd=' + dateEnd
                    + '&printDate=' + printDate
                    + '&plusYear=' + plusYear;


            } else if (_language == "EN" || _language == 'EN_US') {
                var printDate = date.getDate() + "/" +
                    (parseInt(date.getMonth()) + 1) + "/" +
                    (parseInt(date.getFullYear()) + 0 );
                plusYear = 0;
                window.location.href = contextPath + '/reports/exportPJMRP01?empCode=' + empCode
                    + '&dateStartBase=' + dateStartBase
                    + '&dateEndBase=' + dateEndBase
                    + '&dateStart=' + dateStart
                    + '&dateEnd=' + dateEnd
                    + '&printDate=' + printDate
                    + '&plusYear=' + plusYear;
            }

        }else if(checksize == 0){
            bootbox.alert(Message.Data_not_found);
        }



    }
}
//--------------------------------------------------------------------------------
