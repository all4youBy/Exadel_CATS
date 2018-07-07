package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.Model;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

@Service
public class ModelService {

    private List<Model> models = new ArrayList<>(Arrays.asList(
            new Model("Model1","This is model"),
            new Model("Model2","This is model"),
            new Model("Model3","This is model")
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

    public void updateModel(String name, Model model) {

        int modelIndex = IntStream.range(0,models.size()).filter(modelId -> models.get(modelId).getName().equals(name)).findFirst().getAsInt();
        models.set(modelIndex,model);
    }

    public void deleteModel(String name) {
        models.removeIf(a -> a.getName().equals(name));
    }
}
