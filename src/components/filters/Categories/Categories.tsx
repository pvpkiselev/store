import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

function Categories() {
  const [category, setCategory] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="category-label">Category</InputLabel>
      <Select
        onChange={handleChange}
        value={category}
        autoWidth
        label="Category"
        labelId="category-label"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="1">Category1</MenuItem>
        <MenuItem value="2">Category2</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Categories;

