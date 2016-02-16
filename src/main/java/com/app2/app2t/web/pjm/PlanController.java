package com.app2.app2t.web.pjm;
import com.app2.app2t.domain.pjm.Plan;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;

@RequestMapping("/plans")
@Controller
@RooWebScaffold(path = "plans", formBackingObject = Plan.class)
@RooWebJson(jsonObject = Plan.class)
public class PlanController {
}
