var resultEmployee;

function searchLovEmployee(text){
    $("#"+txtId).attr('empCode',"");
    var dataJsonData = {
        text:text
    };
    resultEmployee = $.ajax({
        headers: {
            Accept: "application/json"
        },
        type: "GET",
        url: contextPath + '/central/findEmployeeByText',
        data : dataJsonData,
        complete: function(xhr){
            if(xhr.status === 201 || xhr.status === 200){

            }else if(xhr.status === 500){
                resultProject = null ;
            }
        },
        async: false
    });
    addResultToDDL();
}

function addResultToDDL(){
    removeDataResultSearch();
    if(resultEmployee.responseJSON.length > 0){
        $("#resultSearch").addClass("sbdd_b");
        var html = "<ui role='listbox'>";
        for(var i = 0 ; i < resultEmployee.responseJSON.length ; i++){
            var empCode = resultEmployee.responseJSON[i].empCode ;
            var empFirstName = resultEmployee.responseJSON[i].empFirstName;
            var empLastName = resultEmployee.responseJSON[i].empLastName;
            var empNickName = resultEmployee.responseJSON[i].empNickName;
            var showText = ""+empFirstName+" "+empLastName+" ("+empNickName+")";
            html += "<div id='resultData"+i+"' onmouseover='dataOver(this)' onclick='clickData(this)' onmouseout='dataOut()'"+
                "class='sbsb_c' role='presentation' style='text-align: left;' empCode='"+empCode+"' showData='"+showText+"'>"+
                "<div role='option' class='textResult'>"+
                "<font>"+showText+"</font></div></div></ui>";
        }
        $("#resultSearch").append(html);
    }
}

function removeDataResultSearch(){
    $("#resultSearch").empty();
    $("#resultSearch").removeClass("sbdd_b");
}