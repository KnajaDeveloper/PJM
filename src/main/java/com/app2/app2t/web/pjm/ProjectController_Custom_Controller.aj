// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.app2.app2t.web.pjm;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import com.app2.app2t.domain.pjm.*;
import java.io.UnsupportedEncodingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.UriUtils;
import org.springframework.web.util.WebUtils;
privileged aspect ProjectController_Custom_Controller {

	@RequestMapping(value = "/searchproject", produces = "text/html")
    public String ProjectController.typetask(Model uiModel) {
     
        return "projects/searchproject";
    }

    @RequestMapping(value = "/createproject", produces = "text/html")
    public String ProjectController.createproject(Model uiModel) {
     
        return "projects/createproject";
    }
   //      @RequestMapping(value = "/progressproject", produces = "text/html")
   //  public String ProjectController.progressproject(Model uiModel)
   // // ,
   //    //  @RequestParam(value = "projectCode", required = false) String projectCode
   //  //) 
   //  {
   //      //uiModel.addAttribute("projectCode", projectCode);
   //      return "projects/progressproject";
   //  }

     @RequestMapping(value = "/progressproject", produces = "text/html")
    public String ProjectController.progressproject(Model uiModel,
        @RequestParam(value = "projectCode", required = false) String project
    ) {
        uiModel.addAttribute("projectCode", project);
        return "projects/progressproject";
    }
}