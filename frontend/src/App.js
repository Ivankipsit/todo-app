import { LightTheme } from './appConfig/theme/LightTheme';
import TaskList from './pages/TaskList';
import { ThemeProvider } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <TaskList />
    </ThemeProvider>
  );
}

export default App;
