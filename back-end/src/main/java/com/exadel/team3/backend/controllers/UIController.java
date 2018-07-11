package com.exadel.team3.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/cats")
public class UIController {

    @RequestMapping(value = "/**")
    public void getHtml(HttpServletResponse response){
        try {
            response.sendRedirect("/index.html");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
