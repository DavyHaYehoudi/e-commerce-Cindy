import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbInputX, TbInputCheck } from "react-icons/tb";
import { formatDate } from "../../helpers/formatDate";
import { addNote, deleteNote } from "../../features/notesSlice";

const NotesEditor = ({ clientId, notesPropName }) => {
  const [currentNote, setCurrentNote] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) =>
    state.notes.find((user) => user.id === clientId)
  );
  const notes = user?.[notesPropName] || [];

  const handleNotesChange = (e) => {
    setCurrentNote(e.target.value);
  };

  const handleSaveNotes = () => {
    const currentDate = new Date();
    const noteWithDate = `${currentNote.trim()} <span><small>(${formatDate(
      currentDate
    )})</small></span>`;

    dispatch(
      addNote({ clientId, content: noteWithDate, propName: notesPropName })
    );
    setCurrentNote("");
  };

  const handleDeleteNote = (index) => {
    dispatch(
      deleteNote({ clientId, noteIndex: index, propName: notesPropName })
    );
  };

  const isNotesEmpty = currentNote.length === 0;

  return (
    <div className="notes-editor">
      <h2>Notes</h2>

      <div className="previous-notes">
        {notes.map((note, index) => (
          <div key={index} className="previous-note">
            <p dangerouslySetInnerHTML={{ __html: note }}></p>
            <button
              className="account-btn icon-trash"
              onClick={() => handleDeleteNote(index)}
              aria-label="Supprimer cette note"
            >
              <TbInputX />{" "}
            </button>
          </div>
        ))}
      </div>

      <div className="notes-textarea">
        <textarea
          value={currentNote}
          onChange={handleNotesChange}
          placeholder="Ajouter des notes..."
        />

        {isNotesEmpty ? null : (
          <button
            className="account-btn icon-validate"
            onClick={handleSaveNotes}
            aria-label="Ajouter cette note"
          >
            <TbInputCheck />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotesEditor;