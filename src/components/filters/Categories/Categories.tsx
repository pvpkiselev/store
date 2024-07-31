import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useState } from 'react';

function Categories() {
  const [category, setCategory] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <Box width="100%">
      <Typography fontSize={18} pb={3}>
        Category
      </Typography>
      <FormControl fullWidth>
        <InputLabel size="small" htmlFor="category">
          Category
        </InputLabel>
        <Select onChange={handleChange} value={category} autoWidth label="Category" id="category">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="1">Category1</MenuItem>
          <MenuItem value="2">Category2</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Categories;
