package com.karamellabadie.projects.PrestoReserve;

import com.karamellabadie.projects.PrestoReserve.models.Reservation;
import com.karamellabadie.projects.PrestoReserve.services.ReservationService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ReservationServiceTests {

    @Autowired
    private ReservationService reservationService; // Aggiungi il tuo servizio

    @Test
    public void testCreateReservation() {
        Reservation reservation = new Reservation("Mario", "mario@example.com", LocalDate.now(), "00:00");
        reservationService.createReservation(reservation);

        // Verifica che la prenotazione sia stata salvata correttamente
        assertNotNull(reservation.getId());
    }
}