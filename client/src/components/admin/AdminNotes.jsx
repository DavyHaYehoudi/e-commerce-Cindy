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
    const noteWithDate = `${adminNotes} <span class="date-text">(enregistré le ${formattedDate})</span>`;

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
            <span dangerouslySetInnerHTML={{ __html: note }} />
            <button className="admin-notes-trash-btn" onClick={() => handleDeleteNote(index)}>
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
        <button className="admin-notes-add-btn" onClick={handleSaveNotes}>
          Enregistrer cette note
        </button>
      )}
    </div>
  );
};

export default AdminNotes;
