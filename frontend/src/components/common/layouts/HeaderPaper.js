import { Grid2, Paper } from '@mui/material';
import React from 'react';

export default function HeaderPaper({ title, children, ...props }) {
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
          <Grid2>{title}</Grid2>
          <Grid2>{children}</Grid2>
        </Grid2>
      </Paper>
    </>
  );
}
