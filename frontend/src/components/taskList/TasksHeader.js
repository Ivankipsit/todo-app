import { Box, Button, Collapse, Grid2, Paper } from '@mui/material';
import React, { useReducer, useState } from 'react';
import LoupeIcon from '@mui/icons-material/Loupe';
import FieldGrid from '../common/layouts/FieldGrid';
import InputTextField from '../common/fields/InputTextField';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import InputDateField from '../common/fields/InputDateField';
import EventNoteIcon from '@mui/icons-material/EventNote';
import InputDateTimeField from '../common/fields/InputDateTimeField';
import dayjs from 'dayjs';
import axios from 'axios';
import { TASKS } from '../../appConfig/urlConfig';

const taskInitiateInitialState = {
  title: '',
  description: '',
  complete_by: null,
};

const renderFunction = (state, action) => {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        [action.fieldName]: action.newValue,
      };
    case 'updateAll':
      return {
        ...action.updateTo,
      };
    default:
      return;
  }
};

export default function TasksHeader({ notifyChange }) {
  const [state, dispatch] = useReducer(
    renderFunction,
    taskInitiateInitialState
  );
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    resetFields()
    setOpen(!open);
  };

  const resetFields = () => {
    dispatch({
      type: 'updateAll',
      updateTo: taskInitiateInitialState,
    });
  };

  function handleSaveTask() {
    const data = { ...state, complete_by: dayjs(state.complete_by).format() };
    axios
      .post(`${TASKS}/`, data)
      .then((response) => {
        console.log(response);
        resetFields();
        notifyChange();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Box>
      <Paper sx={{ p: 1, px: 1.5, m: 1 }}>
        <Grid2
          container
          spacing={1}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Grid2>My Tasks</Grid2>
          <Grid2>
            <Button
              variant="outlined"
              color={open ? 'error' : 'secondary'}
              startIcon={open ? <CloseIcon /> : <LoupeIcon />}
              onClick={() => {
                toggleOpen();
              }}
            >
              {open ? 'Close' : 'Add Task'}
            </Button>
          </Grid2>
        </Grid2>
      </Paper>
      <Collapse in={open}>
        <Paper sx={{ p: 1, px: 1.5, m: 1, my: 0 }}>
          <Grid2
            container
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            spacing={1}
          >
            <FieldGrid fieldName={'Task Title'}>
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
            </FieldGrid>
            <FieldGrid fieldName={'Task Description'}>
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
            </FieldGrid>
            <FieldGrid fieldName={'Complete Task By'}>
              <InputDateTimeField
                label={'Complete By'}
                value={state.complete_by}
                onChange={(event) => {
                  dispatch({
                    type: 'update',
                    fieldName: 'complete_by',
                    newValue: event,
                  });
                }}
                calenderIcon={EventNoteIcon}
              />
            </FieldGrid>
            <Grid2
              container
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              spacing={1}
              size={{ xs: 12 }}
            >
              <Grid2>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<RestartAltIcon />}
                  onClick={() => {
                    resetFields();
                  }}
                >
                  Reset
                </Button>
              </Grid2>
              <Grid2>
                <Button
                  variant="outlined"
                  color={'success'}
                  startIcon={<LoupeIcon />}
                  onClick={() => {
                    handleSaveTask();
                  }}
                >
                  Add
                </Button>
              </Grid2>
            </Grid2>
          </Grid2>
        </Paper>
      </Collapse>
    </Box>
  );
}
