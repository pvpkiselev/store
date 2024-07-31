import { Box, Dialog, IconButton, Stack, Typography } from '@mui/material';
import Categories from './Categories/Categories';
import PriceRange from './PriceRange/PriceRange';
import { Close } from '@mui/icons-material';

function MobileFilters(props: { open: boolean; onClose: () => void }) {
  const { open, onClose } = props;
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          p: 6,
        },
      }}
    >
      <Box>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontSize="24px" variant="h6">
            Filters
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
        <Categories width="100%" height="50vh" />
        <PriceRange width="100%" />
      </Box>
    </Dialog>
  );
}

export default MobileFilters;
