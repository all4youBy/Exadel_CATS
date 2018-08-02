package com.exadel.team3.backend.dto.mappers;

import com.exadel.team3.backend.dto.TestDTO;
import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.entities.Test;
import com.exadel.team3.backend.entities.TestItem;
import com.exadel.team3.backend.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

public class TestDTOMapper {

    @Autowired
    private QuestionService questionService;

    public TestDTO convertToDTO(Test test){
        List<Question> questions = (List<Question>)questionService.getItems(test.getItems().stream().map(TestItem::getQuestionId).collect(Collectors.toList()));

        TestDTO testDTO = new TestDTO();
        testDTO.setStart(test.getStart());
        testDTO.setTitle(test.getTitle());
        testDTO.setDeadline(test.getDeadline());
        testDTO.setQuestions(questions);
        return testDTO;
    }
}
