import { Button, IconButton, Stack, Typography, useMediaQuery, Dialog, Box } from '@mui/material';
import Categories from './Categories/Categories';
import PriceRange from './PriceRange/PriceRange';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';
import { Close } from '@mui/icons-material';

function Filters() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:420px)');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack spacing={4} maxWidth={!isMobile ? 200 : '100%'}>
      {isMobile ? (
        <>
          <Button onClick={handleOpen} fullWidth variant="contained" startIcon={<FilterListIcon />}>
            Filters
          </Button>
          <Dialog fullScreen open={open} onClose={handleClose}>
            <Box p={4}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography fontSize="24px" variant="h3">
                  Filters
                </Typography>
                <IconButton onClick={handleClose}>
                  <Close />
                </IconButton>
              </Stack>
              <Categories />
              <PriceRange />
            </Box>
          </Dialog>
        </>
      ) : (
        <>
          <Typography fontSize="24px" variant="h3">
            Filters
          </Typography>
          <Categories />
          <PriceRange />
        </>
      )}
    </Stack>
  );
}

export default Filters;
