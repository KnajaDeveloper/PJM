var paggination = Object.create(UtilPaggination);
var checkSearch = false;

$('#btnSearch').click(function() {
	searchData();
	checkSearch = true;
});

function searchData() {
  	var dataJsonData = {
  		importanceCode:$('#txtSearchImportanceCode').val(),
		importanceName:$('#txtSearchImportanceName').val()
    }

    paggination.setOptionJsonData({
      	url:contextPath + "/importancetasks/findPaggingData",
      	data:dataJsonData
    });

    paggination.setOptionJsonSize({
        url:contextPath + "/importancetasks/findPaggingSize",
        data:dataJsonData
    });

    paggination.search(paggination);
}

paggination.setEventPaggingBtn("paggingSimple", paggination);
paggination.loadTable = function loadTable (jsonData) {

   	$('#ResualtSearch').empty();

   	if(jsonData.length <= 0){
        $('#ResualtSearch').append('<tr><td colspan = 4 class="text-center">' + Message.MSG_DATA_NOT_FOUND + '</td></tr>');
    }

   	$('#checkboxAll').prop('checked', false);

    var tableData = "";

    jsonData.forEach(function(value){
        tableData = ''
		+ '<tr>'
            + '<td class="text-center">'
			+ '<input inUse="' + (value.inUse > 0 ? 1 : 0) + '" id="' + value.id + '" class="checkboxTable" type="checkbox" />'
			+ '</td>'
            + '<td class="text-center">'
            	+ '<button onclick="openModalEdit($(this))" type="button" class="btn btn-xs btn-info" data-toggle="modal" data-target="#add" data-backdrop="static"><span name="editClick" class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="tdImportanceCode" class="text-center">' + value.importanceCode + '</td>'
            + '<td id="tdImportanceName" class="">' + value.importanceName + '</td>'
        + '</tr>';

        $('#ResualtSearch').append(tableData);
    });
};

var importanceName;

function openModalEdit(element){
	check = 1;
	$('#btnModalNext').hide();
	$('.modal-title').text(Label.LABEL_EDIT_IMPORTANCE);
    $('#txtImportanceCode').val(element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdImportanceCode").text()).attr('disabled', true).popover('hide');;
    importanceName = element.parent("td:eq(0)").parent("tr:eq(0)").children("#tdImportanceName").text();
    $('#txtImportanceName').val(importanceName).popover('hide');
}

// function checkEMimportanceCode() {
//   	var elem = document.getElementById('txtImportanceCode').value;
//   	if(!elem.match(/^([a-z0-9\_])+$/i)){
//   		$('#txtImportanceCode').attr("data-content" , Message.PLEASE_ENTER_THE_CODE_AS_a_TO_z_OR_A_TO_Z_OR_0_TO_9).popover('show');
//   		return false;
//   	}else{
//   		return true;
//   	}
//  };

var check = 0;

$('[id^=btnModal]').click(function() {
	var id = this.id.split('l')[1];
	if(id === 'Cance'){
		if(check == 1){
            if($('#txtImportanceName').val() == importanceName){
                $('#add').modal('hide');
				$('#txtImportanceCode').popover('hide'); $('#txtImportanceName').popover('hide');
				$('#txtImportanceCode').val(null); $('#txtImportanceName').val(null);
            }else{
                bootbox.confirm(Message.MSG_WANT_TO_CANCEL_EDITING_THE_DATA_HAS_CHANGED_OR_NOT, function(result) {
                    if(result == true){
                        $('#add').modal('hide');
						$('#txtImportanceCode').popover('hide'); $('#txtImportanceName').popover('hide');
						$('#txtImportanceCode').val(null); $('#txtImportanceName').val(null);
                    }
                });
            }
        }else{
            $('#add').modal('hide');
            $('#txtImportanceCode').val(null);
            $('#txtImportanceName').val(null);
        }
	}else{
		if($('#txtImportanceCode').val() == ""){
			$('#txtImportanceCode').attr("data-content" , Message.MSG_PLEASE_FILL).popover('show');
		}else if($('#txtImportanceName').val()  == ""){
			$('#txtImportanceName').popover('show');
		}else{
			var dataJsonData = {
				importanceTaskCode: $('#txtImportanceCode').val(),
				importanceTaskName: $('#txtImportanceName').val()
			};

			if(check == 0){
				if(checkData() == 0){
					$.ajax({
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						headers: {
							Accept: "application/json"
						},
						type: "POST",
						url: contextPath + '/importancetasks',
						data : JSON.stringify(dataJsonData),
						complete: function(xhr){
							if(xhr.status == 201){
								if(id == 'Save'){
									bootbox.alert(Message.MSG_SAVE_SUCCESS);
									$('#add').modal('hide');
								}
								$('#txtImportanceCode').val(null);
								$('#txtImportanceName').val(null);
								if(checkSearch == true){
									var pageNumber = $("#paggingSimpleCurrentPage").val();
									searchData();
									paggination.loadPage(pageNumber, paggination);
								}
							}else if(xhr.status == 500 || xhr.status == 0){
								bootbox.alert(Message.MSG_SAVE_FAILED );
							}
						},
						async: false
					});
				}else{
					bootbox.alert(Message.MSG_PLEASE_ENTER_A_NEW_IMPORTANCE_CODE);
				}
			}else if(check == 1){
				if($('#txtImportanceName').val() == importanceName){
					bootbox.alert(Message.MSG_NO_INFORMATION_CHANGED);
				}else{
					$.ajax({
						type: "POST",
						headers: {
							Accept: "application/json"
						},
						url: contextPath + '/importancetasks/findeditImportance',
						data : dataJsonData,
						complete: function(xhr){
							if(xhr.status === 200){
								bootbox.alert(Message.MSG_EDIT_SUCCESSFULLY);
								$('#add').modal('hide');
								$('#txtImportanceCode').val(null);
								$('#txtImportanceName').val(null);
								var pageNumber = $("#paggingSimpleCurrentPage").val();
								paggination.loadPage(pageNumber, paggination);
							}else if(xhr.status === 500 || xhr.status == 0){
								bootbox.alert(Message.MSG_EDIT_UNSUCCESSFUL);
							}
						},
						async: false
					});
				}
			}
		}
	}
});

$('#btnAdd').click(function() {
	check = 0;
	$(".modal-title").text(Label.LABEL_ADD_IMPORTANCE);
	$('#btnModalNext').show();
	$('#txtImportanceCode').attr('disabled', false).popover('hide');
	$('#txtImportanceName').popover('hide');
});

var status0 = 0;
var status200 = 0;
var status500 = 0;

function deleteData() {
	$.each($(".checkboxTable:checked"),function(index,value){
	    $.ajax({
			type: "POST",
			headers: {
				Accept: "application/json"
			},
			url: contextPath + '/importancetasks/findDeleteImportance',
			data : {
				importanceID: $(this).attr("id")
			},
			complete: function(xhr){
				if(xhr.status == 0)
					status0++;
				if(xhr.status == 200)
					status200++;
				if(xhr.status == 500)
					status500++;
			},
			async: false
		});
	});
}

$('#btnDelete').click(function() {
	if($(".checkboxTable:checked").length <= 0){
            bootbox.alert(Message.MSG_PLEASE_SELECT_THE_DATA_TO_BE_DELETED);
            return false;
    }else{
    	bootbox.confirm(Message.MSG_DO_YOU_WANT_TO_REMOVE_THE_SELECTED_ITEMS, function(result) {
			if(result == true){
				deleteData();

				if(status0 > 0){
					bootbox.alert(Message.MSG_DELETE_FAILED);
				}else if(status500 == 0){
					bootbox.alert(Message.MSG_DELETE_SUCCESS + " " + status200 + " " + Message.MSG_LIST);
				}else{
					bootbox.alert(Message.MSG_DELETE_SUCCESS + " " + status200 + " " + Message.MSG_LIST + " " + Message.MSG_DELETE_FAILED + " " + status500 + " " + Message.MSG_LIST);
				}

				status0 = 0;
				status200 = 0;
				status500 = 0;

				var pageNumber = $("#paggingSimpleCurrentPage").val();
				searchData();
				paggination.loadPage(pageNumber, paggination);

				$('#checkboxAll').prop('checked', false);
			}
		});
    }
});

function checkData() {
    var checkdDb = $.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			Accept: "application/json"
		},
		url: contextPath + '/importancetasks/findCheckimportanceCode',
		data : {
			importanceCode:$('#txtImportanceCode').val()
		},
		complete: function(xhr) {
		},

		async: false
	});

	if(checkdDb.responseJSON == null){
		return 0;
	}

    return checkdDb.responseJSON + "";
}

$("#checkboxAll").click(function(){
	if($(".checkboxTable[inUse=0]").length == 0){
        bootbox.alert(Message.MSG_DATA_ALL_IN_USED);
        $(this).prop("checked", false);
    }
    $(".checkboxTable").prop('checked', $(this).prop('checked'));
    $.each($(".checkboxTable[inUse=1]"),function(index, value){
        $(this).prop("checked", false);
    });
});

$('#Table').on("click", ".checkboxTable", function () {
	if($(this).attr("inUse") > 0){
    	$(this).prop("checked", false);
    	bootbox.alert(Message.MSG_INUSE);
    }
    if($(".checkboxTable:checked").length == $(".checkboxTable[inUse=0]").length && $(".checkboxTable[inUse=0]").length != 0){
        $("#checkboxAll").prop("checked", true);
    }else{
        $("#checkboxAll").prop("checked", false);
    }
});