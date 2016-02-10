	$("#checkAll").click(function() {
	    $(".check").prop('checked', $(this).prop('checked'));
	});




	$('[id^=btnM]').click(function() {
	    var id = this.id.split('M')[1];
	    if (id == 'Cancel') {
			$('#add').modal('hide');
	        $('#typeTaskCode').popover('hide');
	        $('#typeTaskName').popover('hide');
	        $('#typeTaskCode').val(null);
	        $('#typeTaskName').val(null);


	    } else {

	        if ($("#typeTaskCode").val() == "") {

	            $("#typeTaskCode").popover('show');

	        } else if ($("#typeTaskName").val() == "") {

	            $("#typeTaskName").popover('show');

	        } else {


	            var typeTask = {
	                typeTaskCode: $("#typeTaskCode").val(),
	                typeTaskName: $("#typeTaskName").val()
	            };


	            var responseHeader = null;
	            $.ajax({
	                type: "POST",
	                contentType: "application/json; charset=utf-8",
	                dataType: "json",
	                headers: {
	                    Accept: "application/json"
	                },
	                url: contextPath + '/typetasks',
	                data: JSON.stringify(typeTask),
	                complete: function(xhr) {
	                    if (xhr.status == 201) {
	                    	if (id == 'Add') {
	                    		$('#add').modal('hide');
	                        	bootbox.alert("บันทึกข้อมูลสำเร็จ");
	                    	} 
	                        
	                        $('#typeTaskCode').val(null);
	                        $('#typeTaskName').val(null);
	                    } else if (xhr.status == 500) {
	                        bootbox.alert("บันทึกข้อมูลไม่สำเร็จ");
	                    }
	                },
	                async: false
	            });

	        }
	    }

	});

