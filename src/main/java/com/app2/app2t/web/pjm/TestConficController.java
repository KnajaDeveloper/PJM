package com.app2.app2t.web.pnm;

import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RequestMapping("/testfic")
@Controller
public class TestConficController {

    @RequestMapping(value="/testfic",method = RequestMethod.GET, produces = "text/html")
    public String testfic(Model uiModel) {

        return "testfic/testfic";
    }
}
