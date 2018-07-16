package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.dao.QuestionRepository;
import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.entities.QuestionComplexity;
import com.exadel.team3.backend.entities.QuestionType;
import org.bson.types.ObjectId;

import com.exadel.team3.backend.entities.TestItem;
import com.exadel.team3.backend.services.TestItemPicker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class TestItemPickerImpl implements TestItemPicker {
    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public List<TestItem> generate(int count, Collection<ObjectId> topicIds, boolean trainingOnly) {
        // a test must contain no more that 1 question with manual-checked answer, according to tech specs
        // there must be no such answers for a training test;
        // the rest of questions are divided proportionally between difficulty from upper to lower (so that more
        // complex questions are guaranteed to appear

        count -= (trainingOnly ? 0 : 1);
        int complexLevel4Count = count >= 4 ? count / 4 : 1;
        count -= complexLevel4Count;
        int complexLevel3Count = count >= 3 ? count / 3 : 1;
        count -= complexLevel3Count;
        int complexLevel2Count = count >= 2 ? count / 2 : 1;
        int complexLevel1Count = count - complexLevel2Count;

        // add random-generated collection of level_1, 2, 3 and 4 questions that are not manual-check
        List<TestItem> generated = Stream.of(
                pickRandomQuestions(complexLevel1Count, QuestionComplexity.LEVEL_1, trainingOnly),
                pickRandomQuestions(complexLevel2Count, QuestionComplexity.LEVEL_2, trainingOnly),
                pickRandomQuestions(complexLevel3Count, QuestionComplexity.LEVEL_3, trainingOnly),
                pickRandomQuestions(complexLevel4Count, QuestionComplexity.LEVEL_3, trainingOnly)
        ).flatMap(stream -> stream).collect(Collectors.toList());

        // add single manual-check question if needed
        if (!trainingOnly) {
            generated.addAll(
                    questionRepository.random(1, Collections.singletonList(QuestionType.MANUAL_CHECK_TEXT), false)
                            .stream()
                            .map(Question::getId)
                            .map(TestItem::new)
                            .collect(Collectors.toList())
            );
        }

        return generated;
    }

    private Stream<TestItem> pickRandomQuestions(int count, QuestionComplexity complexity, boolean trainingOnly) {
        return questionRepository.random(
                count,
                complexity,
                Arrays.asList(QuestionType.SINGLE_VARIANT, QuestionType.MULTI_VARIANT, QuestionType.AUTOCHECK_TEXT),
                trainingOnly
        ).stream().map(Question::getId).map(TestItem::new);
    }

}
