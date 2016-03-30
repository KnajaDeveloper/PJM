var _language = commonData.language;
var dateLang = checkLanguageDatePicker(_language);

    
$(document).ready(function (){
    $("#dateStart").datepicker(dateLang);
    $("#dateEnd").datepicker(dateLang);

    $("#dateStart").on('change', function () {
        DateUtil.setMinDate('dateStart', 'dateEnd');
    });
    $("#dateEnd").on('change', function () {
        DateUtil.setMaxDate('dateEnd', 'dateStart');
    });
});