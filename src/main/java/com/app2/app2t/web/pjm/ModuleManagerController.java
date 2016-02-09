package com.app2.app2t.web.pjm;
import com.app2.app2t.domain.pjm.ModuleManager;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;

@RequestMapping("/modulemanagers")
@Controller
@RooWebScaffold(path = "modulemanagers", formBackingObject = ModuleManager.class)
@RooWebJson(jsonObject = ModuleManager.class)
public class ModuleManagerController {
}
