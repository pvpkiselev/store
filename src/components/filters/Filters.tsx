import { Button, Stack, Typography, useMediaQuery } from '@mui/material';
import Categories from './Categories/Categories';
import PriceRange from './PriceRange/PriceRange';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';
import MobileFilters from './MobileFilters';

function Filters() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:420px');

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Stack spacing={4}>
      {isMobile && (
        <>
          <Button onClick={handleOpen} fullWidth variant="contained" startIcon={<FilterListIcon />}>
            Filters
          </Button>
          <MobileFilters open={open} onClose={handleClose} />
        </>
      )}
      {!isMobile && (
        <>
          <Typography fontSize="24px" variant="h6">
            Filters
          </Typography>
          <Categories width="320px" height="320px" />
          <PriceRange width="200px" />
        </>
      )}
    </Stack>
  );
}

export default Filters;
