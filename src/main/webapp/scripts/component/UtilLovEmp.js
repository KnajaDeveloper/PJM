var LovEmployeeDataId = "data-id";
var LovEmployeeDataItem = "data-item";
var LovEmployeeDataCode = "data-code";
var LovEmployeeDataDescription = "data-description";

UtilLov.onChangeInputLovEmp = function (input,e) {
    var inputId = "#" + input.id;
    $(inputId).data(LovEmployeeDataItem, "");
    $(inputId).data(LovEmployeeDataCode, "");
    $(inputId).data(LovEmployeeDataDescription, "");
    if (e.keyCode == 13) {
        //LovEmpAfterCheckEmpty(input);
        UtilLov.lovEmp(input);
    }
};

UtilLov.lovEmp = function (btn) {
    var inputId = "#" + $("#" + btn.id).attr("target");
    LovEmpQueryEvent(inputId);
};

UtilLov.onLoadInputLovEmp = function (id) {
    var inputId = "#" + id;
    LovEmpAfterCheckEmpty(inputId);
    LovEmpKeyUpEvent(inputId);
};

function LovEmpAfterCheckEmpty(inputId) {
    var inputVal = $(inputId).val();
    if (inputVal.trim() === "") {
        $(inputId).data(LovEmployeeDataItem, "");
        $(inputId).data(LovEmployeeDataCode, "");
        $(inputId).data(LovEmployeeDataDescription, "");
    }
};

function LovEmpQueryEvent(inputId) {
    var inputData = $(inputId).val();
    var data = {
        text: LovEmpSplitSpaceAndRetrunFirstIdentity(inputData)
    }
    var jsonData = AjaxUtil.get({
        url: contextPath + "/central/"+controller,
        data: data
    })
    LovEmpAfterQuery(inputId, jsonData, inputData);
    LovEmpKeyDownEvent(inputId);
    LovEmpKeyUpEvent(inputId) ;
};

function LovEmpSplitSpaceAndRetrunFirstIdentity(input) {
    return input == null || input == undefined || input.length == 0 ? "": input.split(" ")[0];
};

function LovEmpAfterQuery(inputId, jsonData, dataInput) {
    $(inputId).typeahead("destroy").typeahead({
        source: function (query, process) {
            var states = [];
            var map = {};
            $.each(jsonData, function (i, state) {
                var key = state.empFirstName +"  "+ state.empLastName + "  (" + state.empNickName + ")";
                map[key] = state;
                states.push(key);
            });
            process(states);
            $(inputId).data("map", map);
        },
        minLength: 0,
        items: 20,
        menu: "<ul id=" + inputId.split("#")[1] + "_typeahead_menu class='typeahead dropdown-menu' style='width: "+$(inputId).width()+"px;'></ul>",
        updater: function (item) {
            var map = $(inputId).data('map');
            $(inputId).data(LovEmployeeDataItem,map[item]);
            $(inputId).data(LovEmployeeDataId,map[item].id);
            $(inputId).data(LovEmployeeDataCode,map[item].empCode);
            $(inputId).data(LovEmployeeDataDescription,map[item].empName);
            return item;
        }
    }).focus().val("").keyup().val(dataInput);
};

function LovEmpKeyDownEvent(inputId) {
    $(inputId + "_typeahead_menu").scrollTop = 0;
    $(inputId).bind("keydown", function (evt) {
        if (evt.which === 40 && $(inputId + "_typeahead_menu")[0] != undefined) {
            $(inputId + "_typeahead_menu")[0].scrollTop = (($(inputId + "_typeahead_menu li.active").index()) * 26);
        }
        if (evt.which === 38 && $(inputId + "_typeahead_menu")[0] != undefined) {
            $(inputId + "_typeahead_menu")[0].scrollTop = (($(inputId + "_typeahead_menu li.active").index()) * 25);
        }
    });
};

function LovEmpKeyUpEvent(inputId) {
    var inputIdTargetLovFrom = "#" + $(inputId).attr("data-iddepartmentfrom");
    var timeChecker;
    $(inputId).bind("keyup", function (evt) {
        var keyCode = evt.which;
        var unableKey = [13, 27, 37, 38, 39, 40];
        var checkerKeyCode = null;
        for (var i = 0; i < unableKey.length; i++) {
            checkerKeyCode = keyCode === unableKey[i] ? 0 : 1;
            if (checkerKeyCode === 0) break;
        }
    });
};




//var resultEmployee;
//
//function searchLovEmployee(text){
//    $("#"+txtId).attr('empCode',"");
//    var dataJsonData = {
//        text:text
//    };
//    resultEmployee = $.ajax({
//        headers: {
//            Accept: "application/json"
//        },
//        type: "GET",
//        url: contextPath + '/central/findEmployeeByText',
//        data : dataJsonData,
//        complete: function(xhr){
//            if(xhr.status === 201 || xhr.status === 200){
//
//            }else if(xhr.status === 500){
//                resultProject = null ;
//            }
//        },
//        async: false
//    });
//    addResultToDDL();
//}
//
//function addResultToDDL(){
//    removeDataResultSearch();
//    if(resultEmployee.responseJSON.length > 0){
//        $('#resultSearch-'+txtId).addClass("sbdd_b");
//        var html = "<ui role='listbox'>";
//        for(var i = 0 ; i < resultEmployee.responseJSON.length ; i++){
//            var empCode = resultEmployee.responseJSON[i].empCode ;
//            var empFirstName = resultEmployee.responseJSON[i].empFirstName;
//            var empLastName = resultEmployee.responseJSON[i].empLastName;
//            var empNickName = resultEmployee.responseJSON[i].empNickName;
//            var showText = ""+empFirstName+" "+empLastName+" ("+empNickName+")";
//            html += "<div id='resultData"+txtId+""+i+"' onmouseover='dataOver(this)' onclick='clickData(this)' onmouseout='dataOut()'"+
//                "class='sbsb_c' role='presentation' style='text-align: left;' empCode='"+empCode+"' showData='"+showText+"'>"+
//                "<div role='option' class='textResult'>"+
//                "<font>"+showText+"</font></div></div></ui>";
//        }
//        $('#resultSearch-'+txtId).append(html);
//    }
//}
//
//function removeDataResultSearch(){
//    $('#resultSearch-'+txtId).empty();
//    $('#resultSearch-'+txtId).removeClass("sbdd_b");
//}