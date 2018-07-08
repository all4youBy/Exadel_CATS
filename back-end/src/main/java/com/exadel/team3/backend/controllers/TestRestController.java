package com.exadel.team3.backend.controllers;


import com.exadel.team3.backend.entities.Model;
import com.exadel.team3.backend.services.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/app")
public class TestRestController {

    @Autowired
    private ModelService modelService;

    @GetMapping("/models/{name}")
    public Model getModel(@PathVariable String name){
        return modelService.getModelByName(name);
    }

    @GetMapping("/models")
    public List<Model> getAllModels(){
     return modelService.getAllModels();
    }

    @PostMapping(value = "/models")
    public void addModel(@RequestBody Model model){
        modelService.addModel(model);
    }


    @PutMapping(value = "/models/{name}")
    public void updateModel(@RequestBody Model model, @PathVariable String name){
        modelService.updateModel(name,model);
    }

    @DeleteMapping(value = "/models/{name}")
    public void deleteModel(@PathVariable String name){
        modelService.deleteModel(name);
    }
}
