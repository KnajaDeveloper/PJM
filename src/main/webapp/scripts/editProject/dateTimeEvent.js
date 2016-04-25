$(document).ready(function (){
    $("#dateStartProject").datepicker(dateLang);
    $("#dateEndProject").datepicker(dateLang);


    $("#dateStartModule").datepicker(dateLang);
    $("#dateEndModule").datepicker(dateLang);

    $("#dateStartEditModule").datepicker(dateLang);
    $("#dateEndEditModule").datepicker(dateLang);

    DateUtil.setMinDate('dateStartProject', 'dateEndProject');

    $("#dateStartModule").datepicker('option', 'minDate', $("#dateStartProject").val());
    $("#dateStartEditModule").datepicker('option', 'minDate', $("#dateStartProject").val());

    $("#dateEndModule").datepicker('option', 'minDate', $("#dateStartProject").val());
    DateUtil.setMinDate('dateStartProject', 'dateEndEditModule');

    DateUtil.setMaxDate('dateEndProject', 'dateStartProject');
    $("#dateStartModule").datepicker('option', 'maxDate', $("#dateEndProject").val());
    $("#dateStartEditModule").datepicker('option', 'maxDate', $("#dateEndProject").val());

    $("#dateEndModule").datepicker('option', 'maxDate', $("#dateEndProject").val());
    DateUtil.setMaxDate('dateEndProject', 'dateEndEditModule');

    $("#dateStartModule").datepicker('option', 'minDate', $("#dateStartProject").val());
    $("#dateStartModule").datepicker('option', 'maxDate', $("#dateEndProject").val());

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

    $("#dateStartModule").on('change', function () {
        DateUtil.setMaxDate('dateEndProject', 'dateEndModule');
        DateUtil.setMinDate('dateStartModule','dateEndModule');
        DateUtil.setMinDate('dateStartEditModule','dateEndEditModule');
    });

    $("#dateStartEditModule").on('change', function () {
        DateUtil.setMinDate('dateStartEditModule','dateEndEditModule');
    });
});