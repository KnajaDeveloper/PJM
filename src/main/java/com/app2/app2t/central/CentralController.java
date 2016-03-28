package com.app2.app2t.central;

import com.app2.app2t.service.EmRestService;
import com.app2.app2t.service.SecurityRestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/central")
@Controller
public class CentralController {
    @Autowired
    EmRestService emRestService;
    @Autowired
    SecurityRestService securityRestService;
    protected Logger LOGGER = LoggerFactory.getLogger(CentralController.class);
}
