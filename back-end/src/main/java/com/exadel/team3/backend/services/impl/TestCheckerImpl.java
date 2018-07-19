package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.dao.QuestionRepository;
import com.exadel.team3.backend.entities.*;
import com.exadel.team3.backend.services.ServiceException;
import com.exadel.team3.backend.services.TestChecker;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.util.NumberUtils;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
class TestCheckerImpl implements TestChecker {
    @Autowired
    private QuestionRepository questionRepository;

    public Integer checkTest(@NonNull Test test) {
        if (test.getItems().stream().anyMatch(item -> item.getStatus() == TestItemStatus.UNCHECKED)) {
            return null;
        }

        // get the mark as a ratio of right answered question to the whole amount of questions
        // floored, so that 9 right questions of 10 = 9.5d -> produce mark 9
        int mark = (int) Math.floor(
                test.getItems()
                        .stream()
                        .filter(item -> item.getStatus() == TestItemStatus.ANSWERED_RIGHT)
                        .count()
                / test.getItems().size()
                * 10);
        // if the calculated mark is below 4, check if all the LEVEL_1 questions are answered right
        // and if true, set mark to 4
        // to do this, we need to query QuestionRepository for the complexity of each question
        if (mark < 4) {
            List<ObjectId> easyQuestionIds =
                    questionRepository.findByIdIn(
                            test.getItems()
                                .stream()
                                .map(TestItem::getQuestionId).collect(Collectors.toList())
                    ).stream()
                     .filter(question -> question.getComplexity() == QuestionComplexity.LEVEL_1)
                     .map(Question::getId)
                     .collect(Collectors.toList());
            if (test.getItems()
                    .stream()
                    .filter(item -> easyQuestionIds.contains(item.getQuestionId()))
                    .allMatch(item -> item.getStatus() == TestItemStatus.ANSWERED_RIGHT)
               ) {
                mark = 4;
            }
        }
        return mark;
    }

    @Override
    public TestItemStatus checkAnswer(@NonNull ObjectId questionId, String answer) {
        Optional<Question> checkedQuestion = questionRepository.findById(questionId);
        if (checkedQuestion.isPresent()) {
            return checkAnswer(checkedQuestion.get(), answer);
        } else {
            throw new ServiceException("There's no question with id " + questionId);
        }
    }

    public TestItemStatus checkAnswer(@NonNull Question question, String answer) {
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
                        ? TestItemStatus.ANSWERED_RIGHT
                        : TestItemStatus.ANSWERED_WRONG;

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
                        ? TestItemStatus.ANSWERED_RIGHT
                        : TestItemStatus.ANSWERED_WRONG;
            case AUTOCHECK_TEXT:
                Optional<String> correctAnswer = question.getVariants()
                        .stream()
                        .filter(QuestionVariant::isCorrect)
                        .map(QuestionVariant::getText)
                        .map(String::trim)
                        .findFirst();
                if (!correctAnswer.isPresent()) return TestItemStatus.UNCHECKED;
                if (StringUtils.isEmpty(answer)) return TestItemStatus.ANSWERED_WRONG;
                if (correctAnswer.get().startsWith("/") && correctAnswer.get().endsWith("/")) {
                    return answer.matches(
                            correctAnswer.get().substring(1, correctAnswer.get().length() - 2)
                    )
                            ? TestItemStatus.ANSWERED_RIGHT
                            : TestItemStatus.ANSWERED_WRONG;
                } else {
                    return answer.equalsIgnoreCase(correctAnswer.get())
                            ? TestItemStatus.ANSWERED_RIGHT
                            : TestItemStatus.ANSWERED_WRONG;
                }
        }
        return TestItemStatus.UNCHECKED;
    }


}
