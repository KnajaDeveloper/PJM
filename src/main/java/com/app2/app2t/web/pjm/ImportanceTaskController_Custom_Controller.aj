package com.app2.app2t.web.pjm;

import com.app2.app2t.domain.pjm.ImportanceTask;
import com.app2.app2t.web.pjm.ImportanceTaskController;
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

privileged aspect ImportanceTaskController_Custom_Controller {
    @RequestMapping(value = "/addtaskimportance", produces = "text/html")
    public String ImportanceTaskController.addtaskimportance(Model uiModel) {
        return "importancetasks/addtaskimportance";
    }
}
