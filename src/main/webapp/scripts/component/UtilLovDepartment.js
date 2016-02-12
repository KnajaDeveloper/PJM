
var LovEmployeeDataId = "data-id";
var LovEmployeeDataItem = "data-item";
var LovEmployeeDataCode = "data-code";
var LovEmployeeDataDescription = "data-description";

UtilLov.onLoadInputLovDepartment = function (id) {
    var inputId = "#" + id;
    LovDepartmentAfterCheckEmpty(inputId);
    LovDepartmentKeyUpEvent(inputId);
};

UtilLov.onLoadInputLovDepartmentFrom = function (id) {
    var inputId = "#" + id;
    LovDepartmentAfterCheckEmpty(inputId);
    LovDepartmentFromKeyUpEvent(inputId);
};

UtilLov.onLoadInputLovDepartmentTo = function (id) {
    var inputId = "#" + id;
    LovDepartmentAfterCheckEmpty(inputId);
    LovDepartmentToKeyUpEvent(inputId);
};

UtilLov.onChangeInputLovDepartment = function (input) {
    var inputId = "#" + input.id;
    LovDepartmentAfterCheckEmpty(input);
};

UtilLov.onChangeInputLovDepartmentFrom = function (input) {
    var inputId = "#" + input.id;
    LovDepartmentAfterCheckEmpty(input);
};

UtilLov.onChangeInputLovDepartmentTo = function (input) {
    var inputId = "#" + input.id;
    LovDepartmentAfterCheckEmpty(input);
};

function LovDepartmentAfterCheckEmpty(inputId) {
    var inputVal = $(inputId).val();
    if (inputVal.trim() === "") {
        $(inputId).data(LovEmployeeDataItem, "");
        $(inputId).data(LovEmployeeDataCode, "");
        $(inputId).data(LovEmployeeDataDescription, "");
    }
};

UtilLov.setValueLovDepartment = function (id, departmentCode) {
    if(departmentCode != "null" && departmentCode != null && departmentCode != undefined && departmentCode.length != 0 ){
        var inputId = "#" + id;
        var data = {
            find: departmentCode
        };
        var jsonData = AjaxUtil.get({
            url: session.context + "/central/findDepartmentByDepartmentCode",
            data: data
        });
        LovDepartmentAfterSetValue(id, jsonData);
    }
};

UtilLov.setValueLovDepartmentFrom = function (id, departmentCode) {
    if(departmentCode != "null" && departmentCode != null && departmentCode != undefined && departmentCode.length != 0 ){
        var inputId = "#" + id;
        var targetId = $("#" + id).attr("data-iddepartmentto");
        var targetData = $("#" + targetId).data(LovEmployeeDataCode);
        if (targetData == null || targetData.length == 0) targetData = "*";
        var data = {
            find: LovDepartmentSplitSpaceAndRetrunFirstIdentity(departmentCode),
            departmentCodeTo: LovDepartmentSplitSpaceAndRetrunFirstIdentity(targetData)
        };
        var jsonData = AjaxUtil.get({
            url: session.context + "/central/findLovDepartmentFrom",
            data: data
        });
        LovDepartmentAfterSetValue(id, jsonData);
    }
};

UtilLov.setValueLovDepartmentTo = function (id, departmentCode) {
    if(departmentCode != "null" && departmentCode != null && departmentCode != undefined && departmentCode.length != 0 ){
        var inputId = "#" + id;
        var targetId = $("#" + id).attr("data-iddepartmentfrom");
        var targetData = $("#" + targetId).data(LovEmployeeDataCode);
        if (targetData == null || targetData.length == 0) targetData = "*";
        var data = {
            find: LovDepartmentSplitSpaceAndRetrunFirstIdentity(departmentCode),
            departmentCodeTo: LovDepartmentSplitSpaceAndRetrunFirstIdentity(targetData)
        };
        var jsonData = AjaxUtil.get({
            url: session.context + "/central/findLovDepartmentTo",
            data: data
        });
        LovDepartmentAfterSetValue(id, jsonData);
    }
};

function LovDepartmentAfterSetValue(id, jsonData) {
    var inputId = "#" + id;
    if (jsonData.length != 0) {
        var key = jsonData.departmentCode+" : "+jsonData.departmentName;
        $(inputId).data(LovEmployeeDataItem,jsonData);
        $(inputId).data(LovEmployeeDataId,jsonData.id);
        $(inputId).data(LovEmployeeDataCode,jsonData.departmentCode);
        $(inputId).data(LovEmployeeDataDescription,jsonData.departmentName);
        $(inputId).val(key);
    }
};

UtilLov.lovDepartment = function (btn) {
    var inputId = "#" + $("#" + btn.id).attr("target");
    LovDepartmentQueryEvent(inputId);
};

UtilLov.lovDepartmentFrom = function (btn, idTargetLovTo) {
    var inputId = "#" + $("#" + btn.id).attr("target");
    var inputIdTargetLovTo = "#" + idTargetLovTo;
    LovDepartmentFromQueryEvent(inputId, inputIdTargetLovTo);
};

UtilLov.lovDepartmentTo = function (btn, idTargetLovFrom) {
    var inputId = "#" + $("#" + btn.id).attr("target");
    var inputIdTargetLovFrom = "#" + idTargetLovFrom;
    LovDepartmentToQueryEvent(inputId, inputIdTargetLovFrom);
};

function LovDepartmentQueryEvent(inputId) {
    var inputData = $(inputId).val();
    var data = {
        find: LovDepartmentSplitSpaceAndRetrunFirstIdentity(inputData)
    }
    var jsonData = AjaxUtil.get({
        url: session.context + "/central/findLovDepartment",
        data: data
    })
    LovDepartmentAfterQuery(inputId, jsonData, inputData);
    LovDepartmentKeyDownEvent(inputId);
    LovDepartmentKeyUpEvent(inputId) ;
};

function LovDepartmentFromQueryEvent(inputId, inputIdTargetLovTo) {
    var inputData = $(inputId).val();
    var targetData = $(inputIdTargetLovTo).data(LovEmployeeDataCode);
    if (targetData == null || targetData.length == 0) targetData = "*";
    var data = {
        find: LovDepartmentSplitSpaceAndRetrunFirstIdentity(inputData),
        departmentCodeTo: LovDepartmentSplitSpaceAndRetrunFirstIdentity(targetData)
    };
    var jsonData = AjaxUtil.get({
        url: session.context + "/central/findLovDepartmentFrom",
        data: data
    });
    LovDepartmentAfterQuery(inputId, jsonData, inputData);
    LovDepartmentKeyDownEvent(inputId);
    LovDepartmentFromKeyUpEvent(inputId);
};

function LovDepartmentToQueryEvent(inputId, inputIdTargetLovFrom) {
    var inputData = $(inputId).val();
    var targetData = $(inputIdTargetLovFrom).data(LovEmployeeDataCode);
    if (targetData == null || targetData.length == 0) targetData = "*";
    var data = {
        find: LovDepartmentSplitSpaceAndRetrunFirstIdentity(inputData),
        departmentCodeFrom: LovDepartmentSplitSpaceAndRetrunFirstIdentity(targetData)
    };
    var jsonData = AjaxUtil.get({
        url: session.context + "/central/findLovDepartmentTo",
        data: data
    });
    LovDepartmentAfterQuery(inputId, jsonData, inputData);
    LovDepartmentKeyDownEvent(inputId);
    LovDepartmentToKeyUpEvent(inputId);
};

function LovDepartmentSplitSpaceAndRetrunFirstIdentity(input) {
    return input == null || input == undefined || input.length == 0 ? "*": input.split(" ")[0];
};

function LovDepartmentAfterQuery(inputId, jsonData, dataInput) {
    $(inputId).typeahead("destroy").typeahead({
        source: function (query, process) {
            var states = [];
            var map = {};
            $.each(jsonData, function (i, state) {
                var key = state.departmentCode + " : " + state.departmentName;
                map[key] = state;
                states.push(key);
            });
            process(states);
            $(inputId).data("map", map);
        },
        minLength: 0,
        items: 20,
        menu: "<ul id=" + inputId.split("#")[1] + "_typeahead_menu class='typeahead dropdown-menu'></ul>",
        updater: function (item) {
            var map = $(inputId).data('map');
            $(inputId).data(LovEmployeeDataItem,map[item]);
            $(inputId).data(LovEmployeeDataId,map[item].id);
            $(inputId).data(LovEmployeeDataCode,map[item].departmentCode);
            $(inputId).data(LovEmployeeDataDescription,map[item].departmentName);
            return item;
        }
    }).focus().val("").keyup().val(dataInput);
};

function LovDepartmentKeyDownEvent(inputId) {
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

function LovDepartmentKeyUpEvent(inputId) {
    var timeChecker;
    $(inputId).bind("keyup", function (evt) {
        var keyCode = evt.which;
        var unableKey = [13, 27, 37, 38, 39, 40];
        var checkerKeyCode = null;
        for (var i = 0; i < unableKey.length; i++) {
            checkerKeyCode = keyCode === unableKey[i] ? 0 : 1;
            if (checkerKeyCode === 0) break;
        }
        if (checkerKeyCode === 1) {
            clearTimeout(timeChecker);
            timeChecker = setTimeout(function () {
                LovDepartmentQueryEvent(inputId);
            }, 1000)
        }
    });
};

function LovDepartmentFromKeyUpEvent(inputId) {
    var inputIdTargetLovTo = "#" + $(inputId).attr("data-iddepartmentto");
    var timeChecker;
    $(inputId).bind("keyup", function (evt) {
        var keyCode = evt.which;
        var unableKey = [13, 27, 37, 38, 39, 40];
        var checkerKeyCode = null;
        for (var i = 0; i < unableKey.length; i++) {
            checkerKeyCode = keyCode === unableKey[i] ? 0 : 1;
            if (checkerKeyCode === 0) break;
        }
        if (checkerKeyCode === 1) {
            clearTimeout(timeChecker);
            timeChecker = setTimeout(function () {
                LovDepartmentFromQueryEvent(inputId, inputIdTargetLovTo);
            }, 1000)
        }
    });
};

function LovDepartmentToKeyUpEvent(inputId) {
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
        if (checkerKeyCode === 1) {
            clearTimeout(timeChecker);
            timeChecker = setTimeout(function () {
                LovDepartmentToQueryEvent(inputId, inputIdTargetLovFrom)
            }, 1000)
        }
    });
};










// UtilLov.lovDepartment = function lovGetDepartment (btn) {
//     var inputId= "#" + $("#"+btn.id).attr('target');
//     var depaartmentCode = $(inputId).val();
//     var splitDepartment = depaartmentCode.split(' ');
//     if(splitDepartment.length == 4){
//         depaartmentCode = splitDepartment[0];
//     }
//     var jsonData = AjaxUtil.get({
//         url :session.context+"/central/findLovDepartment",
//         data:{find:depaartmentCode}
//     });
//     $(inputId).typeahead('destroy').typeahead({
//             source: function (query, process) {
//                 var states = [];
//                 var map = {};
//                 $.each(jsonData, function (i, state) {
//                     var key = state.departmentCode+" : "+state.departmentName;
//                     map[key] = state;
//                     states.push(key);
//                 });
//                 process(states);
//                 $(inputId).data('map',map);
//             },
//             updater: function (item) {
//                 var map = $(inputId).data('map');
//                 $(inputId).data('data-item',map[item]);
//                 $(inputId).data('data-id',map[item].id);
//                 $(inputId).data('data-code',map[item].departmentCode);
//                 $(inputId).data('data-description',map[item].departmentName);
//                 return item;
//             },
//             minLength: 0,
//             items: 20,
//             menu:'<ul id='+inputId.split('#')[1]+'_typeahead_menu class="typeahead dropdown-menu"></ul>',
//     }).focus().val('').keyup().val(depaartmentCode);
//     LovDepartmentKeyUpEvent(inputId);
// };

// UtilLov.setValueLovDepartment = function setValueLovDepartment(id,departmentCode) {
//     var inputId = "#"+id;
//     var data = {
//         find:departmentCode
//     };
//     var jsonData = AjaxUtil.get({
//         url :session.context+"/central/findDepartmentByDepartmentCode",
//         data:data
//     });
//     if(jsonData.departmentCode){
//         var key = jsonData.departmentCode+" : "+jsonData.departmentName;
//         $(inputId).data('data-item',jsonData);
//         $(inputId).data('data-code',jsonData.departmentCode);
//         $(inputId).data('data-description',jsonData.departmentName);
//         $(inputId).val(key);
//     }
// };

// UtilLov.onChangeInputLovDepartment = function onChangeInputLovDepartment(input){
//     var inputId = "#"+input.id;
//     var inputVal = $(inputId).val();
//     if(inputVal.trim() ===""){
//         $(inputId).data('data-item',"");
//         $(inputId).data('data-code',"");
//         $(inputId).data('data-description',"");
//     }
// };

// UtilLov.onLoadInputLovDepartment = function onLoadInputLovDepartment(id){
//     var inputId = "#"+id;
//     var inputVal = $(inputId).val();
//     if(inputVal.trim() ===""){
//         $(inputId).data('data-item',"");
//         $(inputId).data('data-code',"");
//         $(inputId).data('data-description',"");
//     }
//     $(inputId).isLovDepartmentTypeQuery();
// };

// $.fn.isLovDepartmentTypeQuery = function () {
//     var inputId = '#'+this.attr('id');
//     LovDepartmentKeyUpEvent(inputId);
// };

// function LovDepartmentKeyUpEvent(inputId) {
//     var timeChecker;
//     $(inputId).bind('keyup', function (evt) {
//         var keyCode = evt.which;
//         var unableKey = [13,27,37,38,39,40];
//         var checkerKeyCode = null;
//         for(var i=0;i<unableKey.length;i++){
//             checkerKeyCode = keyCode === unableKey[i] ? 0 : 1 ;
//             if(checkerKeyCode === 0) break;
//         }
//         if(checkerKeyCode === 1){
//             clearTimeout(timeChecker);
//             timeChecker = setTimeout(function(){
//                 LovDepartmentQueryEvent(inputId);
//             },1000)
//         };
//     });
// };

// function LovDepartmentQueryEvent(inputId) {
//     var depaartmentCode = $(inputId).val();
//     var data = {
//         find:depaartmentCode
//     };
//     var jsonData = AjaxUtil.get({
//         url :session.context+"/central/findLovDepartment",
//         data:data
//     });
//     $(inputId).typeahead('destroy').typeahead({
//             source: function (query, process) {
//                 var states = [];
//                 var map = {};
//                 $.each(jsonData, function (i, state) {
//                     var key = state.departmentCode+" : "+state.departmentName;
//                     map[key] = state;
//                     states.push(key);
//                 });
//                 process(states);
//                 $(inputId).data('map',map);
//             },
//             updater: function (item) {
//                 var map = $(inputId).data('map');
//                 $(inputId).data('data-item',map[item]);
//                 $(inputId).data('data-id',map[item].id);
//                 $(inputId).data('data-code',map[item].departmentCode);
//                 $(inputId).data('data-description',map[item].departmentName);
//                 return item;
//             },
//             minLength: 0,
//             items: 20,
//             menu:'<ul id='+inputId.split('#')[1]+'_typeahead_menu class="typeahead dropdown-menu"></ul>',
//     }).focus().val('').keyup().val(depaartmentCode);
//     LovDepartmentKeyDownEvent(inputId);
// };

// function LovDepartmentKeyDownEvent(inputId) {
//     $(inputId).bind('keydown', function (evt) {
//         if(evt.which === 40 && $(inputId+'_typeahead_menu')[0] != undefined){
//             $(inputId+'_typeahead_menu')[0].scrollTop = (($(inputId+'_typeahead_menu li.active').index()) * 26);
//         }
//         if(evt.which === 38 && $(inputId+'_typeahead_menu')[0] != undefined){
//             $(inputId+'_typeahead_menu')[0].scrollTop = (($(inputId+'_typeahead_menu li.active').index()) * 25);
//         }
//     });
//     LovDepartmentKeyUpEvent(inputId);
// };