package com.exadel.team3.backend.controllers;


import com.exadel.team3.backend.entities.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/app")
public class TestRestController {

    @RequestMapping("/model")
    @ResponseBody
    public Model getModelJson(@RequestParam(value = "name",defaultValue = "model",required = false) String name){
        return new Model(name);
    }

    @RequestMapping(value = "/*",produces = "text/html")
    public String getHtml(){
        return "redirect:/index.html";
    }
}
