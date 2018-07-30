package com.exadel.team3.backend.services.time;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Service
public class TimeService {

    public static Date parseLocalDateTimeToDate(LocalDateTime time){
        return Date.from(time.atZone(ZoneId.systemDefault()).toInstant());
    }

    public static LocalDateTime parseDateToLocalDateTime(Date date){
        return LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
    }
}
