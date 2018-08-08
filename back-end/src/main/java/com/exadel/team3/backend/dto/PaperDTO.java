package com.exadel.team3.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class PaperDTO{

    @Setter
    @Getter
    private String title;

    @Setter
    @Getter
    private String text;

    @Setter
    @Getter
    private String author;

    @Setter
    @Getter
    private List<ObjectId> topicIds;
}
