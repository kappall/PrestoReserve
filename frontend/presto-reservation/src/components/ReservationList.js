import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditReservationModal from "./EditReservation";

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [newReservation, setNewReservation] = useState({
        name: "",
        email: "",
        reservationDate: "",
        reservationHour: "",
    });
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/reservations')
            .then(response => {
                setReservations(response.data);
            })
            .catch(error => {
                console.error('Error retrieving reservations:', error);
            });
    }, []);

    const generateTimeOptions = () => {
        const times = [];
        for (let hour = 12; hour < 22; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                times.push(time);
            }
        }
        return times;
    };

    const addReservation = () => {
        if (!newReservation.name || !newReservation.email || !newReservation.reservationDate || !newReservation.reservationHour) {
            console.error("Mandatory fields missing.");
            return;
        }

        const reservationToPost = {
            name: newReservation.name,
            email: newReservation.email,
            reservationDate: newReservation.reservationDate,
            reservationHour: newReservation.reservationHour,
            status: "Active",
        };

        axios.post('http://localhost:8080/api/reservations', reservationToPost)
            .then((response) => {
                setReservations([...reservations, response.data]);
                setNewReservation({ name: "", email: "", reservationDate: "", reservationHour: "" });
            })
            .catch((error) => {
                console.error("Error during POST:", error.response || error);
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
            .catch((error) => console.error("Error updating reservation:", error));
    };

    return (
        <div>
            <div>
                <h2>Add a Reservation</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newReservation.name}
                    onChange={(e) => setNewReservation({ ...newReservation, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newReservation.email}
                    onChange={(e) => setNewReservation({ ...newReservation, email: e.target.value })}
                />
                <br />
                <input
                    type="date"
                    placeholder="Reservation Date"
                    value={newReservation.reservationDate}
                    onChange={(e) => setNewReservation({ ...newReservation, reservationDate: e.target.value })}
                />
                <select
                    value={newReservation.reservationHour}
                    onChange={(e) => setNewReservation({ ...newReservation, reservationHour: e.target.value })}
                >
                    <option value="">Select Time</option>
                    {generateTimeOptions().map((time, index) => (
                        <option key={index} value={time}>
                            {time}
                        </option>
                    ))}
                </select>
                <br />
                <button onClick={addReservation}>Add Reservation</button>
            </div>

            <h2>Reservations List</h2>
            <table border="1">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date and Time</th>
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
                        <td>{reservation.reservationDate+ ' ' + reservation.reservationHour}</td>
                        <td>{reservation.status}</td>
                        <td>
                            <button className="sm primary" onClick={() => editReservation(reservation)}>Edit</button>
                        </td>
                        <td>
                            <button className="sm danger" onClick={() => deleteReservation(reservation.id)}>Delete</button>
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