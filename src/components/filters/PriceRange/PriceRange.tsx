import { Box, Slider, Typography } from '@mui/material';
import { useState } from 'react';

const minDistance = 10;
const min = 0;
const max = 300;

function PriceRange() {
  const [localRange, setLocalRange] = useState<number[]>([min, max]);

  const handleChange = (_event: Event, range: number | number[]) => {
    if (Array.isArray(range)) {
      setLocalRange(range);
    }
  };

  return (
    <Box width="100%">
      <Typography fontSize={18}>Price, $</Typography>
      <Slider
        getAriaLabel={() => 'Price'}
        value={localRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        disableSwap
        min={min}
        max={max}
        step={minDistance}
      />
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize="14px">from {localRange[0]}</Typography>
        <Typography fontSize="14px">to {localRange[1]}</Typography>
      </Box>
    </Box>
  );
}

export default PriceRange;
