var LovEmployeeDataId = "data-id";
var LovEmployeeDataItem = "data-item";
var LovEmployeeDataCode = "data-code";
var LovEmployeeDataDescription = "data-description";
var first = true ;

UtilLov.onChangeInputLovEmp = function (input,e) {
    $("[data-toggle='popover']").popover('destroy');
    var inputId = "#" + input.id;
    if(first){
        $(inputId).attr("data-content",Message.Can_press_enter);
        $(inputId).popover('show');
    }
    $(inputId).data(LovEmployeeDataItem, "");
    $(inputId).data(LovEmployeeDataCode, "");
    $(inputId).data(LovEmployeeDataDescription, "");
    if (e.keyCode == 13) {
        //LovEmpAfterCheckEmpty(input);
        UtilLov.lovEmp(input);
    }
};

UtilLov.onFocus = function (input){
    $("[data-toggle='popover']").popover('destroy');
};

UtilLov.lovEmp = function (btn) {
    $("[data-toggle='popover']").popover('destroy');
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
    if(team=="") {
        var data = {
            text: LovEmpSplitSpaceAndRetrunFirstIdentity(inputData)
        }
        var jsonData = AjaxUtil.get({
            url: contextPath + "/central/" + controller,
            data: data
        })
    }
    else{
        var data = {
            teamID : $("#"+team).val()
            //teamID : 100001
        }
        var jsonData = AjaxUtil.get({
            url: contextPath + "/central/" + controller,
            data: data
        })
    }
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
                first = false;
                var key = ""+state.empCode+" : "+state.empFirstName +"  "+ state.empLastName + "  (" + state.empNickName + ")";
                map[key] = state;
                states.push(key);
            });
            process(states);
            $(inputId).data("map", map);
        },
        minLength: 0,
        items: 20,
        menu: "<ul id=" + inputId.split("#")[1] + "_typeahead_menu class='typeahead dropdown-menu' style='width: "+$(inputId).width()+"px; height: 200px; overflow-x: scroll; overflow-y: scroll; scrollbar-arrow-color:blue; scrollbar-face-color: #e7e7e7; scrollbar-3dlight-color: #a0a0a0; scrollbar-darkshadow-color:#888888'></ul>",
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