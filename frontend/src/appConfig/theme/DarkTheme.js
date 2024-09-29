import { createTheme } from '@mui/material/styles';

// const referenceTheme = createTheme({
//   components: {
//     // Name of the component
//     MuiButtonBase: {
//       defaultProps: {
//         // The props to change the default for.
//         disableRipple: true, // No more ripple, on the whole application 💣!
//       },
//       styleOverrides: {
//         // Name of the slot
//         root: {
//           // Some CSS
//           fontSize: '1rem',

//           variants: [
//             {
//               props: { variant: 'outlined' },
//               style: {
//                 borderWidth: '3px',
//               },
//             },
//           ],
//         },
//       },
//     },
//   },
// });

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0052cc',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

export const DarkTheme = createTheme(theme, {
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
        },
      },
    },
  },
});
