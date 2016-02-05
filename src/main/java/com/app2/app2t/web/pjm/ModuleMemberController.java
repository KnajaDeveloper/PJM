package com.app2.app2t.web.pjm;
import com.app2.app2t.domain.pjm.ModuleMember;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/modulemembers")
@Controller
@RooWebScaffold(path = "modulemembers", formBackingObject = ModuleMember.class)
public class ModuleMemberController {
}
