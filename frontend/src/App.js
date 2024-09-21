import { DarkTheme } from './appConfig/theme/DarkTheme';
import { LightTheme } from './appConfig/theme/LightTheme';
import TaskList from './pages/TaskList';
import { CssBaseline, ThemeProvider } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline />
      <TaskList />
    </ThemeProvider>
  );
}

export default App;
