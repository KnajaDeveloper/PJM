package com.app2.app2t.web.pjm;
import com.app2.app2t.domain.pjm.OtherTask;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;

@RequestMapping("/othertasks")
@Controller
@RooWebScaffold(path = "othertasks", formBackingObject = OtherTask.class)
@RooWebJson(jsonObject = OtherTask.class)
public class OtherTaskController {

    protected Logger LOGGER = LoggerFactory.getLogger(OtherTaskController.class);
}
