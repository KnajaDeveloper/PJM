package com.app2.app2t.web.pjm;
import com.app2.app2t.domain.pjm.ModuleMember;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;

@RequestMapping("/modulemembers")
@Controller
@RooWebScaffold(path = "modulemembers", formBackingObject = ModuleMember.class)
@RooWebJson(jsonObject = ModuleMember.class)
public class ModuleMemberController {

    protected static Logger LOGGER = LoggerFactory.getLogger(ModuleMemberController.class);
}
