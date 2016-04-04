/**
 * On page ready function
 */
$(document).ready(function () {

    // When Focus Element Popover Destroy
    $('*').focus(function () {
        $(this).popover('destroy');
    });

    $( ".datetimepicker").datetimepicker({
            changeMonth: false,
            changeYear: true,
            showButtonPanel: true,
            dateFormat: 'dd/mm/yy',
            isBE: true,
            autoConversionField: true
            });
            
    $( ".datepicker").datetimepicker({
                changeMonth: false,
                changeYear: true,
                showButtonPanel: true,
                dateFormat: 'dd/mm/yy',
                isBE: true,
                autoConversionField: true
        });

    $( ".datepicker" ).datepicker( "option", "yearRange", '1950:2050' );

});
/**
 * AJAX Loading ################################################################
 * **/
$( document).ajaxStart(function() {
    NProgress.start();
    $('#wait').show();
});
$(document).ajaxComplete(function(){
    NProgress.done();
    //$('#wait').hide();
    //setTimeout(function (){$('#wait').hide();},5000);

});
/**
 * ## Ajax Pattern ##########################################################################################
 */

/**
 * Ajax Pattern
 * Merge defaults and options, without modifying defaults
 * @default {POST} type
 */
var ajaxPattern = {
    type: 'POST',
    url: '',
//    statusCode: {
//        200: function () {
//            console.log('HttpStatus.OK');
//        },
//        401: function () {
//            console.log('HttpStatus.UNAUTHORIZED');
//        },
//        404: function () {
//            console.log('HttpStatus.NOT_FOUND');
//        },
//        500: function () {
//            console.log('HttpStatus.INTERNAL_SERVER_ERROR');
//        }
//    },
    async: false,
    data: '',
    beforeSend: function() {
        $('.dv-background').show();
    },
    afterSend: function() {
        $('.dv-background').hide();
    }
};

/**
 * ## General Function ######################################################################################
 */

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d:    d,
                dd:   pad(d),
                ddd:  dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m:    m + 1,
                mm:   pad(m + 1),
                mmm:  dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy:   String(y).slice(2),
                yyyy: y,
                h:    H % 12 || 12,
                hh:   pad(H % 12 || 12),
                H:    H,
                HH:   pad(H),
                M:    M,
                MM:   pad(M),
                s:    s,
                ss:   pad(s),
                l:    pad(L, 3),
                L:    pad(L > 99 ? Math.round(L / 10) : L),
                t:    H < 12 ? "a"  : "p",
                tt:   H < 12 ? "am" : "pm",
                T:    H < 12 ? "A"  : "P",
                TT:   H < 12 ? "AM" : "PM",
                Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default":      "ddd mmm dd yyyy HH:MM:ss",
    shortDate:      "m/d/yy",
    mediumDate:     "mmm d, yyyy",
    longDate:       "mmmm d, yyyy",
    fullDate:       "dddd, mmmm d, yyyy",
    shortTime:      "h:MM TT",
    mediumTime:     "h:MM:ss TT",
    longTime:       "h:MM:ss TT Z",
    isoDate:        "yyyy-mm-dd",
    isoTime:        "HH:MM:ss",
    isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

/**
 * Convert Date To Date For Url
 * @deprecated
 * @param date
 * @returns {string}
 * @examples
 *  commonConvertDateStringToDateUrl('10/12/2014');      // 10-12-2014
 *  commonConvertDateStringToDateUrl('09/01/2015');      // 09-01-2015
 */
function commonConvertDateStringToDateUrl(date) {
    return date.split('/').join('-');
}

/**
 * Get parameter value from URL
 * @param {String} param
 * @returns {String} commonGetParameterValueFromUrlByName
 */
function commonGetParameterValueFromUrlByName(param) {
    param = param.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + param + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * String Padding (default padding 0)
 * @param {String, Number} str
 * @param {Number} width
 * @param {String} pad
 * @returns {String} commonStringPadding
 * @examples
 *  commonStringPadding(10, 4);      // 0010
 *  commonStringPadding(9, 4);       // 0009
 *  commonStringPadding(123, 4);     // 0123
 *  commonStringPadding(10, 4, '-'); // --10
 */
function commonStringPadding(str, width, pad) {
    pad = pad || '0';
    str = str + '';
    return str.length >= width ? str : new Array(width - str.length + 1).join(pad) + str;
}

/**
 * Redirect page to specify url
 * @param {String} url
 * @returns {Page} commonRedirectPageToUrl
 */
function commonRedirectPageToUrl(url) {
    window.location.replace(url);
}

/**
 * Redirect page to specify language
 * @param {String} language
 * @returns {Page} commonChangeLanguage
 */
function commonChangeLanguage(language) {
    var url = window.location.href;
    if (url.indexOf("lang=") >= 0) {
        var prefix = url.substring(0, url.indexOf("lang"));
        var suffix = url.substring(url.indexOf("lang")).substring(url.indexOf("=") + 1);
        suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
        url = prefix + "lang=" + language + suffix;
    } else {
        if (url.indexOf("?") < 0)
            url += "?" + "lang=" + language;
        else
            url += "&" + "lang=" + language;
    }
    window.location.href = url;
}

/**
 * Window Popup Document Payslip
 * @param {String} type
 * @param {Number} month
 * @param {Number} year
 * @param {String} language
 * @param {String} period
 * @returns {String} commonWindowPopupPaySlip
 */
function commonWindowPopupPaySlip(type, month, year, language, period) {
    var fileExtension = 'pdf';
    var url = session['context'] + '/paysliprequests?popup=&type=' + type + '&zone=' + period + '&month=' + month + '&year=' + year + '&language=' + language;
    var properties;
    var positionX = 20;
    var positionY = 20;
    var width = 800;
    var height = 120;
    // center screen
    //positionX = (screen.width)?(screen.width-windowWidth)/2:100;
    //positionY = (screen.height)?(screen.height-windowHeight)/2:100;
    //properties = "width=" + windowWidth + ", height=" + windowHeight;
    properties = "width=" + width + ", height=" + height;
    properties += ", toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no";
    properties += ", top=" + positionY + ", left=" + positionX;
    window.open(url, '', properties);
}

/**
 * Window Popup Leave Reference Document
 * @param {Number} id
 */
function commonWindowPopupLeaveReference(id) {
    var url = session['context'] + '/leaverequests/bs/' + id + '?popup=';
    var properties;
    var positionX = 20;
    var positionY = 20;
    var width = 800;
    var height = 600;
    properties = "width=" + width + ", height=" + height;
    properties += ", toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no";
    properties += ", top=" + positionY + ", left=" + positionX;
    window.open(url, '', properties);
}

/**
 * Window Popup User Manual
 * @param {String} module
 */
function commonWindowPopupUserManual(module) {
    var url = session['context'] + '/common/json/doc/manual?module=' + module;
    var properties;
    var positionX = 20;
    var positionY = 20;
    var width = 800;
    var height = 600;
    properties = "width=" + width + ", height=" + height;
    properties += ", toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no";
    properties += ", top=" + positionY + ", left=" + positionX;
    window.open(url, '', properties);
}

/**
 * Validate Password With Regular Expression
 * at least one number, one lowercase and one uppercase letter
 * at eight characters that are letters, numbers or the underscore
 * @param {String} pass
 * @returns {Boolean} commonValidatePassword
 */
function commonValidatePassword(pass) {
    // at least one number, one lowercase and one uppercase letter
    // at eight characters that are letters, numbers or the underscore
    // var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,8}$/;

    var reg = /^[^\W_]{8,}$/;
    return reg.test(pass);
}

/**
 * Validate New Password Field With Feedback
 * @param {Boolean} input_group
 * @param {String} new_pass
 * @param {String} conf_pass
 */
function commonValidatePasswordWithFeedback(input_group, new_pass, conf_pass) {
    // Validate New Password
    if (typeof $(new_pass) !== "undefined") {
        var np_dv_feedback = $(new_pass).parent().parent();
        var np_sp_suc = $(new_pass).parent().children('.glyphicon-ok');
        var np_sp_err = $(new_pass).parent().children('.glyphicon-remove');
        if (input_group) {
            np_dv_feedback = $(new_pass).parent().parent().parent();
            np_sp_suc = $(new_pass).parent().parent().children('.glyphicon-ok');
            np_sp_err = $(new_pass).parent().parent().children('.glyphicon-remove');
        }
        if (commonValidatePassword($(new_pass).val())) {
            np_sp_suc.removeClass('sr-only');
            np_sp_err.addClass('sr-only');
            np_dv_feedback.removeClass('has-error');
            np_dv_feedback.addClass('has-success');
        } else {
            np_sp_suc.addClass('sr-only');
            np_sp_err.removeClass('sr-only');
            np_dv_feedback.removeClass('has-success');
            np_dv_feedback.addClass('has-error');
        }
    }
    // Validate Confirm Password
    if (typeof $(new_pass) !== "undefined" && typeof $(conf_pass) !== "undefined") {
        var cp_dv_feedback = $(conf_pass).parent().parent();
        var cp_sp_suc = $(conf_pass).parent().children('.glyphicon-ok');
        var cp_sp_err = $(conf_pass).parent().children('.glyphicon-remove');
        if ($(new_pass).val() == $(conf_pass).val() && $(conf_pass).val() !== "") {
            cp_sp_suc.removeClass('sr-only');
            cp_sp_err.addClass('sr-only');
            cp_dv_feedback.removeClass('has-error');
            cp_dv_feedback.addClass('has-success');
        } else {
            cp_sp_suc.addClass('sr-only');
            cp_sp_err.removeClass('sr-only');
            cp_dv_feedback.removeClass('has-success');
            cp_dv_feedback.addClass('has-error');
        }
    }
}

function commonConvertMinuteToDateFormat(minutes) {
    return "15:00:00";
}

/**
 * ## Ajax Function #########################################################################################
 */

/**
 * Ajax Get Shift By Shift Date Equal
 * @param {String} date (format: DD/MM/YYYY)
 * @returns {*}
 */
function commonAjaxGetShiftByShiftDateEquals(date) {
    var options = {
        url: session['context'] + '/common/json/shift/date',
        data : {
            date: date
        }};
    var settings = $.extend({}, ajaxPattern, options);
    return JSON.parse($.ajax(settings).responseText);
}

/**
 * Ajax Get TimeAttendance By Date Equal
 * @param {String} date (format: DD/MM/YYYY)
 * @returns {*}
 */
function commonAjaxGetTimeAttendanceByDateEquals(date) {
    var options = {
        url: session['context'] + '/common/json/timeattendance',
        data : {
            date: date
        }};
    var settings = $.extend({}, ajaxPattern, options);
    return JSON.parse($.ajax(settings).responseText);
}

function commonAjaxGetShiftByUserEqualsAndShiftCodeLike(user, search) {
    var fList = [];
    var options = {
        url: encodeURI(session['context'] + '/common/json/shift/all'),
        data: {
            user: user
        },
        success: function (data, status, jqXHR) {
            if (data != '') {
                $.each(data, function (key, value) {
                    var empData = value.shiftCode + ' - ' + (session['lang']=='TH'?value.shiftDescriptionThai:value.shiftDescriptionEnglish);
                    fList.push(empData);
                });
            } else {
                alert('Employee not found');
            }
        },
        error: function (){
            alert('Time out, please contact admin');
        }};
    var settings = $.extend({}, ajaxPattern, options);
    $.ajax(settings);
    return fList;
}

function commonAjaxGetOtherByUserEquals(search) {
    var fList = [];
    var options = {
        url: encodeURI(session['context'] + '/common/json/other'),
        data: {
            user: session['user'],
            search: search
        },
        success: function (data, status, jqXHR) {
            if (data != '') {
                $.each(data, function (key, value) {
                    var empData = value.id + ' - ' + (session['lang']=='TH'?value.nameThai:value.nameEng);
                    fList.push(empData);
                });
            } else {
                alert('Employee not found');
            }
        },
        error: function (){
            alert('Time out, please contact admin');
        }};
    var settings = $.extend({}, ajaxPattern, options);
    $.ajax(settings);
    return fList;
}

/**
 * Ajax Get Subordinate By Name Like
 * @param {String} search
 * @returns {Array}
 */
function commonAjaxGetSubordinateByNameLike(search) {
    var fList = [];
    var options = {
        url: session['context'] + '/common/json/subordinate',
        data: {
            search: search==''?'%':search
        },
        success: function (data, status, jqXHR) {
            if (data != '') {
                $.each(data, function (key, value) {
                    var empData = value.id + '-' + value.userName + '-' + (session['lang']=='TH'?value.nameThai:value.nameEng);
                    fList.push(empData);
                });
            } else {
                alert('Employee not found');
            }
        },
        error: function (){
            alert('Time out, please contact admin');
        }};
    var settings = $.extend({}, ajaxPattern, options);
    $.ajax(settings);
    return fList;
}

/**
 * ## Method Function #######################################################################################
 */

/**
 * Remove class "sr-only" and fade in element
 * @param {Number} time
 */
$.fn.commonShowElement = function (time) {
    if (typeof time !== "undefined") {
        time = 1000
    }
    this.each(function () {
        $(this).hide().removeClass("sr-only").fadeIn(time);
    });
};

/**
 * Add class "sr-only" and fade out element
 * @param {Number} time
 */
$.fn.commonHideElement = function (time) {
    if (typeof time !== "undefined") {
        time = 1000
    }
    this.each(function () {
        $(this).show().fadeOut(time, function () {
            $(this).addClass("sr-only")
        });
    });
};

/**
 * Render Full Calendar
 * @param {String} lang
 * @param {Number} height
 * @param {Boolean} detail
 */
$.fn.commonRenderCalendar = function (lang, height, detail) {
    if (lang == 'TH') {
        $(this).fullCalendar({
            height: height,
            buttonText: {
                today: "วันนี้"
            },
            monthNames: [
                "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
                "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
                "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
            ],
            dayNamesShort: [
                "อา.", "จ.", "อ.", "พ.",
                "พฤ.", "ศ.", "ส."
            ]
        });

    } else {
        $(this).fullCalendar({
            height: height
        });
    }

    if (detail) {
        var str = '<div style="text-align: right;">' +
            '<span class="label label-info">Today</span>' +
            '<span>&#160;|&#160;</span>' +
            '<span class="label label-success">Success</span>' +
            '<span>&#160;|&#160;</span>' +
            '<span class="label label-danger">Danger</span>' +
            '<span>&#160;|&#160;</span>' +
            '<span class="label label-warning">Warning</span>' +
            '</div>';
        $(this).append(str);
    }
};

/**
 * Render Google Map
 * @param {Double} latitude
 * @param {Double} longitudes
 * @param {Number} zoom
 * @param {String} title
 */
$.fn.commonRenderGoogleMap = function (latitude, longitudes, zoom, title) {
    this.each(function () {
        var myLocation = new google.maps.LatLng(latitude, longitudes);
        var mapOptions = {
            center: myLocation,
            zoom: zoom
        };
        var marker = new google.maps.Marker({
            position: myLocation,
            title: title
        });
        var map = new google.maps.Map(this, mapOptions);
        marker.setMap(map);
    });
};

/**
 * Render Employee Subordinate
 * @deprecated
 * @returns {List} commonRenderSubordinate
 */
$.fn.commonRenderSubordinate = function () {
    var input = $(this).parent().parent().children('input[type=text]');
    var fList = [];
    var url = encodeURI(session['context'] + '/common/json/subordinate?search=' + (input.val()==''?'%':input.val()));

    $.ajax({
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status, jqXHR) {
            if (data != '') {
                $.each(data, function (key, value) {
                    var empData = {
                        id: value.id,
                        value: value.id + ' - ' + value.nameThai,
                        label: value.id + ' - ' + value.nameThai
                    };
                    fList.push(empData);
                });
            } else {
                alert('Employee not found');
            }
        },
        error: function (){
            alert('Time out, please contact admin');
        }
    });

    input.autocomplete({
        source: fList,
        minLength: 1000,
        close: function (event, ui) {
            input.autocomplete("option", "minLength", 1000);
        }
    });
    input.autocomplete("option", "minLength", 0);
    input.autocomplete("search", $(this).val());
};

/**
 * Generate Password
 * @param {String} prefix
 * @param {String} postfix
 * @param {Number} width
 * @returns {String}
 */
$.fn.commonGeneratePassword = function (prefix, postfix, width) {
    this.each(function () {
        var field = $(this).parent().parent().children('input[type=text]');
        var min = 0;
        var max = new Array(width + 1).join('9');
        var pass = prefix + commonStringPadding(Math.floor((Math.random() * max) + min), width, '0') + postfix;
        field.val(pass);
    });
};

/**
 * Add Days
 * @param {Number} days
 * @returns {Date}
 */
Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
    return this;
};
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};
Array.prototype.clear = function() {
    this.length = 0;
    return this;
}

/**
 * Convert string to date object
 * @examples
 *  "15/01/2014 08:30".toDate();      // Wed Jan 15 2014 08:30:00 GMT+0700 (SE Asia Standard Time)
 *  "01/12/2014 12:00".toDate();      // Mon Dec 01 2014 12:00:00 GMT+0700 (SE Asia Standard Time)
 * @returns {Date}
 */
String.prototype.toDate = function() {
    var pattern = /(\d{2})\/(\d{2})\/(\d{4})\s(\d{2})/;
    return new Date(this.replace(pattern,'$3-$2-$1T$4'));
};

/**
  *calculateDateDiff
  * return example 1/1/1
  */
function calculatedate(date){

        var today = session['time'].format('dd/mm/yyyy');
        var todaysprit = today.split('/');
        var countingWork = date;
        var countingWorksprit = countingWork.split('/');
        var date1 = new Date(parseInt(countingWorksprit[2]),parseInt(countingWorksprit[1]),parseInt(countingWorksprit[0]));
        var date2 = new Date(parseInt(todaysprit[2]),parseInt(todaysprit[1]),parseInt(todaysprit[0]));
        var diff = new Date(date2.getTime() - date1.getTime());
        var diffyear = diff.getUTCFullYear() - 1970;
        var diffmonth = diff.getUTCMonth();
        var diffdate = diff.getUTCDate() - 1;

        var diffday = diffyear+'/'+diffmonth+'/'+diffdate;

        return diffday;

}

/**
 * ## datePicker Pattern 
 */

var datePickerPattern = {
    isBE: '',
    autoConversionField: '',
    dateFormat :'dd/mm/yy'
};

/**
 * ## Check Language DatePicker 
 */

function checkLanguageDatePicker (language){

var isBE = "";
var autoConversionField = "";
var options={};
var settings="";

    if(language=='EN'||language=='EN_US'){
        options={
            isBE: false,
            autoConversionField: false,
        }
    settings = $.extend({},$.datepicker.regional['en'], datePickerPattern, options );   
    }if(language=='TH'){
        options={
            isBE: true,
            autoConversionField: true,
        }
    settings = $.extend({},$.datepicker.regional['th'], datePickerPattern, options );       
    }
    return settings;
}

/**
 * ## Data Date to DataBase 
 * date -> dd/mm/yy 
 */

 function dataDateToDataBase(date,lang){
    var splitDate =date.split("/");
    var dateresult="";
    if(lang=='EN'||lang=='EN_US'){
         dateresult = new Date().setFullYear(splitDate[2], (splitDate[1] - 1), splitDate[0]);
    }if(lang=='TH'){
         dateresult = new Date().setFullYear(splitDate[2]-543, (splitDate[1] - 1), splitDate[0]);
    }

    return dateresult;

}

/**
 * ## Data Date to Frontend 
 */

  function dataDateToFrontend(date,lang){
    dataDate = new Date(date);
    var dateresult="";
    if(lang=='EN'||lang=='EN_US'){
         dateresult = dataDate.format('dd/mm/yyyy');
    }if(lang=='TH'){
         dateresult = new Date(dataDate.setFullYear(dataDate.getFullYear()+543)).format('dd/mm/yyyy');
    }

    return dateresult;

}


function parseFormatDateToString(date,lang){
    var dateresult="";
    if(date.trim() ==="")
    {
        return dateresult;
    }
     if(lang=='EN'||lang=='EN_US'){
        dateresult = date;
    }else if(lang=='TH'){
        var splitDate =date.split("/");
        var dataDate = new Date().setFullYear(splitDate[2]-543, (splitDate[1] - 1), splitDate[0]);
        dateresult=new Date(dataDate).format('dd/mm/yyyy');
    }
    return dateresult;
}



var AjaxUtil = {};
var UtilLov = {};
var MessageUtil = {};

MessageUtil.alertBootBoxMessage = function alertBootBoxMessage (options){

    var buttons = {
            cancel: {
                label: "<div>"+options.buttons.cancel.label+"</div>",
                className: "btn-primary"
            }
    };

    $.extend(options.buttons.cancel,buttons.cancel); 
    $.extend(buttons.cancel,options.buttons.cancel); 
    $.extend(options.buttons,buttons);
    var defaults = {
        closeButton: false,
        message:" ",
        title: "<div class='page-header'><h4><center>" + options.title + "</center></h4></div>",
        className: "modal25",
        buttons : buttons
    }; 

    return  bootbox.dialog(defaults);
};

MessageUtil.alertBootBoxConfirm = function alertBootBoxConfirm(options){
    var success = {
        label: "<div>"+options.buttons.success.label+"</div>",
        className: "btn-primary",
    };

        $.extend(options.buttons.success,success);
    var cancel = {
        label: "<div>"+options.buttons.cancel.label+"</div>",
        className: "btn-danger"
    };

        $.extend(options.buttons.cancel,cancel);

    var buttons = {
            success:options.buttons.success,
            cancel:options.buttons.cancel
    };

        $.extend(options.buttons,buttons);

    var defaults = {
        closeButton: false,
        message:" ",
        title: "<div class='page-header'><h4><center>" + options.title + "</center></h4></div>",
        className: "modal25",
        buttons : buttons
    }; 

    return  bootbox.dialog(defaults);
};

AjaxUtil.get = function(options){ 

    var defaults = {              //set the defaults
        headers: { 
            Accept : "application/json" 
        },
        type: "GET",
        async: false,
    };
    $.extend(options,defaults);

    var dataText = $.ajax(options).responseText;
    var json = JSON.parse(dataText);

    return json;
};

AjaxUtil.post = function(options){
    
    var defaults = {              //set the defaults
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            async: false
    };

    $.extend(options,defaults);
    var dataText = $.ajax(options).responseText;
    if(dataText.trim() == ""){
        return JSON.stringify("{}");
    }
    var json = JSON.parse(dataText);
    return json;
};

AjaxUtil.put = function(options){
    
    var defaults = {
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            async: false
    };

    $.extend(options,defaults);
    var dataText = $.ajax(options).responseText;
    if(dataText.trim() == ""){
        return JSON.stringify("{}");
    }
    var json = JSON.parse(dataText);
    return json;
};

AjaxUtil.delete= function(options){
    
    var defaults = {
            type: "DELETE",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            async: false
    };

    $.extend(options,defaults);
    var dataText = $.ajax(options).responseText;
    if(dataText.trim() == ""){
        return JSON.stringify("{}");
    }
    var json = JSON.parse(dataText);
    return json;
};

$(document).ajaxStop(function() {
    $('.dv-background').hide();
});

$(document).ajaxStart(function() {
    $('.dv-background').show();
});

function daysInMonth(m, y) { // m is 1 indexed: 0-12
    switch (m) {
        case 2 :
            return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
        case 9 : case 4 : case 6 : case 11 :
        return 30;
        default :
            return 31
    }
}

function isValid(d, m, y) {
    return m > 0 && m <= 12 && d > 0 && d <= daysInMonth(m, y);
}

var commonData = new Object();

commonData.language = 'TH';