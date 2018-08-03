package com.exadel.team3.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/cats")
public class UIController {

    @GetMapping(value = "/**")
    public String getHtml(){
        return "redirect:/index.html";
    }
}
