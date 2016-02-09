package com.app2.app2t.web.pjm;
import com.app2.app2t.domain.pjm.ProjectManager;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;

@RequestMapping("/projectmanagers")
@Controller
@RooWebScaffold(path = "projectmanagers", formBackingObject = ProjectManager.class)
@RooWebJson(jsonObject = ProjectManager.class)
public class ProjectManagerController {
}
