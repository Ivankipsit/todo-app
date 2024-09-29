import { TextField } from '@mui/material';
import React from 'react';

export default function InputTextField({ label, value, onChange }) {
  return (
    <TextField
      label={`Enter ${label}`}
      size="small"
      fullWidth
      value={value}
      onChange={(newValue) => {
        onChange(newValue);
      }}
    />
  );
}
