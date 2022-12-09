package com.beyda.encryptmessageservice.controller;

import com.beyda.encryptmessageservice.model.Message;
import com.beyda.encryptmessageservice.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/message")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    public ResponseEntity<List<Message>> getMassege(@PathVariable String room){
        return ResponseEntity.ok(messageService.getMessage(room));
    }
}
