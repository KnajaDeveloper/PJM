var _language = commonData.language;
var dateLang = checkLanguageDatePicker(_language);
    
$(document).ready(function (){   
    $("#dateStartProject").datepicker(dateLang);
    $("#dateEndProject").datepicker(dateLang);

    $("#dateStartProject").on('change', function () {
        DateUtil.setMinDate('dateStartProject', 'dateEndProject');
        $("#dateStartModule").datepicker('option', 'minDate', $("#dateStartProject").val());
        $("#dateStartEditModule").datepicker('option', 'minDate', $("#dateStartProject").val());

        $("#dateEndModule").datepicker('option', 'minDate', $("#dateStartProject").val());
        $("#dateEndEditModule").datepicker('option', 'minDate', $("#dateStartProject").val());
    });
    $("#dateEndProject").on('change', function () {
        DateUtil.setMaxDate('dateEndProject', 'dateStartProject');
         $("#dateStartModule").datepicker('option', 'maxDate', $("#dateEndProject").val());
         $("#dateStartEditModule").datepicker('option', 'maxDate', $("#dateEndProject").val());

         $("#dateEndModule").datepicker('option', 'maxDate', $("#dateEndProject").val());
         $("#dateEndEditModule").datepicker('option', 'maxDate', $("#dateEndProject").val());
    });

    $("#dateStartModule").datepicker(dateLang);
    $("#dateEndModule").datepicker(dateLang);

    $("#dateStartEditModule").datepicker(dateLang);
    $("#dateEndEditModule").datepicker(dateLang);
});