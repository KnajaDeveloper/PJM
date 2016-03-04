/**
 * Created by Kiki Kung on 1/3/2559.
 */

_language = commonData.language;

$(document).ready(function () {

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url: contextPath + '/pjmmenus/findAppMenu',
        success: function (data, status, xhr) {
            if (xhr.status === 200) {
                $.each(data, function (k, menu) {
                    var menuName = menu.menu_e_name;
                    if (_language == 'TH') {
                        menuName = menu.menu_t_name;
                    }

                    if (menu.menuLevel == 0) {
                        $('#menubar').append('<li> <a id="menuLv0_' + menu.id + '" href="#">' + menuName + '</a> </li>');
                    } else if (menu.menuLevel == 1) {
                        var elmMenu = $('#menuLv0_' + menu.parent);
                        if (!elmMenu.parent().hasClass('dropdown')) {
                            var elmDropdown = elmMenu.parent().children(':first');
                            var menuDropdownId = elmDropdown[0].id.split('_')[1];
                            elmMenu.parent().addClass('dropdown');
                            elmMenu.parent().append('<ul id="menuLv1_' + menuDropdownId + '" class="dropdown-menu">' +
                                '<li><a id="menuLv2_' + menu.id + '" href="#">' + menuName + '</a></li>' +
                                '</ul>');

                            elmMenu.addClass('dropdown-toggle');
                            elmMenu.attr('data-toggle', 'dropdown');
                            elmMenu.attr('role', 'button');
                            elmMenu.attr('aria-haspopup', 'true');
                            elmMenu.attr('aria-expanded', 'false');
                            elmMenu.append(' <span class="caret"></span>');
                        } else {
                            $('#menuLv1_' + menu.parent).append('<li><a id="menuLv2_' + menu.id + '" href="#">' + menuName + '</a></li>');
                        }
                    } else if (menu.menuLevel == 2) {
                        var elmMenu = $('#menuLv2_' + menu.parent);

                        if (!elmMenu.parent().hasClass('dropdown-submenu')) {
                            var elmDropdown = elmMenu.parent().children(':first');
                            var menuDropdownId = elmDropdown[0].id.split('_')[1];

                            elmMenu.parent().addClass('dropdown-submenu');
                            elmMenu.parent().append('<ul id="menuLv3_' + menuDropdownId + '" class="dropdown-menu">' +
                                '<li><a href="#">' + menuName + '</a></li>' +
                                '</ul>');
                        } else {
                            $('#menuLv3_' + menu.parent).append('<li><a href="#">' + menuName + '</a></li>');
                        }
                    }
                });
            }
        },
        async: false
    });


});