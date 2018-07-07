package com.exadel.team3.backend.controllers;


import com.exadel.team3.backend.entities.Model;
import com.exadel.team3.backend.services.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/app")
public class TestRestController {

    @Autowired
    private ModelService modelService;

    @RequestMapping("/models/{name}")
    @ResponseBody
    public Model getModel(@PathVariable String name){
        return modelService.getModelByName(name);
    }

    @RequestMapping("/models")
    @ResponseBody
    public List<Model> getAllModels(){
     return modelService.getAllModels();
    }

    @RequestMapping(value = "/models",method = RequestMethod.POST)
    @ResponseBody
    public void addModel(@RequestBody Model model){
        modelService.addModel(model);
    }

    @RequestMapping(value = "\\/([-\\w._]+)(\\/[-\\w._]\\?(.+)?)?$/",produces = "text/html")
    public String getHtml(){
        return "redirect:/index.html";
    }

    @RequestMapping(value = "/models/{name}", method = RequestMethod.PUT)
    @ResponseBody
    public void updateModel(@RequestBody Model model, @PathVariable String name){
        modelService.updateModel(name,model);
    }

    @RequestMapping(value = "/models/{name}", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteModel(@PathVariable String name){
        modelService.deleteModel(name);
    }
}
