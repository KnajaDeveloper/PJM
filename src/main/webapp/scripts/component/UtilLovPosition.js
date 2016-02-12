var LovPositionDataItem = "data-item";
var LovPositionDataCode = "data-code";
var LovPositionDataDescription = "data-description";


UtilLov.onLoadInputLovPosition = function (id) {
    var inputId = "#" + id;
    LovPositionAfterCheckEmpty(inputId);
    LovPositionKeyUpEvent(inputId);
};

UtilLov.onLoadInputLovPositionFrom = function (id) {
    var inputId = "#" + id;
    LovPositionAfterCheckEmpty(inputId);
    LovPositionFromKeyUpEvent(inputId);
};

UtilLov.onLoadInputLovPositionTo = function (id) {
    var inputId = "#" + id;
    LovPositionAfterCheckEmpty(inputId);
    LovPositionToKeyUpEvent(inputId);
};

UtilLov.onChangeInputLovPosition = function (input) {
    var inputId = "#" + input.id;
    LovPositionAfterCheckEmpty(input);
};

UtilLov.onChangeInputLovPositionFrom = function (input) {
    var inputId = "#" + input.id;
    LovPositionAfterCheckEmpty(input);
};

UtilLov.onChangeInputLovPositionTo = function (input) {
    var inputId = "#" + input.id;
    LovPositionAfterCheckEmpty(input);
};

function LovPositionAfterCheckEmpty(inputId) {
    var inputVal = $(inputId).val();
    if (inputVal.trim() === "") {
        $(inputId).data(LovPositionDataItem, "");
        $(inputId).data(LovPositionDataCode, "");
        $(inputId).data(LovPositionDataDescription, "");
    }
};

UtilLov.setValueLovPosition = function (id, positionCode) {
    if(positionCode != "null" && positionCode != null && positionCode != undefined && positionCode.length != 0 ){
        var inputId = "#" + id;
        var data = {
            find: positionCode
        };
        var jsonData = AjaxUtil.get({
            url: session.context + "/central/findPositionByPositionCode",
            data: data
        });
        LovPositionAfterSetValue(id, jsonData);
    }
};

UtilLov.setValueLovPositionFrom = function (id, positionCode) {
    if(positionCode != "null" && positionCode != null && positionCode != undefined && positionCode.length != 0 ){
        var inputId = "#" + id;
        var targetId = $("#" + id).attr("data-idpositionto");
        var targetData = $("#" + targetId).data(LovPositionDataCode);
        if (targetData == null || targetData.length == 0) targetData = "*";
        var data = {
            find: LovPositionSplitSpaceAndRetrunFirstIdentity(positionCode),
            positionCodeTo: LovPositionSplitSpaceAndRetrunFirstIdentity(targetData)
        };
        var jsonData = AjaxUtil.get({
            url: session.context + "/central/findLovPositionFrom",
            data: data
        });
        LovPositionAfterSetValue(id, jsonData);
    }
};

UtilLov.setValueLovPositionTo = function (id, positionCode) {
    if(positionCode != "null" && positionCode != null && positionCode != undefined && positionCode.length != 0 ){
        var inputId = "#" + id;
        var targetId = $("#" + id).attr("data-idpositionfrom");
        var targetData = $("#" + targetId).data(LovPositionDataCode);
        if (targetData == null || targetData.length == 0) targetData = "*";
        var data = {
            find: LovPositionSplitSpaceAndRetrunFirstIdentity(positionCode),
            positionCodeTo: LovPositionSplitSpaceAndRetrunFirstIdentity(targetData)
        };
        var jsonData = AjaxUtil.get({
            url: session.context + "/central/findLovPositionTo",
            data: data
        });
        LovPositionAfterSetValue(id, jsonData);
    }
};

function LovPositionAfterSetValue(id, jsonData) {
    var inputId = "#" + id;
    if (jsonData.length != 0) {
        var key = jsonData.positionCode + " : " + jsonData.positionName;
        $(inputId).data(LovPositionDataItem,jsonData);
        $(inputId).data(LovPositionDataCode,jsonData.positionCode);
        $(inputId).data(LovPositionDataDescription,jsonData.positionName);
        $(inputId).val(key);
    }
};

UtilLov.lovPosition = function (btn) {
    var inputId = "#" + $("#" + btn.id).attr("target");
    LovPositionQueryEvent(inputId);
};

UtilLov.lovPositionFrom = function (btn, idTargetLovTo) {
    var inputId = "#" + $("#" + btn.id).attr("target");
    var inputIdTargetLovTo = "#" + idTargetLovTo;
    LovPositionFromQueryEvent(inputId, inputIdTargetLovTo);
};

UtilLov.lovPositionTo = function (btn, idTargetLovFrom) {
    var inputId = "#" + $("#" + btn.id).attr("target");
    var inputIdTargetLovFrom = "#" + idTargetLovFrom;
    LovPositionToQueryEvent(inputId, inputIdTargetLovFrom);
};

function LovPositionQueryEvent(inputId) {
    var inputData = $(inputId).val();
    var data = {
        find: LovPositionSplitSpaceAndRetrunFirstIdentity(inputData)
    }
    var jsonData = AjaxUtil.get({
        url: session.context + "/central/findLovPosition",
        data: data
    })
    LovPositionAfterQuery(inputId, jsonData, inputData);
    LovPositionKeyDownEvent(inputId);
    LovPositionKeyUpEvent(inputId) ;
};

function LovPositionFromQueryEvent(inputId, inputIdTargetLovTo) {
    var inputData = $(inputId).val();
    var targetData = $(inputIdTargetLovTo).data(LovPositionDataCode);
    if (targetData == null || targetData.length == 0) targetData = "*";
    var data = {
        find: LovPositionSplitSpaceAndRetrunFirstIdentity(inputData),
        positionCodeTo: LovPositionSplitSpaceAndRetrunFirstIdentity(targetData)
    };
    var jsonData = AjaxUtil.get({
        url: session.context + "/central/findLovPositionFrom",
        data: data
    });
    LovPositionAfterQuery(inputId, jsonData, inputData);
    LovPositionKeyDownEvent(inputId);
    LovPositionFromKeyUpEvent(inputId);
};

function LovPositionToQueryEvent(inputId, inputIdTargetLovFrom) {
    var inputData = $(inputId).val();
    var targetData = $(inputIdTargetLovFrom).data(LovPositionDataCode);
    if (targetData == null || targetData.length == 0) targetData = "*";
    var data = {
        find: LovPositionSplitSpaceAndRetrunFirstIdentity(inputData),
        positionCodeFrom: LovPositionSplitSpaceAndRetrunFirstIdentity(targetData)
    };
    var jsonData = AjaxUtil.get({
        url: session.context + "/central/findLovPositionTo",
        data: data
    });
    LovPositionAfterQuery(inputId, jsonData, inputData);
    LovPositionKeyDownEvent(inputId);
    LovPositionToKeyUpEvent(inputId);
};

function LovPositionSplitSpaceAndRetrunFirstIdentity(input) {
    return input == null || input == undefined || input.length == 0 ? "*": input.split(" ")[0];
};

function LovPositionAfterQuery(inputId, jsonData, dataInput) {
    $(inputId).typeahead("destroy").typeahead({
        source: function (query, process) {
            var states = [];
            var map = {};
            $.each(jsonData, function (i, state) {
                var key = state.positionCode + " : " + state.positionName;
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
            var map = $(inputId).data("map");
            $(inputId).data(LovPositionDataItem, map[item]);
            $(inputId).data(LovPositionDataCode, map[item].positionCode);
            $(inputId).data(LovPositionDataDescription, map[item].positionName);
            return item;
        }
    }).focus().val("").keyup().val(dataInput);
};

function LovPositionKeyDownEvent(inputId) {
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

function LovPositionKeyUpEvent(inputId) {
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
                LovPositionQueryEvent(inputId);
            }, 1000)
        }
    });
};

function LovPositionFromKeyUpEvent(inputId) {
    var inputIdTargetLovTo = "#" + $(inputId).attr("data-idpositionto");
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
                LovPositionFromQueryEvent(inputId, inputIdTargetLovTo);
            }, 1000)
        }
    });
};

function LovPositionToKeyUpEvent(inputId) {
    var inputIdTargetLovFrom = "#" + $(inputId).attr("data-idpositionfrom");
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
                LovPositionToQueryEvent(inputId, inputIdTargetLovFrom)
            }, 1000)
        }
    });
};




// UtilLov.lovPosition = function lovPosition (btn) {
//     var inputId=$("#"+btn.id).attr('target');
//         inputId = "#"+inputId;
//     var positionCode = $(inputId).val();
//     var splitPosition = positionCode.split(' ');
//     if(splitPosition.length == 4){
//         positionCode = splitPosition[0];
//     }
//     var jsonData = AjaxUtil.get({
//         url :session.context+"/central/findLovPosition",
//         data:{find:positionCode}
//     });
//     $(inputId).typeahead('destroy').typeahead({
//             source: function (query, process) {
//                 var states = [];
//                 var map = {};
//                 $.each(jsonData, function (i, state) {
//                     var key = state.positionCode+" : "+state.positionName;
//                     map[key] = state;
//                     states.push(key);
//                 });
//                 process(states);
//                 $(inputId).data('map',map);
//             },
//             updater: function (item) {
//                 var map = $(inputId).data('map');
//                 $(inputId).data('data-item',map[item]);
//                 $(inputId).data('data-code',map[item].positionCode);
//                 $(inputId).data('data-description',map[item].positionName);
//                 return item;
//             },
//             minLength: 0,
//             items: 20,
//             menu:'<ul id='+inputId.split('#')[1]+'_typeahead_menu class="typeahead dropdown-menu"></ul>',
//     }).focus().val('').keyup().val(positionCode);  
//     LovPositionKeyUpEvent(inputId);
// };

// UtilLov.setValueLovPosition = function setValueLovPosition(id,postionCode) {
//     var inputId = "#"+id;
//     var data = {
//         find:postionCode
//     };
//     var jsonData = AjaxUtil.get({
//         url :session.context+"/central/findPositionByPositionCode",
//         data:data
//     });
//     if(jsonData.positionCode){
//         var key = jsonData.positionCode+" : "+jsonData.positionName;
//         $(inputId).data('data-item',jsonData);
//         $(inputId).data('data-code',jsonData.positionCode);
//         $(inputId).data('data-description',jsonData.positionName);
//         $(inputId).val(key);
//     }
// };

// UtilLov.onChangeInputLovPostion = function onChangeInputLovPostion(input){
//     var inputId = "#"+input.id;
//     var inputVal = $(inputId).val();
//     if(inputVal.trim() ===""){
//         $(inputId).data('data-item',"");
//         $(inputId).data('data-code',"");
//         $(inputId).data('data-description',"");
//     }
// };

// UtilLov.onLoadInputLovPostion = function onLoadInputLovPostion(id){
//     var inputId = "#"+id;
//     var inputVal = $(inputId).val();
//     if(inputVal.trim() ===""){
//         $(inputId).data('data-item',"");
//         $(inputId).data('data-code',"");
//         $(inputId).data('data-description',"");
//     }
//     $(inputId).isLovPositionTypeQuery();
// };

// $.fn.isLovPositionTypeQuery = function () {
//     var inputId = '#'+this.attr('id');
//     LovPositionKeyUpEvent(inputId);
// };

// function LovPositionKeyUpEvent(inputId) {
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
//                 LovPositionQueryEvent(inputId);
//             },1000)
//         };
//     });
// };

// function LovPositionQueryEvent(inputId) {
//     var positionCode = $(inputId).val();
//     var data = {
//         find:positionCode
//     };
//     var jsonData = AjaxUtil.get({
//         url :session.context+"/central/findLovPosition",
//         data:data
//     });
//     $(inputId).typeahead('destroy').typeahead({
//             source: function (query, process) {
//                 var states = [];
//                 var map = {};
//                 $.each(jsonData, function (i, state) {
//                     var key = state.positionCode+" : "+state.positionName;
//                     map[key] = state;
//                     states.push(key);
//                 });
//                 process(states);
//                 $(inputId).data('map',map);

//             },
//             updater: function (item) {
//                 var map = $(inputId).data('map');
//                 $(inputId).data('data-item',map[item]);
//                 $(inputId).data('data-code',map[item].positionCode);
//                 $(inputId).data('data-description',map[item].positionName);
//                 return item;
//             },
//             minLength: 0,
//             items: 20,
//             menu:'<ul id='+inputId.split('#')[1]+'_typeahead_menu class="typeahead dropdown-menu"></ul>',
//     }).focus().val('').keyup().val(positionCode);  
//     LovPositionKeyDownEvent(inputId);
// };

// function LovPositionKeyDownEvent(inputId) {
//     $(inputId).bind('keydown', function (evt) {
//         if(evt.which === 40 && $(inputId+'_typeahead_menu')[0] != undefined){
//             $(inputId+'_typeahead_menu')[0].scrollTop = (($(inputId+'_typeahead_menu li.active').index()) * 26);
//         }
//         if(evt.which === 38 && $(inputId+'_typeahead_menu')[0] != undefined){
//             $(inputId+'_typeahead_menu')[0].scrollTop = (($(inputId+'_typeahead_menu li.active').index()) * 25);
//         }
//     });
//     LovPositionKeyUpEvent(inputId);
// };

