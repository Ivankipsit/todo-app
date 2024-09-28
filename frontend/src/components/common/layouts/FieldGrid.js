import { Grid2 } from '@mui/material';
import React from 'react';

export default function FieldGrid({ fieldName, children }) {
  return (
    <Grid2 size={{ xs: 12, sm: 10, md: 8 }}>
      <Grid2
        container
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid2 size={{ xs: 12, sm: 6 }}>{fieldName}</Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>{children}</Grid2>
      </Grid2>
    </Grid2>
  );
}
