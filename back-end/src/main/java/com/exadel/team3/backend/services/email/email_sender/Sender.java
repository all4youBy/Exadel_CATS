package com.exadel.team3.backend.services.email.email_sender;


import com.exadel.team3.backend.services.email.email_types.EmailTypes;

import java.util.Map;

public interface Sender {
    boolean send(EmailTypes emailTypes, String email, Map<String, String> replaseMap);
}
