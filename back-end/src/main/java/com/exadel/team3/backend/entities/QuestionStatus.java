package com.exadel.team3.backend.entities;

public enum QuestionStatus {
    ACTIVE,         /* newly created and undisputed questions */
    DISPUTED,       /* questions that have been complained for and temporarily banned from output */
    CONFIRMED,      /* questions that have been complained but confirmed right and receive no future complaints */
    DISABLED        /* questions disabled from output forever */
}
