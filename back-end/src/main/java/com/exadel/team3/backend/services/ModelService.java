package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.Model;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ModelService {

    private List<Model> models = new ArrayList<>(Arrays.asList(
            new Model("Model1"),
            new Model("Model2"),
            new Model("Model3")
    ));

    public List<Model> getAllModels(){
        return models;
    }

    public Model getModelByName(String name){
        return models.stream().filter(a -> a.getName().equals(name)).findFirst().get();
    }

    public void addModel(Model model){
        models.add(model);
    }

}
