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
            (parseInt(date.getMonth())+1) + "/" +
            date.getFullYear();

        var empCode = $("#emp").val();
        var dateStart = $("#cDateBegin").val();
        var dateEnd = $("#cDateEnd").val();
        var plusYear = 0;


        if (_language == "TH"){
            plusYear = 543;
            window.location.href = contextPath + '/reports/exportPJMRP01?empCode=' + empCode
                + '&dateStartBase=' + convertdataDate(dateStart)
                + '&dateEndBase=' + convertdataDate(dateEnd)
                + '&dateStart=' + dateStart
                + '&dateEnd=' + dateEnd
                + '&printDate=' + printDate
                + '&plusYear='+ plusYear;



        }else if(_language == "EN" ||_language=='EN_US'){
            plusYear = 0;
            window.location.href = contextPath + '/reports/exportPJMRP01?empCode=' + empCode
                + '&dateStartBase=' + convertdataDate(dateStart)
                + '&dateEndBase=' + convertdataDate(dateEnd)
                + '&dateStart=' + dateStart
                + '&dateEnd=' + dateEnd
                + '&printDate=' + printDate
                + '&plusYear='+ plusYear;
        }




    }
    function  convertdataDate(date){
        var splitDate =date.split('/');
        var dateresult="";
        if(_language=='EN'||_language=='EN_US'){
            dateresult = splitDate[0]+"/"+splitDate[1] +"/"+ splitDate[2];
        }else if(_language=='TH'){
            dateresult =  splitDate[0]+"/"+ splitDate[1]+"/"+ (parseInt(splitDate[2])-543);
        }

        return dateresult;

    }
}

