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
        var printDate = date.getDate() + "/" +
            (parseInt(date.getMonth()) + 1) + "/" +
            date.getFullYear();

        var empCode = $("#emp").val();
        var dateStart = $("#cDateBegin").val();
        var dateEnd = $("#cDateEnd").val();
        var plusYear = 0;

        if (dateStart != "") {
            dateStart = DateUtil.dataDateToDataBase(dateStart, _language);
            dateStart = DateUtil.dataDateToFrontend(dateStart, 'EN');
        }

        if (dateEnd != "") {
            dateEnd = DateUtil.dataDateToDataBase(dateEnd, _language);
            dateEnd = DateUtil.dataDateToFrontend(dateEnd, 'EN');
        }

        if (_language == "TH") {
            plusYear = 543;
            window.location.href = contextPath + '/reports/exportPJMRP01?empCode=' + empCode
                + '&dateStartBase=' + dateStart
                + '&dateEndBase=' + dateEnd
                + '&dateStart=' + dateStart
                + '&dateEnd=' + dateEnd
                + '&printDate=' + printDate
                + '&plusYear=' + plusYear;


        } else if (_language == "EN" || _language == 'EN_US') {
            plusYear = 0;
            window.location.href = contextPath + '/reports/exportPJMRP01?empCode=' + empCode
                + '&dateStartBase=' + dateStart
                + '&dateEndBase=' + dateEnd
                + '&dateStart=' + dateStart
                + '&dateEnd=' + dateEnd
                + '&printDate=' + printDate
                + '&plusYear=' + plusYear;
        }
    }
}
//--------------------------------------------------------------------------------
