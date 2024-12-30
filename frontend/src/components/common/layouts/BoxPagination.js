import { Pagination, PaginationItem } from '@mui/material';
import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

export default function BoxPagination(page, count, onChange) {
  const handleChange = (event, value) => {
    onChange(value);
  };
  return (
    <Pagination
      page={page}
      count={count}
      // defaultPage={6}
      boundaryCount={2}
      onChange={handleChange}
      renderItem={(item) => (
        <PaginationItem
          slots={{
            first: KeyboardDoubleArrowLeftIcon,
            previous: KeyboardArrowLeftIcon,
            next: KeyboardArrowRightIcon,
            last: KeyboardDoubleArrowRightIcon,
          }}
          {...item}
        />
      )}
    />
  );
}
