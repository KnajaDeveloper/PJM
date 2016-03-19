$(document).ready(function () {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/menus/findAppMenu',
        success: function (data, status, xhr) {
            if (xhr.status === 200) {
                
                $('#menuContainer').empty();

                $.each(data, function (key, menu) {
                    var menuName = menu.menu_e_name;
                    if (commonData.language == 'TH') {
                        menuName = menu.menu_t_name;
                    }

                    if (menu.menuLevel == 0) {
                        $('#menuContainer').append('<li><a menuLv0="'+ menu.id +'" href="'+menu.link+'"><span class="icon fa '+ menu.menuIcon +'"></span><span class="title">'+ menuName +'</span></a></li>');
                    } else if (menu.menuLevel == 1) {
                        var menuLv0 = $('[menuLv0='+ menu.parent +']');
                        menuLv0.attr('data-toggle', 'collapse');

                        if (menuLv0.parent().hasClass('dropdown')) {
                            $('#dropdown_menuLv0_' + menu.parent).children().children().append('<li><a menuLv1="'+ menu.id +'" href="'+menu.link+'">'+ menuName +'</a></li>');
                        } else {
                            menuLv0.parent().addClass('panel panel-default dropdown');
                            menuLv0.attr('href', '#dropdown_menuLv0_' + menuLv0.attr('menuLv0'));
                            menuLv0.parent().append('<div id="dropdown_menuLv0_' + menuLv0.attr('menuLv0') + '" class="panel-collapse collapse"> \n\
                                <div class="panel-body"> \n\
                                <ul class="nav navbar-nav"> \n\
                                <li><a menuLv1="'+ menu.id +'" href="'+ menu.link +'">'+ menuName +'</a></li> \n\
                                </ul> \n\
                                </div>');
                        }
                    } else if (menu.menuLevel == 2) {
                        var menuLv1 = $('[menuLv1='+ menu.parent +']');
                        menuLv1.attr('data-toggle', 'collapse');
                        
                        if (menuLv1.parent().hasClass('dropdown')) {
                            $('#dropdown_menuLv1_' + menu.parent).children().children().append('<li><a menuLv2="'+ menu.id +'" href="'+ menu.link +'">'+ menuName +'</a></li>');
                        } else {
                            menuLv1.parent().addClass('panel panel-default dropdown dropdown2');
                            menuLv1.attr('href', '#dropdown_menuLv1_' + menuLv1.attr('menuLv1'));
                            menuLv1.parent().append('<div id="dropdown_menuLv1_' + menuLv1.attr('menuLv1') + '" class="panel-collapse collapse"> \n\
                                <div class="panel-body"> \n\
                                <ul class="nav navbar-nav"> \n\
                                <li><a menuLv2="'+ menu.id +'" href="'+ menu.link +'">'+ menuName +'</a></li> \n\
                                </ul> \n\
                                </div>');
                        }
                    }
                });
            }
        },
        async: false
    });
});