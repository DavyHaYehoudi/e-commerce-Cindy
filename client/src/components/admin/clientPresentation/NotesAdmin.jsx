import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbInputX, TbInputCheck } from "react-icons/tb";
import { formatDate } from "../../../helpers/formatDate";
import { addNote, deleteNote } from "../../../features/notesSlice";

const NotesAdmin = ({ clientId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    state.notes.find((user) => user.id === clientId)
  );
  const adminNotes = user?.notesAdmin || [];
  const [currentNote, setCurrentNote] = useState(adminNotes); 
  const [previousNotes, setPreviousNotes] = useState([]);

  useEffect(() => {
    setPreviousNotes(user?.notesAdmin || []);
  }, [user?.notesAdmin]);

  const handleNotesChange = (e) => {
    setCurrentNote(e.target.value);
  };

  const handleSaveNotes = () => {
    const currentDate = new Date();
    const noteWithDate = `${currentNote.trim()} <span><small>(enregistré le ${formatDate(currentDate)})</small></span>`;

    setPreviousNotes((prevNotes) => [...prevNotes, noteWithDate]);

    // Utiliser l'action pour mettre à jour le store
    dispatch(addNote({ clientId, content: noteWithDate }));
    setCurrentNote(""); // Effacer le texte après la validation
  };

  const handleDeleteNote = (index) => {
    setPreviousNotes((prevNotes) => {
      const updatedNotes = [...prevNotes];
      updatedNotes.splice(index, 1);
      return updatedNotes;
    });

    // Utiliser l'action pour supprimer la note du store
    dispatch(deleteNote({ clientId, noteIndex: index }));
  };

  const isNotesEmpty = currentNote.length === 0;

  return (
    <div className="admin-notes">
      <h2>Notes</h2>

      <div className="previous-notes">
        {previousNotes.map((notes, index) => (
          <div key={index} className="previous-note">
            <p dangerouslySetInnerHTML={{ __html: notes }}></p>
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
          value={currentNote}
          onChange={handleNotesChange}
          placeholder="Ajouter des notes..."
        />

        {isNotesEmpty ? null : (
          <button
            className="account-btn icon-validate"
            onClick={handleSaveNotes}
          >
            <TbInputCheck />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotesAdmin;
