package com.app2.app2t.web.report;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@RequestMapping("/reports")
@Controller
public class ReportController {
    @RequestMapping(value = "/report001", produces = "text/html")
    public String report001(Model uiModel) {

        return "reports/report001";
    }


}