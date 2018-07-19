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

    static TestItemStatus checkAnswer(Question question, String answer) {
        if (question.getType() == QuestionType.MANUAL_CHECK_TEXT || question.getVariants() == null)
            return TestItemStatus.UNCHECKED;
        if (StringUtils.isEmpty(answer)) return TestItemStatus.UNANSWERED;

        switch (question.getType()) {
            case SINGLE_VARIANT:
                Integer answerOrdinal;
                try {
                    answerOrdinal = NumberUtils.parseNumber(answer, Integer.class);
                } catch (NumberFormatException nfe) {
                    answerOrdinal = null;
                }
                return (
                        answerOrdinal != null
                                && answerOrdinal < question.getVariants().size()
                                && question.getVariants().get(answerOrdinal).isCorrect()
                )
                        ? TestItemStatus.RIGHT
                        : TestItemStatus.WRONG;

            case MULTI_VARIANT:
                IntStream answerVariants =
                        Pattern.compile("[,;]")
                                .splitAsStream(answer)
                                .mapToInt(i -> {
                                    try {
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
