package com.app2.app2t.web.pjm;
import com.app2.app2t.domain.pjm.ImportanceTask;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;

@RequestMapping("/importancetasks")
@Controller
@RooWebScaffold(path = "importancetasks", formBackingObject = ImportanceTask.class)
@RooWebJson(jsonObject = ImportanceTask.class)
public class ImportanceTaskController {
}
