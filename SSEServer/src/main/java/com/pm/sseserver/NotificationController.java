package com.pm.sseserver;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@RestController
@RequestMapping("/notifications")
@CrossOrigin("http://localhost:63342")
public class NotificationController {

    private final Sinks.Many<Notification> notificationSink = Sinks.many().multicast().onBackpressureBuffer();

    @GetMapping("/send")
    public String publishNotification(@RequestParam String message) {
        Notification notification = new Notification(message);
        notificationSink.tryEmitNext(notification);
        return "Notification Sent" + message;
    }

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Notification> streamNotification() {
        return notificationSink.asFlux();
    }
}
