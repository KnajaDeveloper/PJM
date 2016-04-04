package com.app2.app2t.web.pjm;
import com.app2.app2t.domain.pjm.Project;
import com.app2.app2t.service.EmRestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;

@RequestMapping("/projects")
@Controller
@RooWebScaffold(path = "projects", formBackingObject = Project.class)
@RooWebJson(jsonObject = Project.class)
public class ProjectController {

    @Autowired
    EmRestService emRestService;

    protected static Logger LOGGER = LoggerFactory.getLogger(ProjectController.class);
}
