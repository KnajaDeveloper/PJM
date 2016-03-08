var pagginationProgram = $.extend({},UtilPaggination);

pagginationProgram.setEventPaggingBtn("paggingSimpleProgram",pagginationProgram);
pagginationProgram.loadTable = function loadTable (jsonData) {

    if(jsonData.length <= 0)
       bootbox.alert("ไม่พบข้อมูลโปรแกรม");

   $('#checkboxAllProgram').prop('checked', false);
    $('#ResualtSearchProgram').empty();
    var link = "";
    var i = 1;
    var tableData = "";

    jsonData.forEach(function(value){

    	var dataJsonData = {
  			program: value.code
    	}

        var checkdDb = $.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			headers: {
				Accept: "application/json"
			},
			url: contextPath + '/tasks/findCheckProgramCode',
			data: dataJsonData,
			complete: function(xhr){
			},
			async: false
		});

		checkdDb = checkdDb.responseJSON;

		var chkDB = false;
		if(checkdDb > 0){
			chkDB = true;
		}

        tableData = ''
		+ '<tr id="trProgram' + i + '" style="background-color: #fff">'
            + '<td class="text-center">'
            + '<input chkBoxDB' + i + '="' + chkDB +'" id="chkDeleteProgram' + i + '" class="checkProgram" type="checkbox" name="chkdelete" />'
            + '</td>'
            + '<td class="text-center">'
            + '<button id="btnEditProgram' + i + '" type="button" class="btn btn-info" data-toggle="modal" data-target="#modalProgram" data-backdrop="static"><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="tdProgramCode' + i + '" class="text-center" onclick="onClickTrProgram(this)">'
            + value.code
            + '</td>'
            + '<td id="tdProgramName' + i++ + '" class="text-center" onclick="onClickTrProgram(this)">'
            + value.name
            + '</td>'
        + '</tr>';

        $('#ResualtSearchProgram').append(
            tableData
        );
    });
};

function searchDataProgram() {
  	var dataJsonData = {
  		id: id
    }

    pagginationProgram.setOptionJsonData({
      	url:contextPath + "/programs/findPaggingDataProgram",
      	data:dataJsonData
    });

    pagginationProgram.setOptionJsonSize({
        url:contextPath + "/programs/findPaggingSizeProgram",
        data:dataJsonData
    });

    pagginationProgram.search(pagginationProgram);
}

var checkProgramName;

$('#TableProgram').on("click", "[id^=btnEditProgram]", function () {
	chkAEProgram = 1;
    var id = this.id.split('m')[1];
    $('#btnModalProgramNext').hide();
	$(".modal-title").text("แก้ไขโปรแกรม");
	$('#txtProgramCode').val($('#tdProgramCode' + id).text()).attr('disabled', true);
	checkProgramName = $('#tdProgramName' + id).text();
	$('#txtProgramName').val($('#tdProgramName' + id).text());
});

var ProgramCode;
var idPC;

function onClickTrProgram(object) {
    var id = object.id.split('e')[1];

    ProgramCode = $('#tdProgramCode' + id).text();
    searchDataTask();
  	$('#checkboxAllTask').prop('checked', false);
  	$('#lblEmpName').text("");
	$('#lblTaskName').text("");
	$('#lblSDate').text("");
	$('#lblEDate').text("");
	$('#txtaDetail').val(null);

	idPC = id;

	var lengthTr = $('#TableProgram').find('tr').length;
    for (var i = 1; i < lengthTr; i++) {
		$('#trProgram' + i).css('background-color', '#FFF');
	}

	$('#trProgram' + id).css('background-color', '#F5F5F5');
}