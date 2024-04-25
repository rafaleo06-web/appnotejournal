import { collection, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToAactiveNote,
  setSaving,
  updatedNote,
} from "./journalSlice";
import { loadNotes } from "../../journal/helpers/loadNotes";
import { fileUpload } from "../../journal/helpers/fileUpload";
// import { deleteDoc } from "firebase/firestore";

//todo: DEFAULT NOTE, IF INPUTS ARE EMPTYS
export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    // console.log("starnote");
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      imageUrls: [],
      date: new Date().getTime(),
    };
    const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const notes = await loadNotes(uid);
    // console.log(notes);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    //state ACTIVE === nota activa clickeada
    const { active: note } = getState().journal;
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });
    // console.log(noteToFirestore);

    dispatch(updatedNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());
    // await fileUpload(files[0]);

    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);
    dispatch(setPhotosToAactiveNote(photosUrls));
  };
};

export const startDeleteNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    dispatch(deleteNoteById(note));

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);
  };
};
