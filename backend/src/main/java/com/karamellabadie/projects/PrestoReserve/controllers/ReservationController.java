package com.karamellabadie.projects.PrestoReserve.controllers;

import com.karamellabadie.projects.PrestoReserve.services.ReservationService;
import com.karamellabadie.projects.PrestoReserve.models.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.createReservation(reservation);
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    public Optional<Reservation> getReservation(@PathVariable UUID id) {
        return reservationService.getReservationById(id);
    }

    @PutMapping("/{id}")
    public Reservation updateReservation(@PathVariable UUID id, @RequestBody Reservation reservation) {
        return reservationService.updateReservation(id, reservation);
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable UUID id) {
        reservationService.deleteReservation(id);
    }
}