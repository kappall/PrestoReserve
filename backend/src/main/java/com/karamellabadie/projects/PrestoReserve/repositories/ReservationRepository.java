package com.karamellabadie.projects.PrestoReserve.repositories;

import com.karamellabadie.projects.PrestoReserve.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, UUID> {
    Optional<Reservation> findById(UUID id);
}