import React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';

export default function InputDateField({
  label,
  value,
  onChange,
  calenderIcon,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={`Select ${label}`}
        value={value}
        onChange={(newValue) => {
          onChange(newValue);
        }}
        slots={{
          openPickerIcon: calenderIcon ?? InsertInvitationIcon,
        }}
        slotProps={{
          textField: {
            size: 'small',
            fullWidth: true,
          },
        }}
      />
    </LocalizationProvider>
  );
}
