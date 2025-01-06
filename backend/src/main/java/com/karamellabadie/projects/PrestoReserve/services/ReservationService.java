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

    // Iniettiamo il repository tramite il costruttore
    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    // Crea una nuova prenotazione
    public Reservation createReservation(Reservation reservation) {
        // Puoi fare logiche aggiuntive qui, ad esempio validazioni, calcoli, ecc.
        return reservationRepository.save(reservation);
    }

    // Recupera tutte le prenotazioni
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    // Recupera una prenotazione per ID
    public Optional<Reservation> getReservationById(UUID id) {
        return reservationRepository.findById(id);
    }

    // Aggiorna una prenotazione esistente
    public Reservation updateReservation(UUID id, Reservation updatedReservation) {
        Optional<Reservation> reservationOpt = reservationRepository.findById(id);
        if (reservationOpt.isPresent()) {
            Reservation reservation = reservationOpt.get();
            // Aggiorna i campi
            reservation.setName(updatedReservation.getName());
            reservation.setEmail(updatedReservation.getEmail());
            reservation.setReservationDate(updatedReservation.getReservationDate());
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
