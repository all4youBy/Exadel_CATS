package com.exadel.team3.backend.controllers.requests;

import com.exadel.team3.backend.entities.QuestionComplexity;
import com.exadel.team3.backend.entities.QuestionType;
import com.exadel.team3.backend.entities.QuestionVariant;
import lombok.Data;
import org.bson.types.ObjectId;

import java.util.List;

@Data
public class AddQuestionRequest{

    private QuestionType questionType;
    private String text;
    private QuestionComplexity questionComplexity;
    private List<QuestionVariant> questionVariants;
    private List<ObjectId> topicsId;
    private String author;
    private boolean training;
}
