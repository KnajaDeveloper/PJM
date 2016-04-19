package com.app2.app2t.web.pjm;
import com.app2.app2t.domain.AppParameter;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;

@RequestMapping("/appparameters")
@Controller
@RooWebScaffold(path = "appparameters", formBackingObject = AppParameter.class)
@RooWebJson(jsonObject = AppParameter.class)
public class AppParameterController {
}
