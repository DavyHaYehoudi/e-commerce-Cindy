import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";

const AdminNotes = ({ initialNotes, onUpdateNotes }) => {
  const [adminNotes, setAdminNotes] = useState(initialNotes || "");
  const [previousNotes, setPreviousNotes] = useState([]);

  const handleNotesChange = (e) => {
    setAdminNotes(e.target.value);
    onUpdateNotes(e.target.value);
  };

  const handleSaveNotes = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    const noteWithDate = `${adminNotes} (Enregistré le ${formattedDate})`;

    setPreviousNotes((prevNotes) => [noteWithDate, ...prevNotes]);
  };

  const handleDeleteNote = (index) => {
    setPreviousNotes((prevNotes) => {
      const updatedNotes = [...prevNotes];
      updatedNotes.splice(index, 1);
      return updatedNotes;
    });
  };

  const isNotesEmpty = adminNotes.trim() === "";

  return (
    <div className="admin-notes">
      <h2>Notes administratives</h2>

      <div className="previous-notes">
        {previousNotes.map((note, index) => (
          <div key={index} className="previous-note">
            {note}
            <button className="delete" onClick={() => handleDeleteNote(index)}>
              <BsTrash className="delete-icon" />{" "}
            </button>
          </div>
        ))}
      </div>

      <textarea
        value={adminNotes}
        onChange={handleNotesChange}
        placeholder="Ajouter des notes..."
      />

      {isNotesEmpty ? null : (
        <button className="add" onClick={handleSaveNotes}>
          Enregistrer cette note
        </button>
      )}
    </div>
  );
};

export default AdminNotes;
