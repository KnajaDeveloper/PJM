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
$(document).ready(function () {

    var ddlTeam;
    ddlTeam = $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        type: "GET",
        url: contextPath + '/central/findTeamAll',
        data: {},
        complete: function (xhr) {
        },
        async: false
    });

    var addData = ddlTeam.responseJSON;
    $('#ddlTeam').empty();
    $('#ddlTeam').append("<option></option>");
    addData.forEach(function (value) {
        var text = value.teamName;
        $('#ddlTeam').append("<option value=" + value.id + ">" + text + "</option>");
    });

});

//--------------------------------------------------------------------------------
$("#ddlTeam").change(function () {
    $("#lovEmpFrom").val("");
    $("#lovEmpTo").val("");
});
//--------------------------------------------------------------------------------

function sendData() {

    if (($("#lovEmpFrom").data("dataCode") > $("#lovEmpTo").data("dataCode")) && $("#lovEmpTo").val() != "") {

        bootbox.alert(Message.M_Please_Employee_Code_ascending);
    } else if ($("#cDateBegin").val() == "") {

        $("#cDateBegin").attr("data-content", Message.PLEASE_SELECT_DATE).popover('show');
    } else if ($("#cDateEnd").val() == "") {

        $("#cDateEnd").attr("data-content", Message.PLEASE_SELECT_DATE).popover('show');
    } else {
        //ตรงกับ RequestParam value

        var date = new Date();

        var team;
        var teamCheck = "C";
        if ($("#ddlTeam").val() != "") {
            team = $("#ddlTeam").find('option:selected').text();
        } else {
            team = Message.L_All;
            teamCheck = "";
        }

        var teamBase = $("#ddlTeam").find('option:selected').val();

        var empCodeFrom;
        var empCodeFromCheck = "C";
        if ($("#lovEmpFrom").val() != "") {
            empCodeFrom = $("#lovEmpFrom").data("dataCode");
        } else {
            empCodeFrom = Message.L_All;
            empCodeFromCheck = "";
        }

        var empCodeTo;
        var empCodeToCheck = "C";
        if ($("#lovEmpTo").val() != "") {
            empCodeTo = $("#lovEmpTo").data("dataCode");
        } else {
            empCodeTo = Message.L_All;
            empCodeToCheck = "";
        }

        var dateStart = $("#cDateBegin").val();
        var dateEnd = $("#cDateEnd").val();
        var dateStartBase = $("#cDateBegin").val();
        var dateEndBase = $("#cDateEnd").val();
        var plusYear = 0;
        console.log(team);
        console.log(teamBase);
        console.log(empCodeFrom);
        console.log(empCodeTo);

        if (dateStartBase != "") {
            dateStartBase = DateUtil.dataDateToDataBase(dateStartBase, _language);
            dateStartBase = DateUtil.dataDateToFrontend(dateStartBase, 'EN');

        }

        if (dateEndBase != "") {
            dateEndBase = DateUtil.dataDateToDataBase(dateEndBase, _language);
            dateEndBase = DateUtil.dataDateToFrontend(dateEndBase, 'EN');
        }

        var datalovEmpFrom = {
            empCodeFrom: $("#lovEmpFrom").data("dataCode")
        }

        if ($("#lovEmpFrom").val() != "") {
            var responseResult = null;


            responseResult = $.ajax({
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                type: "GET",
                url: contextPath + '/reports/getEmpNameByEmpCodeAjex',
                data: datalovEmpFrom,
                complete: function (xhr) {
                    console.log(xhr);

                },
                async: false
            });

            checksize = jQuery.parseJSON(responseResult.responseText);

            console.log(checksize);

            if (checksize == 1) {

                if (_language == "TH") {
                    var printDate = date.getDate() + "/" +
                        (parseInt(date.getMonth()) + 1) + "/" +
                        (parseInt(date.getFullYear()) + 543 );
                    plusYear = 543;
                    window.location.href = contextPath + '/reports/exportPJMRP01?empCodeFrom=' + empCodeFrom
                        + '&empCodeFromCheck=' + empCodeFromCheck
                        + '&empCodeTo=' + empCodeTo
                        + '&empCodeToCheck=' + empCodeToCheck
                        + '&team=' + team
                        + '&teamCheck=' + teamCheck
                        + '&teamBase=' + teamBase
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
                    window.location.href = contextPath + '/reports/exportPJMRP01?empCode=' + empCodeFrom
                        + '&empCodeFromCheck=' + empCodeFromCheck
                        + '&empCodeTo=' + empCodeTo
                        + '&empCodeToCheck=' + empCodeToCheck
                        + '&team=' + team
                        + '&teamCheck=' + teamCheck
                        + '&teamBase=' + teamBase
                        + '&dateStartBase=' + dateStartBase
                        + '&dateEndBase=' + dateEndBase
                        + '&dateStart=' + dateStart
                        + '&dateEnd=' + dateEnd
                        + '&printDate=' + printDate
                        + '&plusYear=' + plusYear;
                }

            } else if (checksize == 0) {


                var datalovEmpTo = {
                    empCodeFrom: $("#lovEmpTo").data("dataCode")
                }

                if ($("#lovEmpTo").val() != "") {
                    var responseResult = null;


                    responseResult = $.ajax({
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        headers: {
                            Accept: "application/json"
                        },
                        type: "GET",
                        url: contextPath + '/reports/getEmpNameByEmpCodeAjex',
                        data: datalovEmpTo,
                        complete: function (xhr) {
                            console.log(xhr);

                        },
                        async: false
                    });
                    if (checksize == 0) {
                        bootbox.alert(Message.Data_not_found);
                    }
                }else {
                    bootbox.alert(Message.Data_not_found);
                }
            }
        } else {
            if (_language == "TH") {
                var printDate = date.getDate() + "/" +
                    (parseInt(date.getMonth()) + 1) + "/" +
                    (parseInt(date.getFullYear()) + 543 );
                plusYear = 543;
                window.location.href = contextPath + '/reports/exportPJMRP01?empCodeFrom=' + empCodeFrom
                    + '&empCodeFromCheck=' + empCodeFromCheck
                    + '&empCodeTo=' + empCodeTo
                    + '&empCodeToCheck=' + empCodeToCheck
                    + '&team=' + team
                    + '&teamCheck=' + teamCheck
                    + '&teamBase=' + teamBase
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
                window.location.href = contextPath + '/reports/exportPJMRP01?empCode=' + empCodeFrom
                    + '&empCodeFromCheck=' + empCodeFromCheck
                    + '&empCodeTo=' + empCodeTo
                    + '&empCodeToCheck=' + empCodeToCheck
                    + '&team=' + team
                    + '&teamCheck=' + teamCheck
                    + '&teamBase=' + teamBase
                    + '&dateStartBase=' + dateStartBase
                    + '&dateEndBase=' + dateEndBase
                    + '&dateStart=' + dateStart
                    + '&dateEnd=' + dateEnd
                    + '&printDate=' + printDate
                    + '&plusYear=' + plusYear;
            }
        }


    }

}
//--------------------------------------------------------------------------------

