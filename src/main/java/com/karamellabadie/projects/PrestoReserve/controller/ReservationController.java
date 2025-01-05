package com.karamellabadie.projects.PrestoReserve.controller;

import com.karamellabadie.projects.PrestoReserve.model.Reservation;
import com.karamellabadie.projects.PrestoReserve.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Reservation> getReservationById(@PathVariable UUID id) {
        return reservationRepository.findById(id);
    }

    @PutMapping("/{id}")
    public Reservation updateReservation(@PathVariable UUID id, @RequestBody Reservation updatedReservation) {
        return reservationRepository.findById(id).map(reservation -> {
            reservation.setName(updatedReservation.getName());
            reservation.setEmail(updatedReservation.getEmail());
            reservation.setReservationDate(updatedReservation.getReservationDate());
            reservation.setStatus(updatedReservation.getStatus());
            return reservationRepository.save(reservation);
        }).orElseThrow(() -> new RuntimeException("Reservation not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable UUID id) {
        reservationRepository.deleteById(id);
    }
}