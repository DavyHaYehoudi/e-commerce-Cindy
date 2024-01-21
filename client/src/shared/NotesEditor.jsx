import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbInputX, TbInputCheck } from "react-icons/tb";
import { formatDate } from "../helpers/utils/formatDate";
import { addNote, deleteNote } from "../features/admin/clientsSlice";
import { v4 as uuidv4 } from "uuid";
import { getNotesEditorInfo } from "../selectors/client";

const NotesEditor = ({ clientId, notesPropName }) => {
  const [currentNote, setCurrentNote] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state?.clients?.data);
  const { notes } = getNotesEditorInfo(state, clientId, notesPropName);

  const handleNotesChange = (e) => {
    setCurrentNote(e.target.value);
  };

  const handleSaveNotes = () => {
    const noteId = uuidv4();
    const currentDate = new Date().toISOString();
    dispatch(
      addNote({
        clientId,
        id: noteId,
        content: currentNote,
        propName: notesPropName,
        date: currentDate,
      })
    );
    setCurrentNote("");
  };

  const handleDeleteNote = (noteId) => {
    dispatch(deleteNote({ clientId, noteId, propName: notesPropName }));
  };

  const isNotesEmpty = currentNote.length === 0;

  return (
    <div className="notes-editor">
      <h2>
        <span className="underline">Notes</span>{" "}
      </h2>

      <div className="previous-notes">
        {notes?.map((note) => (
          <div key={note.id} className="previous-note">
            <p>
              {note.content} {" "}<small>{formatDate(note.date)}</small> {" "}
            </p>
            <button
              className="account-btn icon-trash"
              onClick={() => handleDeleteNote(note.id)}
              aria-label="Supprimer cette note"
            >
              <TbInputX aria-hidden="true" />{" "}
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
            <TbInputCheck aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotesEditor;
