import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditReservationModal from "./EditReservation";

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [newReservation, setNewReservation] = useState({
        name: "",
        email: "",
        reservationDate: ""
    });
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/reservations')
            .then(response => {
                setReservations(response.data);
            })
            .catch(error => {
                console.error('Errore nel recupero delle prenotazioni:', error);
            });
    }, []);

    const addReservation = () => {
        // Validazione dei campi
        if (!newReservation.name || !newReservation.email || !newReservation.reservationDate) {
            console.error("Campi obbligatori mancanti.");
            return;
        }

        // Creazione del corpo della richiesta
        const reservationToPost = {
            name: newReservation.name,
            email: newReservation.email,
            reservationDate: newReservation.reservationDate + "T" + newReservation.hour+":00",
            status: "attiva"
        };

        axios.post('http://localhost:8080/api/reservations', reservationToPost)
            .then((response) => {
                setReservations([...reservations, response.data]); // Aggiunge la nuova prenotazione alla lista
                setNewReservation({ name: "", email: "", reservationDate: "" }); // Resetta il form
            })
            .catch((error) => {
                console.error("Errore durante il POST:", error.response || error);
            });
    };

    const deleteReservation = (id) => {
        axios.delete(`http://localhost:8080/api/reservations/${id}`)
            .then(() => {
                setReservations(reservations.filter((res) => res.id !== id));
            })
            .catch((error) => console.error("Error deleting reservation:", error));
    };
    const editReservation = (reservation) => {
        setSelectedReservation(reservation);
        setShowEditModal(true);
    };
    const saveEditedReservation = (updatedReservation) => {
        axios
            .put(`http://localhost:8080/api/reservations/${updatedReservation.id}`, updatedReservation)
            .then((response) => {
                setReservations((prevReservations) =>
                    prevReservations.map((res) =>
                        res.id === updatedReservation.id ? response.data : res
                    )
                );
            })
            .catch((error) => console.error("Errore aggiornamento:", error));
    };
    return (
        <div>
            <h1 className="title">Lista Prenotazioni</h1>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={newReservation.name}
                    onChange={(e) => setNewReservation({...newReservation, name: e.target.value})}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newReservation.email}
                    onChange={(e) => setNewReservation({...newReservation, email: e.target.value})}
                /><br/>
                <input
                    type="date"
                    placeholder="Reservation Date"
                    value={newReservation.reservationDate?.split("T")[0] || ""}
                    onChange={(e) =>
                        setNewReservation({
                            ...newReservation,
                            reservationDate:
                                e.target.value
                        })
                    }
                />
                <input
                    type="time"
                    placeholder="Reservation Time"
                    value={newReservation.reservationDate?.split("T")[1]?.slice(0, 5) || ""}
                    onChange={(e) =>
                        setNewReservation({
                            ...newReservation,
                            hour: e.target.value
                        })
                    }
                /><br/>
                <button onClick={addReservation}>Add</button>
            </div>
            <table border="1">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Mail</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                        <td>{reservation.name}</td>
                        <td>{reservation.email}</td>
                        <td>{reservation.reservationDate.split("T")[0] + ' ' + reservation.reservationDate.split("T")[1].slice(0, 5)}</td>
                        <td>{reservation.status}</td>
                        <td>
                            <button className="sm primary"
                                    onClick={() => editReservation(reservation)}>Edit
                            </button>
                        </td>
                        <td>
                            <button className="sm danger"
                                    onClick={() => deleteReservation(reservation.id)}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <EditReservationModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                reservation={selectedReservation}
                onSave={saveEditedReservation}
            />
        </div>
    );
};

export default ReservationList;