package com.beyda.encryptmessageservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.awt.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Message extends BaseModel{

    @Enumerated(EnumType.STRING)
    private MessageType messageType;

    private String content;
    private String room;

    private String username;
}
