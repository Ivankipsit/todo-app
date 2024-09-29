import React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

export default function InputDateTimeField({
  label,
  value,
  onChange,
  calenderIcon,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={`Select ${label}`}
        value={value}
        onChange={(newValue) => {
          onChange(newValue);
        }}
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
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
