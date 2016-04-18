package com.app2.app2t.web.pjm;
import com.app2.app2t.domain.pjm.FollowerTask;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;

@RequestMapping("/followertasks")
@Controller
@RooWebScaffold(path = "followertasks", formBackingObject = FollowerTask.class)
@RooWebJson(jsonObject = FollowerTask.class)
public class FollowerTaskController {
}
