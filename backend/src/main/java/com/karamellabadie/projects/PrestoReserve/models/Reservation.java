package com.karamellabadie.projects.PrestoReserve.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;
    private String email;
    @Column(nullable = false)
    private LocalDate reservationDate;
    private String reservationHour;
    private String status = "Active";

    public Reservation(String name, String email, LocalDate reservationDate, String reservationHour) {
        this.name = name;
        this.email = email;
        this.reservationDate = reservationDate;
        this.reservationHour = reservationHour;
        this.status = "Active";
    }

    public Reservation() {

    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public String getReservationHour() {
        return reservationHour;
    }

    public void setReservationHour(String reservationHour) {
        this.reservationHour = reservationHour;
    }

    @Override
    public String toString() {
        return "Reservation{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", reservationDate=" + reservationDate +
                ", reservationHour='" + reservationHour + '\'' +
                ", status='" + status + '\'' +
                '}';
    }

    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}