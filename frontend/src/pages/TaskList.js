import React, { useEffect, useState } from 'react';
import { TASKS } from '../appConfig/urlConfig';
import axios from 'axios';
import {
  Box,
  Button,
  Grid2,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Typography,
} from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ShareIcon from '@mui/icons-material/Share';
import LoupeIcon from '@mui/icons-material/Loupe';

const actions = [
  {
    icon: <AddTaskIcon />,
    name: 'Add Task',
    process: () => {
      console.log('Adding Tasks');
    },
  },
  {
    icon: <ShareIcon />,
    name: 'Share',
    process: () => {
      console.log('Sharing Tasks');
    },
  },
];
export default function TaskList() {
  const [data, setData] = useState(null);

  const [open, setOpen] = React.useState(false);
  const [defaultAction, setDefaultAction] = useState(actions[0]);
  const handleOpen = () => setOpen(true);
  const handleClose = (actionClicked = null) => {
    if (actionClicked) {
      setDefaultAction(actionClicked);
      actionClicked.process();
    }
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(TASKS)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
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
              color="secondary"
              startIcon={<LoupeIcon />}
            >
              Add Task
            </Button>
          </Grid2>
        </Grid2>
      </Paper>
      <Box sx={{ m: 1 }}>
        <Grid2 container spacing={1}>
          {data &&
            data.map((task, index) => (
              <Grid2 key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Paper sx={{ p: 1 }}>
                  <Stack>{task.title}</Stack>
                </Paper>
              </Grid2>
            ))}
        </Grid2>
      </Box>

      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={defaultAction.icon}
        onMouseEnter={handleOpen}
        onMouseLeave={() => handleClose()}
        onClick={() => {
          handleClose(defaultAction);
        }}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={
              <span style={{ whiteSpace: 'nowrap' }}>{action.name}</span>
            } // Prevent line break
            tooltipOpen
            onClick={(event) => {
              /* Using event.stopPropagation() effectively isolates the action's click behavior,
              preventing the parent component's click handler from running.*/
              event.stopPropagation(); // Prevent event bubbling
              handleClose(action);
            }}
          />
        ))}
      </SpeedDial>
    </>
  );
}
