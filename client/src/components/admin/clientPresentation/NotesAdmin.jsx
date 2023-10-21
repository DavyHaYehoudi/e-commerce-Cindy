import React, { useState } from "react";
import { TbInputX } from "react-icons/tb";
import { TbInputCheck } from "react-icons/tb";

const NotesAdmin = ({ initialNotes, onUpdateNotes }) => {
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
            <p dangerouslySetInnerHTML={{ __html: note }} ></p>
            <button
              className="account-btn icon-trash"
              onClick={() => handleDeleteNote(index)}
            >
              <TbInputX />{" "}
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
          <button className="account-btn icon-validate" onClick={handleSaveNotes}>
            <TbInputCheck />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotesAdmin;
