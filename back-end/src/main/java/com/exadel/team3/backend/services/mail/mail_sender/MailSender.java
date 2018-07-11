package com.exadel.team3.backend.services.mail.mail_sender;


import com.exadel.team3.backend.services.mail.mail_types.MailTypes;

import java.util.Map;

public interface MailSender {
    boolean send(MailTypes mailTypes, String email, Map<String, String> replaseMap);
}
