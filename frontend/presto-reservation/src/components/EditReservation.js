import React, { useState } from "react";

const EditReservationModal = ({ show, onClose, reservation, onSave }) => {
    const [editedReservation, setEditedReservation] = useState(reservation || {});

    const handleSave = () => {
        onSave(editedReservation);
        onClose();
    };

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
                                setEditedReservation({...editedReservation, name: e.target.value})
                            }
                        />
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Email"
                            value={editedReservation.email || reservation.email}
                            onChange={(e) =>
                                setEditedReservation({...editedReservation, email: e.target.value})
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
                                    reservationDate: e.target.value + "T00:00:00",
                                })
                            }
                        />
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