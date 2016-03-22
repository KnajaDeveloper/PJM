package com.app2.app2t.web.pjm;
import com.app2.app2t.domain.pjm.Plan;
import com.app2.app2t.service.EmRestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RequestMapping("/plans")
@Controller
@RooWebScaffold(path = "plans", formBackingObject = Plan.class)
@RooWebJson(jsonObject = Plan.class)
public class PlanController {

    @Autowired
    EmRestService emRestService;

    protected static Logger LOGGER = LoggerFactory.getLogger(PlanController.class);
}
