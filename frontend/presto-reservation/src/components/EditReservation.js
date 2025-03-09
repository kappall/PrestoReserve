import React, { useState, useEffect } from "react";

const EditReservationModal = ({ show, onClose, reservation, onSave }) => {
    const [editedReservation, setEditedReservation] = useState(reservation || {});

    const generateTimeOptions = () => {
        const options = [];
        for (let i = 12; i < 22; i++) {
            for (let j = 0; j < 60; j += 15) {
                const hour = i < 10 ? `0${i}` : i;
                const minutes = j === 0 ? "00" : j;
                options.push(`${hour}:${minutes}`);
            }
        }
        return options;
    };

    const handleSave = () => {
        onSave(editedReservation);
        onClose();
    };

    useEffect(() => {
        if (reservation) {
            setEditedReservation(reservation);
        }
    }, [reservation]);

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Reservation</h5>
                    </div>
                    <div className="modal-body">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Nome"
                            value={editedReservation.name || reservation.name}
                            onChange={(e) =>
                                setEditedReservation({ ...editedReservation, name: e.target.value })
                            }
                        />
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Email"
                            value={editedReservation.email || reservation.email}
                            onChange={(e) =>
                                setEditedReservation({ ...editedReservation, email: e.target.value })
                            }
                        />
                        <input
                            type="date"
                            className="form-control mb-2"
                            value={
                                editedReservation.reservationDate
                                    ? editedReservation.reservationDate.split("T")[0]
                                    : reservation.reservationDate.split("T")[0]
                            }
                            onChange={(e) =>
                                setEditedReservation({
                                    ...editedReservation,
                                    reservationDate: e.target.value + "T00:00",
                                })
                            }
                        />
                        <select
                            value={editedReservation.reservationHour}
                            onChange={(e) => setEditedReservation({ ...editedReservation, reservationHour: e.target.value })}
                        >
                            <option value="">Select Time</option>
                            {generateTimeOptions().map((time, index) => (
                                <option key={index} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button className="sm primary" onClick={handleSave}>
                            Save
                        </button>
                        <button className="sm secondary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditReservationModal;