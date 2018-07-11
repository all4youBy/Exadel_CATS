package com.exadel.team3.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@RequestMapping("/cats")
public class UIController {

    @GetMapping(value = "/**")
    public String getHtml(){
       return "redirect:/index.html";
    }

}
