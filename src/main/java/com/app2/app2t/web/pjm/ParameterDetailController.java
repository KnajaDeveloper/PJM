package com.app2.app2t.web.pjm;
import com.app2.app2t.domain.ParameterDetail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;

@RequestMapping("/parameterdetails")
@Controller
@RooWebScaffold(path = "parameterdetails", formBackingObject = ParameterDetail.class)
@RooWebJson(jsonObject = ParameterDetail.class)
public class ParameterDetailController {

    protected Logger LOGGER = LoggerFactory.getLogger(TaskController.class);
}
