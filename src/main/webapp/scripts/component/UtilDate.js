
var DateUtil = {};

DateUtil.dataDateToDataBase =  function dataDateToDataBase(date,lang){
    var splitDate =date.split("/");
    var dateresult="";
    if(lang=='EN'||lang=='EN_US'){
         dateresult = new Date().setFullYear(splitDate[2], (splitDate[1] - 1), splitDate[0]);
    }if(lang=='TH'){
         dateresult = new Date().setFullYear(splitDate[2]-543, (splitDate[1] - 1), splitDate[0]);
    }

    return dateresult;

};

/**
 * ## Data Date to Frontend 
 */

DateUtil.dataDateToFrontend =  function dataDateToFrontend(date,lang){
    dataDate = new Date(date);
    var dateresult="";
    if(lang=='EN'||lang=='EN_US'){
         dateresult = dataDate.format('dd/mm/yyyy');
    }if(lang=='TH'){
         dateresult = new Date(dataDate.setFullYear(dataDate.getFullYear()+543)).format('dd/mm/yyyy');
    }

    return dateresult;

};


DateUtil.parseFormatDateToString =  function parseFormatDateToString(date,lang){
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
};

DateUtil.getCurrentDate = function getCurrentDate(){
    return session.date;
};

DateUtil.getTomorrow = function getTomorrow(add){
    var today = new Date(DateUtil.getCurrentDate());
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate()+add);

    return tomorrow;
};

DateUtil.setMinDate = function setMinDate(idTextStartDate,idTextEndDate) {
    var idStartDate = "#"+idTextStartDate;
    var idEndDate = "#"+idTextEndDate;
    var dataStartDate = $(idStartDate).val();
    var dataEndDate = $(idEndDate).val();
    var splitStartDate =  dataStartDate.split('/');
    var splitEndDate =  dataEndDate.split('/');
    var dateResultStartDateStartDate='';
    var dateResultEndDate='';
    if(_language=='EN'||_language=='EN_US'){
        dateResultStartDate = new Date(splitStartDate[2], (splitStartDate[1] - 1), splitStartDate[0]);
        dateResultEndDate = new Date(splitEndDate[2], (splitEndDate[1] - 1), splitEndDate[0]);
    }else if(_language=='TH'){
        dateResultStartDate = new Date(splitStartDate[2]-543, (splitStartDate[1] - 1), splitStartDate[0]);
        dateResultEndDate = new Date(splitEndDate[2]-543, (splitEndDate[1] - 1), splitEndDate[0]);
    }
    $(idEndDate).datepicker('option', 'minDate', dateResultStartDate);
    if((dateResultStartDate - dateResultEndDate) < 0){
        $(idEndDate).val(dataEndDate);
    }else if((dateResultStartDate - dateResultEndDate) >= 0){
        $(idEndDate).val(dataStartDate);
    }
};

DateUtil.setMaxDate = function setMaxDate(idTextEndDate,idTextStartDate) {
    var idStartDate = "#"+idTextStartDate;
    var idEndDate = "#"+idTextEndDate;
    var dataStartDate = $(idStartDate).val();
    var dataEndDate = $(idEndDate).val();
    var splitStartDate =  dataStartDate.split('/');
    var splitEndDate =  dataEndDate.split('/');
    var dateResultStartDateStartDate='';
    var dateResultEndDate='';
    if(_language=='EN'||_language=='EN_US'){
        dateResultStartDate = new Date(splitStartDate[2], (splitStartDate[1] - 1), splitStartDate[0]);
        dateResultEndDate = new Date(splitEndDate[2], (splitEndDate[1] - 1), splitEndDate[0]);
    }else if(_language=='TH'){
        dateResultStartDate = new Date(splitStartDate[2]-543, (splitStartDate[1] - 1), splitStartDate[0]);
        dateResultEndDate = new Date(splitEndDate[2]-543, (splitEndDate[1] - 1), splitEndDate[0]);
    }
    $(idStartDate).datepicker('option', 'maxDate', dateResultEndDate);
    if((dateResultStartDate - dateResultEndDate) < 0){
        $(idStartDate).val(dataStartDate);
    }else if((dateResultStartDate - dateResultEndDate) >= 0){
        $(idStartDate).val(dataEndDate);
    }
};