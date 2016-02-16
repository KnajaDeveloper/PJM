package com.app2.app2t.web.pjm;
import com.app2.app2t.domain.pjm.TypeTask;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/typetasks")
@Controller
@RooWebScaffold(path = "typetasks", formBackingObject = TypeTask.class)
@RooWebJson(jsonObject = TypeTask.class)
public class TypeTaskController {

    protected Logger LOGGER = LoggerFactory.getLogger(TypeTaskController.class);
}
