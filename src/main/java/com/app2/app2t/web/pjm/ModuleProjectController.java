package com.app2.app2t.web.pjm;
import com.app2.app2t.domain.pjm.ModuleProject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;

@RequestMapping("/moduleprojects")
@Controller
@RooWebScaffold(path = "moduleprojects", formBackingObject = ModuleProject.class)
@RooWebJson(jsonObject = ModuleProject.class)
public class ModuleProjectController {
    protected static Logger LOGGER = LoggerFactory.getLogger(ModuleProjectController.class);
}
