package com.app2.app2t.web.pjm;

import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.app2.app2t.service.EmRestService;

@RequestMapping("/testfic")
@Controller
public class TestConficController {

	@Autowired
	EmRestService emRestService;

	protected Logger LOGGER = LoggerFactory.getLogger(TypeTaskController.class);

    @RequestMapping(value="/testfic",method = RequestMethod.GET, produces = "text/html")
    public String testfic(Model uiModel) {

        return "testfic/testfic";
    }
}
