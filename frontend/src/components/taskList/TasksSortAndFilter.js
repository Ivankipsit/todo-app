import {
  Grid2,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material';
import React from 'react';
import SortIcon from '@mui/icons-material/Sort';

export default function TasksSortAndFilter({ state, dispatch, notifyChange }) {
  const handleChange = (field_name) => (event, newValue) => {
    if (newValue) {
      dispatch({
        type: 'update',
        fieldName: field_name,
        newValue: newValue,
      });
      notifyChange();
    }
  };
  const toggleSortingOrder = () => {
    const newSortOrder = state.sort_by === 'asc' ? 'desc' : 'asc';
    dispatch({
      type: 'update',
      fieldName: 'sort_by',
      newValue: newSortOrder,
    });
    notifyChange();
  };
  return (
    <Grid2
      container
      spacing={1}
      justifyContent={'space-between'}
      sx={{ mx: 1 }}
    >
      <Grid2>
        <ToggleButtonGroup
          size="small"
          value={state.sorting_parameter}
          exclusive
          onChange={handleChange('sorting_parameter')}
        >
          <ToggleButton value="title">Title</ToggleButton>
          <ToggleButton value="complete_by">Complete By</ToggleButton>
        </ToggleButtonGroup>
        <Tooltip
          arrow
          placement="right"
          title={state.sort_by === 'asc' ? 'Sort in Desc..' : 'Sort in Asc..'}
        >
          <IconButton
            aria-label="reset"
            size="small"
            onClick={() => {
              toggleSortingOrder();
            }}
            sx={{
              ml: 1,
              borderRadius: '4px',
            }}
          >
            {state.sort_by === 'asc' ? (
              <SortIcon sx={{ rotate: '180deg', transform: 'scaleX(-1)' }} />
            ) : (
              <SortIcon />
            )}
          </IconButton>
        </Tooltip>
      </Grid2>
      <Grid2>
        <ToggleButtonGroup
          size="small"
          value={state.filter}
          onChange={handleChange('filter')}
        >
          <ToggleButton value="starred">Starred</ToggleButton>
          <ToggleButton value="overdue">Overdue</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>
      </Grid2>
      {/*
  Date and Time - Ascending/Descending
  Show only - Overdue, Ongoing, Starred
  */}
    </Grid2>
  );
}
