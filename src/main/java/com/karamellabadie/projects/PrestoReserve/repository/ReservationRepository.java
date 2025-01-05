package com.karamellabadie.projects.PrestoReserve.repository;

import com.karamellabadie.projects.PrestoReserve.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, UUID> {
}