import { Box, Slider, Typography } from '@mui/material';
import { useState } from 'react';

const minDistance = 10;
const min = 0;
const max = 300;

function PriceRange() {
  const [value, setValue] = useState<number[]>([min, max]);

  const handleChange = (_: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], max - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue as number[]);
    }
  };

  const marks = [
    {
      value: min,
      label: `${min}`,
    },
    {
      value: max,
      label: `${max}`,
    },
  ];

  return (
    <>
      <Box>
        <Typography fontSize="18px" variant="h6">
          Price
        </Typography>
        <Slider
          getAriaLabel={() => 'Price'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          disableSwap
          min={min}
          max={max}
          marks={marks}
          step={minDistance}
        />
      </Box>
    </>
  );
}

export default PriceRange;
