function roleProject (projectId,emCode) {
	var dataJsonData = {
        projectId: projectId,
        emCode : emCode

    }
    $.ajax({
        type: "POST",
        url: contextPath + '/projectmanagers/checkRoleProjects',
        data: dataJsonData,

        complete: function (xhr) {
            if (xhr.status === 200) {
                DeSuccess++;

            } else if (xhr.status === 500) {
                DeFail++;

            }
        },
        async: false
    });
}