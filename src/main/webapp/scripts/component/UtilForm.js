
var FormUtil = {};

FormUtil.isNotNull = function(value) {
        return !FormUtil.isNull(value);
};

FormUtil.isEmpty = function(value) {
  return FormUtil.isNull(value) || (FormUtil.isArray(value) && Array(value).length === 0) || String(value).trim().length === 0;
};

FormUtil.isEmptyWithPopOver = function(Element) {
  if(FormUtil.isEmpty(Element.val()))
  {
    Element.popover("show");
    return false;
  }else return true;
};

FormUtil.isNull = function(value) {
  return value === undefined || value === null;
};

FormUtil.numberValue = function(value, defaultValue) {
  return FormUtil.isNumber(value)?Number(value):defaultValue;
};

FormUtil.isNumber = function(value) {
  if(FormUtil.isArray(value) || FormUtil.isEmpty(value)) {
    return false;
  }
  
  return /^[+-]{0,1}(\d+){0,1}(\d{1,3}(,\d{3})*){0,1}(\.{1}\d+){0,1}$/.test(value);
};

FormUtil.isNotEmpty = function(value) {
  return !FormUtil.isEmpty(value);
};

FormUtil.isDate = function(value) {
  return jQuery.type(value) === 'date';
};

FormUtil.isArray = function(value) {
  return jQuery.type(value) === 'array'; 
};

FormUtil.checkdate = function (input){
    var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    
    if(input.match(dateformat))  
    {   
      var opera1 = input.split('/');  
      var opera2 = input.split('-');  
      lopera1 = opera1.length;  
      lopera2 = opera2.length;  

      if (lopera1>1)  
      {  
        var pdate = input.split('/');  
      }  
      else if (lopera2>1)  
      {  
        var pdate = input.split('-');  
      }  

      var dd = parseInt(pdate[0]);  
      var mm  = parseInt(pdate[1]);  
      var yy = parseInt(pdate[2]);  
      var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];  
      
      if (mm==1 || mm>2)  
      {  
        if (dd>ListofDays[mm-1])  
        {   
        return false;  
        }  
      }  
      
      if (mm==2)  
      {  
        var lyear = false;  
        
        if ( (!(yy % 4) && yy % 100) || !(yy % 400))   
        {  
          lyear = true;  
        }  

        if ((lyear==false) && (dd>=29))  
        {  
          return false;  
        }  
        
        if ((lyear==true) && (dd>29))  
        {    
          return false;  
        }  
      } 
      return true; 
    }  
    else  
    {  
      return false;  
    }    
};

FormUtil.isDateFormat = function (value) {
  return FormUtil.checkdate(value);
};

FormUtil.isDateFormatWithPopOver = function (value,msg) {
  if(FormUtil.isDateFormat(value.val()) == false) {
     
     value[0].getAttributeNode("data-content").value=msg;
     value.popover("show");

     return false;
  }
  else 
  {

     return true;
  }

};


FormUtil.dateIsMoreThanToday = function (Element) {
  var serverDate = new Date(session.date).format("dd/mm/yyyy");

  var regDate;
  var regMonth;
  var regYear = "["+serverDate.split("/")[2][0]+"]["+serverDate.split("/")[2][1]+"]["+serverDate.split("/")[2][2]+"]["+serverDate.split("/")[2][3]+"]"

  if(serverDate.split("/")[0][0]==0){
    regDate = "0["+serverDate.split("/")[0][1]+"]";
  }else if(serverDate.split("/")[0][0]==1){
    regDate = "0[1-9]|1[0-"+serverDate.split("/")[0][1]+"]";
  }else if(serverDate.split("/")[0][0]==2){
    regDate = "0[1-9]|1[0-9]|2[0-"+serverDate.split("/")[0][1]+"]";
  }else if(serverDate.split("/")[0][0]==3){
    regDate = "0[1-9]|1[0-9]|2[0-9]|3[0-"+serverDate.split("/")[0][1]+"]";
  }

  if(serverDate.split("/")[1]<10) {
    regMonth = "0["+serverDate.split("/")[1][1]+"]";
  }else {
    regMonth = "0[1-9]|1[0-"+serverDate.split("/")[1][1]+"]";
  }

  var regEx = "^"+regDate+"\\/"+regMonth+"\\/"+regYear+"$";
  return !(new RegExp(regEx).test(Element.val()));
};

FormUtil.dateIsMoreThanTodayWithPopOver = function (Element,msg) {
  if (FormUtil.dateIsMoreThanToday(Element)) {
    Element[0].getAttributeNode("data-content").value=msg;
    Element.popover("show");
    return false;
  }else return true;
};


FormUtil.regXNumber = function (str){
   
    $(str).bind('keyup', function () {

        var x = $(str).val();   
        var regEx = /^[0-9\b]+$/;   
        var text =$(str).val();
        var length = text.length;
        if(!x.match(regEx)){
            $(str).val(text.substring(0,length-1));   
        }
    });
};

FormUtil.addEventCheckTime = function (id){
  var idInput = "#"+id; 

  $(idInput).on("keypress",function (e) {
     var valueCheck = $("#"+id).val(); 
     var keyWhich = ""+e.which;
     var keyCode = ""+e.which;
     var regex02 = /([01]\d|2[0-3])/;
     var ch = ""+String.fromCharCode(keyWhich);
     var listIgnoreKey = ["0","8","13","58"];
     var listCheck = ["0","1","2","3","4","5","6","7","8","9"];  
     
     for(var i in listIgnoreKey){
        if(keyCode === listIgnoreKey[i]){
          return true;
        }
     }

     for(var i in listCheck){
        if(ch === listCheck[i]){
          return true;
        }
     }

     return false;
  });


  $(idInput).on("change",function (e) {
    var regex = /([01]\d|2[0-3]):([0-5]\d)/;
    var valueCheck = $(idInput).val(); 
    if(valueCheck.length >5){
      $(idInput).val("");
      return;
    }
    else
    {
      $(idInput).popover('hide');
    }

    if(!regex.test(valueCheck)){
      $(idInput).val("");
      return;
    }
    else
    {
      $(idInput).popover('hide');
    }

  });

};