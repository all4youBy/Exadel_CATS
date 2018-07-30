package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.entities.Test;
import com.exadel.team3.backend.entities.TestItemStatus;
import org.bson.types.ObjectId;

public interface TestChecker {
    TestItemStatus checkAnswer(ObjectId questionId, String answer) throws  ServiceException;
    TestItemStatus checkAnswer(Question question, String answer);
    Integer checkTest(Test test);
}
