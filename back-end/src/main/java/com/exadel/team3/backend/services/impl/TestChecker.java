package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.entities.QuestionType;
import com.exadel.team3.backend.entities.QuestionVariant;
import com.exadel.team3.backend.entities.TestItemStatus;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

class TestChecker {

    static TestItemStatus check(Question question, List<String> answers) {
        if (question.getType() == QuestionType.MANUAL_CHECK_TEXT || question.getVariants() == null)
            return TestItemStatus.UNCHECKED;
        if (CollectionUtils.isEmpty(answers)) return TestItemStatus.UNANSWERED;

        switch (question.getType()) {
            case SINGLE_VARIANT:
                return (
                        question.getVariants()
                                .stream()
                                .anyMatch(v -> v.getText().equals(answers.get(0)) && v.isCorrect())
                )
                        ? TestItemStatus.RIGHT
                        : TestItemStatus.WRONG;

            case MULTI_VARIANT:
                return (
                        question.getVariants()
                                .stream()
                                .filter(variant -> answers.contains(variant.getText()) && variant.isCorrect())
                                .count() == answers.size()
                )
                        ? TestItemStatus.RIGHT
                        : TestItemStatus.WRONG;

            case AUTOCHECK_TEXT:
                Optional<String> correctAnswer = question.getVariants()
                        .stream()
                        .filter(QuestionVariant::isCorrect)
                        .map(QuestionVariant::getText)
                        .map(String::trim)
                        .findFirst();
                if (!correctAnswer.isPresent()) return TestItemStatus.UNCHECKED;
                String answer = answers.get(0);
                if (StringUtils.isEmpty(answer)) return TestItemStatus.WRONG;
                if (correctAnswer.get().startsWith("/") && correctAnswer.get().endsWith("/")) {
                    return answer.matches(
                            correctAnswer.get().substring(1, correctAnswer.get().length() - 2)
                    )
                            ? TestItemStatus.RIGHT
                            : TestItemStatus.WRONG;
                } else {
                    return answer.equalsIgnoreCase(correctAnswer.get())
                            ? TestItemStatus.RIGHT
                            : TestItemStatus.WRONG;
                }
        }
        return TestItemStatus.UNCHECKED;
    }

}
