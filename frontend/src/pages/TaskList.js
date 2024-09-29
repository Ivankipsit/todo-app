import React, { useEffect, useReducer, useState } from 'react';
import { TASKS } from '../appConfig/urlConfig';
import axios from 'axios';
import {
  Box,
  Button,
  Divider,
  Grid2,
  Grow,
  IconButton,
  LinearProgress,
  Paper,
  Skeleton,
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
import HeaderPaper from '../components/common/layouts/HeaderPaper';
import TasksHeader, {
  renderFunction,
} from '../components/taskList/TasksHeader';
import dayjs from 'dayjs';
import Task from '../components/taskList/Task';
import TasksSortAndFilter from '../components/taskList/TasksSortAndFilter';
import { TaskLoadingSkeleton } from '../components/taskList/utils';

const initialSortAndFilter = {
  filter: [],
  sorting_parameter: 'complete_by',
  sort_by: 'asc',
};

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
  const [filterState, filterDispatch] = useReducer(
    renderFunction,
    initialSortAndFilter
  );

  const [open, setOpen] = React.useState(false);
  const [changeMonitor, setChangeMonitor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    axios
      .get(TASKS, { params: filterState })
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [changeMonitor]);
  return (
    <>
      <TasksHeader notifyChange={notifyChange} />
      <TasksSortAndFilter
        state={filterState}
        dispatch={filterDispatch}
        notifyChange={notifyChange}
      />
      <Box sx={{ m: 1 }}>
        {isLoading ? (
          <Grid2 container spacing={1} direction={'row'}>
            {Array.from(new Array(4)).map((item, index) => (
              <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
                <TaskLoadingSkeleton />
              </Grid2>
            ))}
          </Grid2>
        ) : (
          <Grid2 container spacing={1}>
            {data &&
              data.map((task, index) => (
                <Grid2 key={index} size={{ xs: 12, md: 6, lg: 4 }}>
                  <Task taskDetails={task} notifyChange={notifyChange} />
                </Grid2>
              ))}
          </Grid2>
        )}
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
