package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.entities.QuestionType;
import com.exadel.team3.backend.entities.QuestionVariant;
import com.exadel.team3.backend.entities.TestItemStatus;
import org.springframework.util.NumberUtils;
import org.springframework.util.StringUtils;

import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.IntStream;

class TestChecker {

    static TestItemStatus check(Question question, String answerData) {
        if (question.getType() == QuestionType.MANUAL_CHECK_TEXT || question.getVariants() == null)
            return TestItemStatus.UNCHECKED;
        if (StringUtils.isEmpty(answerData)) return TestItemStatus.UNANSWERED;

        switch (question.getType()) {
            case SINGLE_VARIANT:
                int answer;
                try {
                    answer = Integer.parseInt(answerData);
                } catch (NumberFormatException nex) {
                    answer =-1;
                }

                return (
                        answer >= 0
                                && answer < question.getVariants().size()
                                && question.getVariants().get(answer).isCorrect()
                )
                        ? TestItemStatus.RIGHT
                        : TestItemStatus.WRONG;

            case MULTI_VARIANT:
                IntStream answerVariants =
                        Pattern.compile("[,;]")
                                .splitAsStream(answerData)
                                .mapToInt(i -> {try {
                                    return NumberUtils.parseNumber(i, Integer.class);
                                } catch (NumberFormatException ex) {
                                    return -1;
                                }
                                })
                                .filter(i -> i>=0);
                return (
                        answerVariants.count() ==
                                question.getVariants().stream().filter(QuestionVariant::isCorrect).count()
                                && answerVariants.allMatch(
                                variant -> variant < question.getVariants().size()
                                        && question.getVariants().get(variant).isCorrect()
                        )
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
                if (correctAnswer.get().startsWith("/") && correctAnswer.get().endsWith("/")) {
                    return answerData.matches(
                            correctAnswer.get().substring(1, correctAnswer.get().length() - 2)
                    )
                            ? TestItemStatus.RIGHT
                            : TestItemStatus.WRONG;
                } else {
                    return answerData.equalsIgnoreCase(correctAnswer.get())
                            ? TestItemStatus.RIGHT
                            : TestItemStatus.WRONG;
                }


        }
        return TestItemStatus.UNCHECKED;
    }

}
