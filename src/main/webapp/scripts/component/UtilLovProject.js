var LovProjectDataId = "data-id";
var LovProjectDataItem = "data-item";
var LovProjectDataCode = "data-code";
var LovProjectDataDescription = "data-description";
var first = true ;
var idText = "";

UtilLov.onChangeInputLovProject = function (input,e) {
    $("[data-toggle='popover']").popover('destroy');
    var inputId = "#" + input.id;
    var idText = ""+input.id;
    if(first){
        $(inputId).attr("data-content",canPressEnter);
        $(inputId).popover('show');
    }
    $(inputId).data(LovProjectDataItem, "");
    $(inputId).data(LovProjectDataCode, "");
    $(inputId).data(LovProjectDataDescription, "");
    if (e.keyCode == 13) {
        //LovProjectAfterCheckProjectty(input);
        UtilLov.lovProject(input);
    }
};

UtilLov.onFocus = function (input){
    $("[data-toggle='popover']").popover('destroy');
};

UtilLov.lovProject = function (btn) {
    $("[data-toggle='popover']").popover('destroy');
    var inputId = "#" + $("#" + btn.id).attr("target");
    LovProjectQueryEvent(inputId);
};

UtilLov.onLoadInputLovProject = function (id) {
    var inputId = "#" + id;
    LovProjectAfterCheckProjectty(inputId);
    LovProjectKeyUpEvent(inputId);
};

function LovProjectAfterCheckProjectty(inputId) {
    var inputVal = $(inputId).val();
    if (inputVal.trim() === "") {
        $(inputId).data(LovProjectDataItem, "");
        $(inputId).data(LovProjectDataCode, "");
        $(inputId).data(LovProjectDataDescription, "");
    }
};

function LovProjectQueryEvent(inputId) {
    $("#typeahead_menu_").hide();
    var inputData = $(inputId).val();
    var data = {
        text: LovProjectSplitSpaceAndRetrunFirstIdentity(inputData)
    };
    var jsonData = AjaxUtil.get({
        url: contextPath + "/central/findProjectByText",
        data: data
    });
    LovProjectAfterQuery(inputId, jsonData, inputData);
    LovProjectKeyDownEvent(inputId);
    LovProjectKeyUpEvent(inputId) ;
};

function LovProjectSplitSpaceAndRetrunFirstIdentity(input) {
    return input == null || input == undefined || input.length == 0 ? "": input.split(" ")[0];
};

function LovProjectAfterQuery(inputId, jsonData, dataInput) {
    $(inputId).typeahead("destroy").typeahead({
        source: function (query, process) {
            var states = [];
            var map = {};
            $.each(jsonData, function (i, state) {
                first = false;
                var year = parseInt(state.projectYear);
                if(commonData.language=="TH") year+=543;
                var key = ""+state.projectCode+" : "+state.projectName +"  (" + year + ")";
                map[key] = state;
                states.push(key);
            });
            process(states);
            $(inputId).data("map", map);
        },
        minLength: 0,
        items: 20,
        menu: "<ul id='typeahead_menu_'+" + inputId.split("#")[1] + " class='typeahead dropdown-menu' style='width: "+$("#Container"+idText).width()+"px; height: 200px; overflow-x: scroll; overflow-y: scroll; scrollbar-arrow-color:blue; scrollbar-face-color: #e7e7e7; scrollbar-3dlight-color: #a0a0a0; scrollbar-darkshadow-color:#888888'></ul>",
        updater: function (item) {
            var map = $(inputId).data('map');
            $(inputId).data(LovProjectDataItem,map[item]);
            $(inputId).data(LovProjectDataId,map[item].projectId);
            $(inputId).data(LovProjectDataCode,map[item].projectCode);
            $(inputId).data(LovProjectDataDescription,map[item].projectName);
            return item;
        }
    }).focus().val("").keyup().val(dataInput);
};

function LovProjectKeyDownEvent(inputId) {
    $("typeahead_menu_"+inputId).scrollTop = 0;
    $(inputId).bind("keydown", function (evt) {
        if (evt.which === 40 && $(inputId + "_typeahead_menu")[0] != undefined) {
            $(inputId + "_typeahead_menu")[0].scrollTop = (($(inputId + "_typeahead_menu li.active").index()) * 26);
        }
        if (evt.which === 38 && $(inputId + "_typeahead_menu")[0] != undefined) {
            $(inputId + "_typeahead_menu")[0].scrollTop = (($(inputId + "_typeahead_menu li.active").index()) * 25);
        }
    });
};

function LovProjectKeyUpEvent(inputId) {
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