package com.exadel.team3.backend.entities;

import java.time.LocalDateTime;

public interface Assignable {
    String getAssignedTo();
    void setAssignedTo(String assignedTo);

    String getAssignedBy();
    void setAssignedBy(String assignedBy);

    LocalDateTime getStart();
    void setStart(LocalDateTime start);

    LocalDateTime getDeadline();
    void setDeadline(LocalDateTime deadline);

    Integer getMark();
    void setMark(Integer mark);
}
