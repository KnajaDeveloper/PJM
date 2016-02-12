$("#checkAll").click(function () {
    $(".check").prop('checked', $(this).prop('checked'));
});


$('[id^=btnM]').click(function () {
    var id = this.id.split('M')[1];
    if (id == 'Cancel') {

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


            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url: contextPath + '/typetasks',
                data: JSON.stringify(typeTask),
                complete: function (xhr) {
                    if (xhr.status == 201) {
                        if (id == 'Add') {
                            $('#add').modal('hide');
                            bootbox.alert("บันทึกข้อมูลสำเร็จ");
                        }

                        $('#typeTaskCode').val(null);
                        $('#typeTaskName').val(null);
                    } else if (xhr.status == 500) {

                    }
                },
                async: false /*ต้องใส่*/
            });

        }
    }

});


$('#search').click(function () {

    var responseHeader = $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/typetasks/findAllProject',
        data: {
            findTypeCode: $('#sTypeTaskCode').val(),
            findTypeName: $('#sTypeTaskName').val()
        },
        complete: function (xhr) {

        },
        async: false /*ต้องใส่*/
    });


    var Obj = jQuery.parseJSON(responseHeader.responseText);
    var tableData;

    $('#tbody').empty();

    $.each(Obj, function(kay, val) {
        tableData = '<tr>'
            + '<td class="text-center">'
            + '<input class="check" type="checkbox" id="checkDelete"/>'
            + '</td>'
            + '<td class="text-center">'
            + '<button id="btnEdit" type="button" class="btn btn-info" data-toggle="modal" data-target="#edit" data-backdrop="static"><span  class="glyphicon glyphicon-pencil" aria-hidden="true" ></span></button>'
            + '</td>'
            + '<td id="tdTypeTaskCode">'
            + val["typeTaskCode"]
            + '</td>'
            + '<td id="tdTypeTaskName">'
            + val["typeTaskName"]
            + '</td>'
            + '</tr>';

        $('#tbody').append(
            tableData
        );
    });
});

$('#search').click(function () {

});




