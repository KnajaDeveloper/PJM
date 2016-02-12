
$.fn.isLovComboBox = function () {
	return this.selectize();
};

$.fn.isTypeComboBox = function () {
	return this.selectize();
};

$.fn.getComboBoxText = function () {
	var _this = this.data().selectize.options[this.val()];
	return _this === undefined || _this === null ? _this : _this.text ;
};

$.fn.getComboBoxValue = function () {
	var _this = this.data().selectize.options[this.val()];
	return _this === undefined || _this === null ? _this : _this.value;
};

$.fn.setComboBoxValue = function (String) {
    var _this = this.data().selectize;
    return _this === undefined || _this === null ? _this : _this.setValue(String);
};