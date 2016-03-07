package com.app2.app2t.web.pjm;

import com.app2.app2t.service.EmRestService;
import com.app2.app2t.service.SecurityRestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RequestMapping("/menus")
@Controller
public class PJMMenuController {
	@Autowired
    EmRestService emRestService;
    @Autowired
    SecurityRestService securityRestService;
    protected Logger LOGGER = LoggerFactory.getLogger(PJMMenuController.class);
}
