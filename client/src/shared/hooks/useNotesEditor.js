import { useState } from "react";
import { useDispatch } from "react-redux";
import { notesAdmin } from "../../features/admin/clientsSlice";
import useUnauthorizedRedirect from "../../services/errors/useUnauthorizedRedirect";

const useNotesEditor = (clientId) => {
  const [currentNote, setCurrentNote] = useState("");
  const handleUnauthorized = useUnauthorizedRedirect();
  const dispatch = useDispatch();

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
        handleUnauthorized,
      })
    );
    setCurrentNote("");
  };

  const handleDeleteNote = (noteId) => {
    dispatch(notesAdmin({ clientId, noteId, handleUnauthorized }));
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSaveNotes();
    }
  };

  const isNotesEmpty = currentNote.length === 0;

  return {
    currentNote,
    handleNotesChange,
    handleSaveNotes,
    handleDeleteNote,
    isNotesEmpty,
    handleKeyPress,
  };
};

export default useNotesEditor;
