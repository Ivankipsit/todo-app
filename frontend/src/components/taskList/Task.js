import { Box, Divider, Grid2, IconButton, Paper } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useReducer, useState } from 'react';
import { TASKS } from '../../appConfig/urlConfig';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InputTextField from '../common/fields/InputTextField';
import { renderFunction } from './TasksHeader';
import InputDateTimeField from '../common/fields/InputDateTimeField';
import EventNoteIcon from '@mui/icons-material/EventNote';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

export default function Task({ taskDetails, notifyChange }) {
  const [state, dispatch] = useReducer(renderFunction, taskDetails);
  const [isInEditingState, setIsInEditingState] = useState(false);
  function toggleEditState() {
    setIsInEditingState(!isInEditingState);
  }

  const resetFields = () => {
    dispatch({
      type: 'updateAll',
      updateTo: taskDetails,
    });
  };
  function handleDeleteTask(id) {
    axios
      .delete(`${TASKS}/${id}/`)
      .then((response) => {
        console.log(response);
        notifyChange();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSaveTask() {
    axios
      .put(`${TASKS}/${state.id}/`, state)
      .then((response) => {
        console.log(response);
        notifyChange();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Box>
      <Paper sx={{ p: 1 }}>
        <Grid2
          container
          alignItems={'center'}
          justifyContent={'space-between'}
          spacing={1}
        >
          <Grid2 size={{ xs: 12, md: 6 }}>
            {isInEditingState ? (
              <InputTextField
                label={'Task Title'}
                value={state.title}
                onChange={(event) => {
                  dispatch({
                    type: 'update',
                    fieldName: 'title',
                    newValue: event.target.value,
                  });
                }}
              />
            ) : (
              taskDetails.title
            )}
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Grid2
              container
              spacing={1}
              alignItems={'center'}
              justifyContent={{ xs: 'space-around', md: 'flex-end' }}
            >
              {isInEditingState && (
                <Grid2>
                  <IconButton
                    aria-label="reset"
                    size="small"
                    onClick={() => {
                      resetFields();
                    }}
                  >
                    <RestartAltIcon fontSize="inherit" color="error" />
                  </IconButton>
                </Grid2>
              )}
              <Grid2>
                <IconButton
                  aria-label={isInEditingState ? 'save' : 'edit'}
                  size="small"
                  onClick={() => {
                    toggleEditState();
                  }}
                >
                  {isInEditingState ? (
                    <SaveIcon
                      fontSize="inherit"
                      color="success"
                      onClick={() => {
                        handleSaveTask();
                      }}
                    />
                  ) : (
                    <EditIcon fontSize="inherit" />
                  )}
                </IconButton>
              </Grid2>
              <Grid2>
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="error"
                  onClick={() => {
                    handleDeleteTask(taskDetails.id);
                  }}
                >
                  <DeleteForeverIcon fontSize="inherit" />
                </IconButton>
              </Grid2>
              {isInEditingState && (
                <Grid2>
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={() => {
                      toggleEditState();
                    }}
                  >
                    <CloseIcon fontSize="inherit" color="secondary" />
                  </IconButton>
                </Grid2>
              )}
            </Grid2>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Divider />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            {isInEditingState ? (
              <InputTextField
                label={'Task Description'}
                value={state.description}
                onChange={(event) => {
                  dispatch({
                    type: 'update',
                    fieldName: 'description',
                    newValue: event.target.value,
                  });
                }}
              />
            ) : (
              taskDetails.description
            )}
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            {isInEditingState ? (
              <InputDateTimeField
                label={'Complete By'}
                value={dayjs(state.complete_by)}
                onChange={(event) => {
                  dispatch({
                    type: 'update',
                    fieldName: 'complete_by',
                    newValue: event,
                  });
                }}
                calenderIcon={EventNoteIcon}
              />
            ) : (
              dayjs(taskDetails.complete_by).format('LLLL')
            )}
          </Grid2>
        </Grid2>
      </Paper>
    </Box>
  );
}
