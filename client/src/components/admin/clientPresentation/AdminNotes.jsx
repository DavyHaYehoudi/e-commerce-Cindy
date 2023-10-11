import React, { useState } from "react";
import { TbInputX } from "react-icons/tb";
import { TbInputCheck } from "react-icons/tb";

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
    const noteWithDate = `${adminNotes} <span><small>(enregistré le ${formattedDate})</small></span>`;

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
      <h2>Notes</h2>

      <div className="previous-notes">
        {previousNotes.map((note, index) => (
          <div key={index} className="previous-note">
            <span dangerouslySetInnerHTML={{ __html: note }} />
            <button
              className="admin-notes-trash-btn"
              onClick={() => handleDeleteNote(index)}
            >
              <TbInputX className="delete-icon" />{" "}
            </button>
          </div>
        ))}
      </div>

      <div className="admin-notes-textarea">
        <textarea
          value={adminNotes}
          onChange={handleNotesChange}
          placeholder="Ajouter des notes..."
        />

        {isNotesEmpty ? null : (
          <div className=" info-tooltip" aria-label="Ajouter cette note">
            <button
              className="admin-notes-textarea-add-btn"
              onClick={handleSaveNotes}
            >
              <TbInputCheck />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotes;
