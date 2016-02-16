package com.app2.app2t.web.pjm;
import com.app2.app2t.domain.pjm.Program;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;

@RequestMapping("/programs")
@Controller
@RooWebScaffold(path = "programs", formBackingObject = Program.class)
@RooWebJson(jsonObject = Program.class)
public class ProgramController {
}
