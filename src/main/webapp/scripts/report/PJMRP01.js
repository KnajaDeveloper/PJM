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
    DateUtil.setMinDate('cDateBegin', 'cDateEnd');
});

$("#cDateEnd").on('change', function () {
    DateUtil.setMaxDate('cDateEnd', 'cDateBegin');
});

//--------------------------------------------------------------------------------

$("#export").click(function () {

    sendData();
});

//--------------------------------------------------------------------------------

function sendData() {
    if ($("#emp").val() == "") {

        $("#emp").attr("data-content", "กรุณากรอกข้อมูล").popover('show');
    } else if ($("#cDateBegin").val() == "") {

        $("#cDateBegin").attr("data-content", "กรุณาเลือกวันที่").popover('show');
    } else if ($("#cDateEnd").val() == "") {

        $("#cDateEnd").attr("data-content", "กรุณาเลือกวันที่").popover('show');
    } else {
        //ตรงกับ RequestParam value

        var date = new Date();
        var printDate = date.getDate() + "/" +
            (parseInt(date.getMonth())+1) + "/" +
            date.getFullYear();

        var empCode = $("#emp").val();
        var dateStart = $("#cDateBegin").val();
        var dateEnd = $("#cDateEnd").val();
        var plusYear = 0;


        if (_language == "TH"){
            plusYear = 543;
            window.location.href = contextPath + '/reports/exportPJMRP01?empCode=' + empCode
                + '&dateStart=' + dateStart
                + '&dateEnd=' + dateEnd
                + '&printDate=' + printDate
                + '&plusYear='+ plusYear;

        }else if(_language == "EN"){
            plusYear = 0;
            window.location.href = contextPath + '/reports/exportPJMRP01?empCode=' + empCode
                + '&dateStart=' + dateStart
                + '&dateEnd=' + dateEnd
                + '&printDate=' + printDate
                + '&plusYear='+ plusYear;
        }




    }
}

