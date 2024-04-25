import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, Input, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components/ImageGallery";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useEffect, useMemo, useRef } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeleteNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const NoteView = () => {
  const fileInputRef = useRef();

  const dispatch = useDispatch();
  const { active: note, messageSaved, isSaving } = useSelector((state) => state.journal);
  // console.log(note);
  const { body, title, onInputChange, formState, date } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  //todo: return, ya no devolverá una función de limpieza
  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("nota actualizada", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingFiles(target.files));
  };

  const onDeleteNote = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar esta nota!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, bórralo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeleteNote());
        Swal.fire("Eliminado!", "La nota ha sido eliminada.", "success");
      }
    });
  };

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction={"row"}
      justifyContent={"space-between"}
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input type="file" ref={fileInputRef} multiple onChange={onFileInputChange} style={{ display: "none" }}></input>

        <IconButton color="primary" disabled={isSaving} onClick={() => fileInputRef.current.click()}>
          <UploadOutlined></UploadOutlined>
        </IconButton>

        <Button disabled={isSaving} onClick={onSaveNote} color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }}></SaveOutlined>Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un titulo"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        ></TextField>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Que sucedió en el dia de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        ></TextField>
      </Grid>
      <Grid container justifyContent={"end"}>
        <Button sx={{ mt: 2 }} color="error" onClick={onDeleteNote}>
          <DeleteOutline></DeleteOutline>Borrar
        </Button>
      </Grid>
      <ImageGallery images={note.imageUrls}></ImageGallery>
    </Grid>
  );
};
