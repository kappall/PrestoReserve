package com.karamellabadie.projects.PrestoReserve.services;

import com.karamellabadie.projects.PrestoReserve.models.Reservation;
import com.karamellabadie.projects.PrestoReserve.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public Reservation createReservation(Reservation reservation) {
        System.out.println(reservation.toString());
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(UUID id) {
        return reservationRepository.findById(id);
    }

    public Reservation updateReservation(UUID id, Reservation updatedReservation) {
        Optional<Reservation> reservationOpt = reservationRepository.findById(id);
        if (reservationOpt.isPresent()) {
            Reservation reservation = reservationOpt.get();
            // Aggiorna i campi
            reservation.setName(updatedReservation.getName());
            reservation.setEmail(updatedReservation.getEmail());
            reservation.setReservationDate(updatedReservation.getReservationDate());
            reservation.setReservationHour(updatedReservation.getReservationHour());
            reservation.setStatus(updatedReservation.getStatus());
            return reservationRepository.save(reservation);
        }
        throw new IllegalArgumentException("Reservation not found");
    }

    // Cancella una prenotazione
    public void deleteReservation(UUID id) {
        if (reservationRepository.existsById(id)) {
            reservationRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Reservation not found");
        }
    }
}
