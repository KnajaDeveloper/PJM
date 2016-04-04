var dateLang = checkLanguageDatePicker(_language);

$(document).ready(function (){
    $("#dateStartProject").datepicker(dateLang);
    $("#dateEndProject").datepicker(dateLang);

    $("#dateStartModule").datepicker(dateLang);
    $("#dateEndModule").datepicker(dateLang);

    $("#dateStartEditModule").datepicker(dateLang);
    $("#dateEndEditModule").datepicker(dateLang);

    $("#dateStartProject").on('change', function () {
        DateUtil.setMinDate('dateStartProject', 'dateEndProject');
        DateUtil.setMinDate('dateStartProject', 'dateStartModule');
        DateUtil.setMinDate('dateStartProject', 'dateEndModule');
        DateUtil.setMinDate('dateStartProject', 'dateStartEditModule');
        DateUtil.setMinDate('dateStartProject', 'dateEndEditModule');
    });
    $("#dateEndProject").on('change', function () {
        DateUtil.setMaxDate('dateEndProject', 'dateStartProject');
        DateUtil.setMaxDate('dateEndProject', 'dateStartModule');
        DateUtil.setMaxDate('dateEndProject', 'dateEndModule');
        DateUtil.setMaxDate('dateEndProject', 'dateStartEditModule');
        DateUtil.setMaxDate('dateEndProject', 'dateEndEditModule');
    });

    $("#dateStartModule").on('change', function () {
        DateUtil.setMinDate('dateStartModule', 'dateEndModule');
    });
});