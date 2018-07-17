package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.entities.QuestionType;
import com.exadel.team3.backend.entities.QuestionVariant;
import com.exadel.team3.backend.entities.TestItemStatus;
import org.apache.commons.validator.routines.IntegerValidator;
import org.springframework.util.StringUtils;

import java.util.Objects;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Stream;

public class AnswerChecker {
    public static TestItemStatus check(Question question, String answerData) {
        if (question.getType() == QuestionType.MANUAL_CHECK_TEXT || question.getVariants() == null)
            return TestItemStatus.UNCHECKED;
        if (StringUtils.isEmpty(answerData)) return TestItemStatus.UNANSWERED;

        switch (question.getType()) {
            case SINGLE_VARIANT:
                Integer answer = IntegerValidator.getInstance().validate(answerData);
                return (answer != null && answer < question.getVariants().size()
                        && question.getVariants().get(answer).isCorrect())
                            ? TestItemStatus.RIGHT
                            : TestItemStatus.WRONG;

            case MULTI_VARIANT:
                Stream<Integer> answerVariants = Pattern.compile("[,;]").splitAsStream(answerData).map(s -> IntegerValidator.getInstance().validate(s)).filter(Objects::nonNull);
                return (
                        answerVariants.count() ==
                           question.getVariants().stream().filter(QuestionVariant::isCorrect).count()
                        && answerVariants.allMatch(
                                i -> i < question.getVariants().size() && question.getVariants().get(i).isCorrect()
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
