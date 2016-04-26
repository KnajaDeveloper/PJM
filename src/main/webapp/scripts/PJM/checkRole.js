function  roleProject (projectId,moduleProjectId) {

    var responseResult = null;
	var dataJsonData = {
        projectId: projectId,
        moduleProjectId : moduleProjectId
    }
    responseResult = $.ajax({
        type: "POST",
        url: contextPath + '/projectmanagers/checkRoleProjects',
        data: dataJsonData,

        complete: function (xhr) {
            if (xhr.status === 200) {
               
            } else if (xhr.status === 500) {
               
            }
        },
        async: false
    });
  var  result = jQuery.parseJSON(responseResult.responseText);
  return result ;
}


function  roleProjectAndModuleProject (projectId) {

    var responseResult = null;
    var dataJsonData = {
        projectId: projectId
    }
    responseResult = $.ajax({
        type: "POST",
        url: contextPath + '/projectmanagers/checkRolePmAndMm',
        data: dataJsonData,

        complete: function (xhr) {
            if (xhr.status === 200) {

            } else if (xhr.status === 500) {

            }
        },
        async: false
    });
    var  result = jQuery.parseJSON(responseResult.responseText);
    return result ;
}
