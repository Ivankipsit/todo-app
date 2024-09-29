import React, { useEffect, useState } from 'react';
import { TASKS } from '../appConfig/urlConfig';
import axios from 'axios';
import {
  Box,
  Button,
  Divider,
  Grid2,
  Grow,
  IconButton,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Typography,
} from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ShareIcon from '@mui/icons-material/Share';
import HeaderPaper from '../components/common/layouts/HeaderPaper';
import TasksHeader from '../components/taskList/TasksHeader';
import dayjs from 'dayjs';
import Task from '../components/taskList/Task';

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
  const [changeMonitor, setChangeMonitor] = useState(false);
  const notifyChange = () => {
    setChangeMonitor(!changeMonitor);
  };
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
  }, [changeMonitor]);
  return (
    <>
      <TasksHeader notifyChange={notifyChange} />
      <Grid2 container spacing={1} justifyContent={'flex-end'}>
        {/*
        Date and Time - Ascending/Descending
        Show only - Overdue, Ongoing, Starred
        */}
      </Grid2>
      <Box sx={{ m: 1 }}>
        <Grid2 container spacing={1}>
          {data &&
            data.map((task, index) => (
              <Grid2 key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Task taskDetails={task} notifyChange={notifyChange} />
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
