import React from "react";
import { useSelector } from "react-redux";
import { TbInputX, TbInputCheck } from "react-icons/tb";
import { formatDate } from "../helpers/utils/formatDate";
import { getNotesEditorInfo } from "../selectors/client";
import useNotesEditor from "./hooks/useNotesEditor";
import { ToastContainer } from "react-toastify";

const NotesEditor = ({ clientId, notesPropName }) => {
  const state = useSelector((state) => state?.clients?.data);
  const {
    currentNote,
    handleNotesChange,
    handleSaveNotes,
    handleDeleteNote,
    isNotesEmpty,
    handleKeyPress,
  } = useNotesEditor(clientId, notesPropName);
  const { notes } = getNotesEditorInfo(state, clientId, notesPropName);

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
          onKeyDown={handleKeyPress}
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
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default NotesEditor;
