package com.app2.app2t.web.pjm;
import com.app2.app2t.domain.pjm.TypeTask;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;

@RequestMapping("/typetasks")
@Controller
@RooWebScaffold(path = "typetasks", formBackingObject = TypeTask.class)
@RooWebJson(jsonObject = TypeTask.class)
public class TypeTaskController {
}
