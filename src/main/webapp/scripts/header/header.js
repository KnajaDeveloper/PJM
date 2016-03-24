$(document).ready(function(){
    $('#btnLogout').click(function(){
        location.href = contextPath + "/resources/j_spring_security_logout";
    });    
});
