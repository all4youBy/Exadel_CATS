package com.exadel.team3.backend.services.impl;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.util.NumberUtils;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.function.Supplier;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import com.exadel.team3.backend.dao.ObjectIdProjection;
import com.exadel.team3.backend.dao.QuestionRepository;
import com.exadel.team3.backend.entities.*;
import com.exadel.team3.backend.services.ServiceException;
import com.exadel.team3.backend.services.TestChecker;

@Component
class TestCheckerImpl implements TestChecker {
    @Autowired
    private QuestionRepository questionRepository;

    public Integer checkTest(@NonNull Test test) {
       EnumMap<TestItemStatus, Long> testItemStatistics =
                test.getItems()
                        .stream()
                        .collect(Collectors.groupingBy(
                                TestItem::getStatus,
                                () -> new EnumMap<>(TestItemStatus.class),
                                Collectors.counting())
                        );
       EnumSet.allOf(TestItemStatus.class).forEach(enumIntem -> testItemStatistics.putIfAbsent(enumIntem, 0L));
       if (testItemStatistics.get(TestItemStatus.UNCHECKED)>0) {
            return null;
        }

        // get the mark as a ratio of right answered question to the whole amount of questions
        // floored, so that 9 right questions of 10 = 9.5d -> produce mark 9
        int mark = (int) Math.floor(
                (double)testItemStatistics.get(TestItemStatus.ANSWERED_RIGHT)
                / test.getItems().size()
                * 10
        );
        // if the calculated mark is below 4, check if all the LEVEL_1 questions are answered right
        // and if true, set mark to 4
        // to do this, we need to query QuestionRepository for the complexity of each question in or test
        // but to reduce the database load we will do this only if at least half the questions have been answered
        if (
                mark < 4
                && testItemStatistics.get(TestItemStatus.UNANSWERED) >= test.getItems().size() / 2
           ) {
            List<ObjectId> easyQuestionIds =
                    questionRepository.findByIdInAndComplexity(
                            test.getItems()
                                .stream()
                                .map(TestItem::getQuestionId).collect(Collectors.toList()),
                            QuestionComplexity.LEVEL_1
                    ).stream()
                     .map(ObjectIdProjection::getId)
                     .collect(Collectors.toList());
            if (
                 test.getItems()
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
                Pattern splittingPattern = Pattern.compile("[,;]");
                Supplier<IntStream> answerVariants = () ->
                        splittingPattern.splitAsStream(answer)
                                .mapToInt(i -> {
                                    try {
                                        return NumberUtils.parseNumber(i, Integer.class);
                                    } catch (NumberFormatException ex) {
                                        return -1;
                                    }
                                })
                                .filter(i -> i>=0);
                return (
                        answerVariants.get().count() ==
                                question.getVariants().stream().filter(QuestionVariant::isCorrect).count()
                        && answerVariants.get().allMatch(
                                variantId -> variantId < question.getVariants().size()
                                        && question.getVariants().get(variantId).isCorrect()
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
