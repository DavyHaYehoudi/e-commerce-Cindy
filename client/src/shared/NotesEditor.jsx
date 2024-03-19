import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbInputX, TbInputCheck } from "react-icons/tb";
import { formatDate } from "../helpers/utils/formatDate";
import { getNotesEditorInfo } from "../selectors/client";
import { notesAdmin } from "../features/admin/clientsSlice";

const NotesEditor = ({ clientId, notesPropName }) => {
  const [currentNote, setCurrentNote] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state?.clients?.data);
  const { notes } = getNotesEditorInfo(state, clientId, notesPropName);

  const handleNotesChange = (e) => {
    const enteredText = e.target.value;
    if (enteredText.length <= 500) {
      setCurrentNote(enteredText);
    }
  };

  const handleSaveNotes = () => {
    dispatch(
      notesAdmin({
        clientId,
        content: currentNote,
      })
    );
    setCurrentNote("");
  };

  const handleDeleteNote = (noteId) => {
    dispatch(notesAdmin({ clientId, noteId }));
  };

  const isNotesEmpty = currentNote.length === 0;

  return (
    <div className="notes-editor">
      <h2>
        <span className="underline">Notes</span>{" "}
      </h2>
      <div className="previous-notes">
        {notes?.map((note) => (
          <div key={note._id} className="previous-note">
            <p>
              {note?.content} <small>{formatDate(note?.date)}</small>{" "}
            </p>
            <button
              className="account-btn icon-trash"
              onClick={() => handleDeleteNote(note?._id)}
              aria-label="Supprimer cette note"
            >
              <TbInputX aria-hidden="true" />{" "}
            </button>
          </div>
        ))}
      </div>
      <small>
        {500 - currentNote.length} caratère
        {500 - currentNote.length > 1 ? "s" : ""} permis
      </small>{" "}
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
