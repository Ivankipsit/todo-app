import {
  Box,
  Checkbox,
  Divider,
  Grid2,
  IconButton,
  Paper,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useReducer, useState, useEffect } from 'react';
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
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import RemoveDoneRoundedIcon from '@mui/icons-material/RemoveDoneRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import CancelScheduleSendRoundedIcon from '@mui/icons-material/CancelScheduleSendRounded';
import LinearProgress from '@mui/material/LinearProgress';

export default function Task({ taskDetails, notifyChange }) {
  const [state, dispatch] = useReducer(renderFunction, taskDetails);
  const [isInEditingState, setIsInEditingState] = useState(false);
  const [isInDeletingState, setIsInDeletingState] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [deleteProgress, setDeleteProgress] = useState(100);
  const [intervalId, setIntervalId] = useState(null);
  function toggleEditState() {
    resetFields();
    setIsInEditingState(!isInEditingState);
  }

  const resetFields = () => {
    dispatch({
      type: 'updateAll',
      updateTo: taskDetails,
    });
  };

  function deleteTask(id) {
    axios
      .delete(`${TASKS}/${id}/`)
      .then((response) => {
        setIsInDeletingState(false);
        notifyChange();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // RESEARCH - Need to learn more on handling timed calls
  function handleDeleteTaskWithTimer(id) {
    setIsInDeletingState(true);
    if (intervalId !== null && timeoutId !== null) {
      deleteTask(id);
      cancelDelete();
    } else {
      // Start a timer to decrease the delete progress
      const IId = setInterval(() => {
        setDeleteProgress((prevProgress) => {
          if (prevProgress <= 0) {
            clearInterval(id);
            return 0;
          }
          return prevProgress - 1; // Decrease by 20 for each interval
        });
      }, 50); // Adjust the interval timing as needed

      setIntervalId(IId); // Store the interval ID

      // Start timeout and store its ID
      const TId = setTimeout(() => {
        deleteTask(id);
      }, 5000);

      setTimeoutId(TId); // Save the timeout ID to state
    }
    setDeleteProgress(100);
  }

  function cancelDelete() {
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear the timeout
      console.log('Deletion cancelled.');
      setIsInDeletingState(false); // Update state
      setDeleteProgress(0); // Reset progress
      setTimeoutId(null); // Reset timeout ID
      clearInterval(intervalId); // Clear the interval
      setDeleteProgress(100); // Reset progress to 100
    }
  }

  function handleSaveTask() {
    axios
      .put(`${TASKS}/${state.id}/`, state)
      .then((response) => {
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
          direction={'column'}
          alignItems={'center'}
          justifyContent={'space-between'}
          spacing={1}
        >
          <Grid2 size={{ xs: 12 }}>
            <Grid2
              container
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              spacing={2}
            >
              <Grid2 size="grow">
                <Grid2
                  container
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                  spacing={1}
                >
                  <Grid2 size={{ xs: 2 }}>
                    {isInEditingState ? (
                      <Checkbox
                        checked={state.starred}
                        onChange={(event) => {
                          dispatch({
                            type: 'update',
                            fieldName: 'starred',
                            newValue: event.target.checked,
                          });
                        }}
                        icon={<StarBorderRoundedIcon />}
                        checkedIcon={<StarRoundedIcon htmlColor="#FFD700" />}
                      />
                    ) : (
                      taskDetails.starred && (
                        <StarRoundedIcon htmlColor="#FFD700" />
                      )
                    )}
                  </Grid2>
                  <Grid2 size="grow">
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
                </Grid2>
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <Grid2
                  container
                  spacing={1}
                  alignItems={'center'}
                  justifyContent={{ xs: 'flex-end' }}
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
                      size="small"
                      {...(isInEditingState
                        ? {
                            onClick: () => {
                              console.log('ok');
                              dispatch({
                                type: 'update',
                                fieldName: 'completed',
                                newValue: !state.completed,
                              });
                            },
                          }
                        : {})}
                    >
                      {state.completed ? (
                        <DoneAllRoundedIcon
                          fontSize="inherit"
                          htmlColor="#7CFC00"
                        />
                      ) : (
                        <RemoveDoneRoundedIcon fontSize="inherit" />
                      )}
                    </IconButton>
                  </Grid2>
                  {/* TODO - Keep Completed as a standalone button - like delete */}
                  {/* <Grid2>
                    <Checkbox
                      size="small"
                      checked={state.completed}
                      onChange={(event) => {
                        dispatch({
                          type: 'update',
                          fieldName: 'completed',
                          newValue: event.target.checked,
                        });
                      }}
                      icon={<RemoveDoneRoundedIcon fontSize="inherit" />}
                      checkedIcon={
                        <DoneAllRoundedIcon
                          fontSize="inherit"
                          htmlColor="#7CFC00"
                        />
                      }
                    />
                  </Grid2> */}
                  {isInDeletingState && (
                    <Grid2>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        color="secondary"
                        onClick={() => {
                          cancelDelete();
                        }}
                      >
                        <CancelScheduleSendRoundedIcon fontSize="inherit" />
                      </IconButton>
                    </Grid2>
                  )}
                  <Grid2>
                    <IconButton
                      aria-label="delete"
                      // disabled={isInDeletingState}
                      size="small"
                      color="error"
                      onClick={() => {
                        handleDeleteTaskWithTimer(taskDetails.id);
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
            </Grid2>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            {isInDeletingState ? (
              <LinearProgress
                variant="determinate"
                value={deleteProgress}
                color="error"
                sx={{ height: '1px' }}
              />
            ) : (
              <Divider />
            )}
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
