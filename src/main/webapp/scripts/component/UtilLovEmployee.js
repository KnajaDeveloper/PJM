var LovEmployeeDataItem = "data-item";
var LovEmployeeDataCode = "data-code";
var LovEmployeeDataDescription = "data-description";


UtilLov.onLoadInputLovEmployee = function (id) {
	var inputId = "#" + id;
	LovEmployeeAfterCheckEmpty(inputId);
	LovEmployeeKeyUpEvent(inputId);
};

UtilLov.onLoadInputLovEmployeeFrom = function (id) {
	var inputId = "#" + id;
	LovEmployeeAfterCheckEmpty(inputId);
	LovEmployeeFromKeyUpEvent(inputId);
};

UtilLov.onLoadInputLovEmployeeTo = function (id) {
	var inputId = "#" + id;
	LovEmployeeAfterCheckEmpty(inputId);
	LovEmployeeToKeyUpEvent(inputId);
};

UtilLov.onChangeInputLovEmployee = function (input) {
	var inputId = "#" + input.id;
	LovEmployeeAfterCheckEmpty(input);
};

UtilLov.onChangeInputLovEmployeeFrom = function (input) {
	var inputId = "#" + input.id;
	LovEmployeeAfterCheckEmpty(input);
};

UtilLov.onChangeInputLovEmployeeTo = function (input) {
	var inputId = "#" + input.id;
	LovEmployeeAfterCheckEmpty(input);
};

function LovEmployeeAfterCheckEmpty(inputId) {
	var inputVal = $(inputId).val();
	if (inputVal.trim() === "") {
		$(inputId).data(LovEmployeeDataItem, "");
		$(inputId).data(LovEmployeeDataCode, "");
		$(inputId).data(LovEmployeeDataDescription, "");
	}
};

UtilLov.setValueLovEmployee = function (id, employeeCode) {
	if(employeeCode != "null" && employeeCode != null && employeeCode != undefined && employeeCode.length != 0 ){
		var inputId = "#" + id;
		var data = {
			find: employeeCode
		};
		var jsonData = AjaxUtil.get({
			url: session.context + "/central/findEmployeeByEmployeeCode",
			data: data
		});
		LovEmployeeAfterSetValue(id, jsonData);
	}
};

UtilLov.setValueLovEmployeeFrom = function (id, employeeCode) {
	if(employeeCode != "null" && employeeCode != null && employeeCode != undefined && employeeCode.length != 0 ){
		var inputId = "#" + id;
		var targetId = $("#" + id).attr("data-idemployeeto");
		var targetData = $("#" + targetId).data(LovEmployeeDataCode);
		if (targetData == null || targetData.length == 0) targetData = "*";
		var data = {
			find: LovEmployeeSplitSpaceAndRetrunFirstIdentity(employeeCode),
			employeeCodeTo: LovEmployeeSplitSpaceAndRetrunFirstIdentity(targetData)
		};
		var jsonData = AjaxUtil.get({
			url: session.context + "/central/findLovEmployeeFrom",
			data: data
		});
		LovEmployeeAfterSetValue(id, jsonData);
	}
};

UtilLov.setValueLovEmployeeTo = function (id, employeeCode) {
	if(employeeCode != "null" && employeeCode != null && employeeCode != undefined && employeeCode.length != 0 ){
		var inputId = "#" + id;
		var targetId = $("#" + id).attr("data-idemployeefrom");
		var targetData = $("#" + targetId).data(LovEmployeeDataCode);
		if (targetData == null || targetData.length == 0) targetData = "*";
		var data = {
			find: LovEmployeeSplitSpaceAndRetrunFirstIdentity(employeeCode),
			employeeCodeTo: LovEmployeeSplitSpaceAndRetrunFirstIdentity(targetData)
		};
		var jsonData = AjaxUtil.get({
			url: session.context + "/central/findLovEmployeeTo",
			data: data
		});
		LovEmployeeAfterSetValue(id, jsonData);
	}
};

function LovEmployeeAfterSetValue(id, jsonData) {
	var inputId = "#" + id;
	if (jsonData.length != 0) {
		var key = jsonData[0].empCode + " : " + jsonData[0].thaiName + " " + jsonData[0].thaiLastName;
		$(inputId).data(LovEmployeeDataItem, jsonData[0]);
		$(inputId).data(LovEmployeeDataCode, jsonData[0].empCode);
		$(inputId).data(LovEmployeeDataDescription, jsonData[0].thaiName + " " + jsonData[0].thaiLastName);
		$(inputId).val(key);
	}
};

UtilLov.lovEmployee = function (btn) {
	var inputId = "#" + $("#" + btn.id).attr("target");
	LovEmployeeQueryEvent(inputId);
};

UtilLov.lovEmployeeFrom = function (btn, idTargetLovTo) {
	var inputId = "#" + $("#" + btn.id).attr("target");
	var inputIdTargetLovTo = "#" + idTargetLovTo;
	LovEmployeeFromQueryEvent(inputId, inputIdTargetLovTo);
};

UtilLov.lovEmployeeTo = function (btn, idTargetLovFrom) {
	var inputId = "#" + $("#" + btn.id).attr("target");
	var inputIdTargetLovFrom = "#" + idTargetLovFrom;
	LovEmployeeToQueryEvent(inputId, inputIdTargetLovFrom);
};

function LovEmployeeQueryEvent(inputId) {
	var inputData = $(inputId).val();
	var url = $(inputId).attr("data-url");
	if(url == ""){
		//defualt url
		url = "/central/findLovEmployee";
	}
	var data = {
		find: LovEmployeeSplitSpaceAndRetrunFirstIdentity(inputData)
	};
	var jsonData = AjaxUtil.get({
		url: session.context + url,
		data: data
	});

	LovEmployeeAfterQuery(inputId, jsonData, inputData);
	LovEmployeeKeyDownEvent(inputId);
	LovEmployeeKeyUpEvent(inputId) ;
};

function LovEmployeeFromQueryEvent(inputId, inputIdTargetLovTo) {
	var inputData = $(inputId).val();
	var targetData = $(inputIdTargetLovTo).data(LovEmployeeDataCode);
	if (targetData == null || targetData.length == 0) targetData = "*";
	var data = {
		find: LovEmployeeSplitSpaceAndRetrunFirstIdentity(inputData),
		employeeCodeTo: LovEmployeeSplitSpaceAndRetrunFirstIdentity(targetData)
	};
	var jsonData = AjaxUtil.get({
		url: session.context + "/central/findLovEmployeeFrom",
		data: data
	});
	LovEmployeeAfterQuery(inputId, jsonData, inputData);
	LovEmployeeKeyDownEvent(inputId);
	LovEmployeeFromKeyUpEvent(inputId);
};

function LovEmployeeToQueryEvent(inputId, inputIdTargetLovFrom) {
	var inputData = $(inputId).val();
	var targetData = $(inputIdTargetLovFrom).data(LovEmployeeDataCode);
	if (targetData == null || targetData.length == 0) targetData = "*";
	var data = {
		find: LovEmployeeSplitSpaceAndRetrunFirstIdentity(inputData),
		employeeCodeFrom: LovEmployeeSplitSpaceAndRetrunFirstIdentity(targetData)
	};
	var jsonData = AjaxUtil.get({
		url: session.context + "/central/findLovEmployeeTo",
		data: data
	});
	LovEmployeeAfterQuery(inputId, jsonData, inputData);
	LovEmployeeKeyDownEvent(inputId);
	LovEmployeeToKeyUpEvent(inputId);
};

function LovEmployeeSplitSpaceAndRetrunFirstIdentity(input) {
    return input == null || input == undefined || input.length == 0 ? "*": input.split(" ")[0];
};

function LovEmployeeAfterQuery(inputId, jsonData, dataInput) {
	$(inputId).typeahead("destroy").typeahead({
		source: function (query, process) {
			var states = [];
			var map = {};
			$.each(jsonData, function (i, state) {
				var key = state.empCode + " : " + state.thaiName + " " + state.thaiLastName;
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
			$(inputId).data(LovEmployeeDataItem, map[item]);
			$(inputId).data(LovEmployeeDataCode, map[item].empCode);
			$(inputId).data(LovEmployeeDataDescription, map[item].thaiName + " " + map[item].thaiLastName);
			return item;
		}
	}).focus().val("").keyup().val(dataInput);
};

function LovEmployeeKeyDownEvent(inputId) {
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

function LovEmployeeKeyUpEvent(inputId) {
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
				LovEmployeeQueryEvent(inputId);
			}, 1000)
		}
	});
};

function LovEmployeeFromKeyUpEvent(inputId) {
	var inputIdTargetLovTo = "#" + $(inputId).attr("data-idemployeeto");
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
				LovEmployeeFromQueryEvent(inputId, inputIdTargetLovTo);
			}, 1000)
		}
	});
};

function LovEmployeeToKeyUpEvent(inputId) {
	var inputIdTargetLovFrom = "#" + $(inputId).attr("data-idemployeefrom");
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
				LovEmployeeToQueryEvent(inputId, inputIdTargetLovFrom)
			}, 1000)
		}
	});
};