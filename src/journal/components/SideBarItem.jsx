import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBarItem = ({ note, imageUrls = [] }) => {
  const dispatch = useDispatch();

  const { active } = useSelector((state) => state.journal);
  // console.log(active);

  const newTitle = useMemo(() => {
    return note.title.length > 15 ? note.title.substring(0, 15) + "..." : note.title;
  }, [note.title]);

  const activeNote = () => {
    const noteWithImages = {
      ...note,
      imageUrls, // Add imageUrls to the note object
    };

    dispatch(setActiveNote(noteWithImages));
  };

  // Determina si la nota actual es la nota activa
  const isActive = note.id === active?.id;

  return (
    <ListItem disablePadding onClick={activeNote}>
      <ListItemButton>
        <ListItemIcon>
          {isActive ? <TurnedInNot color="primary" /> : <TurnedInNot />}
          {/* <TurnedInNot></TurnedInNot> */}
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle}></ListItemText>
          <ListItemText secondary={note.body}></ListItemText>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
