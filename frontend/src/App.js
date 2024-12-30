import { useReducer, useState } from 'react';
import {
  initialTasksState,
  TasksContext,
  updateTasksFn,
} from './appConfig/hooks/TasksContext';
import { DarkTheme } from './appConfig/theme/DarkTheme';
import { LightTheme } from './appConfig/theme/LightTheme';
import TaskList from './pages/TaskList';
import { CssBaseline, ThemeProvider } from '@mui/material';

function App() {
  const [tasksState, tasksDispatch] = useReducer(
    updateTasksFn,
    initialTasksState
  );

  
  return (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline />
      <TasksContext.Provider value={{ tasksState, tasksDispatch }}>
        <TaskList />
      </TasksContext.Provider>
    </ThemeProvider>
  );
}

export default App;
