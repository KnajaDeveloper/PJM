var paggination = Object.create(UtilPaggination);

$(document).ready(function(){
  searchData();
});

paggination.setEventPaggingBtn("paggingSimple",paggination);
paggination.loadTable = function loadTable (jsonData) {
    if(jsonData.length <= 0){
        MessageUtil.alertBootBoxMessage({
            title : Message.NotHaveData,
            buttons: {
                cancel: {
                    label:  Button.Approve,
                }
            }
        });
    }

    $('#ResualtSearch').empty();
    var link = "";
    var tableData = "";
    jsonData.forEach(function(value){
        tableData = ''
              +'<tr>'
              + '<td class="text-center">' + value.code + '</td>'
              + '<td>' + value.name + '</td>'
              +'</tr>';

        $('#ResualtSearch').append(
            tableData
        );
    });
};

function searchData(){
  var dataJsonData = {
    
    }

    paggination.setOptionJsonData({
      url:contextPath+"/testfic/testPaggingData",
      data:dataJsonData
    });

    paggination.setOptionJsonSize({
        url:contextPath+"/testfic/testPaggingSize",
        data:dataJsonData
    });

    paggination.search(paggination);
}