// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.web.pjm;

import com.app2.app2t.domain.pjm.ModuleProject;
import com.app2.app2t.domain.pjm.Project;
import com.app2.app2t.web.pjm.ModuleProjectController;
import java.io.UnsupportedEncodingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.UriUtils;
import org.springframework.web.util.WebUtils;

privileged aspect ModuleProjectController_Custom_Controller {
    @RequestMapping(value = "/detailsModule", produces = "text/html")
    public String ModuleProjectController.detailsModule(Model uiModel) {
        return "moduleprojects/detailsModule";
    }
}