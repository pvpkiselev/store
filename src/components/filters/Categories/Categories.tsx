import { useEffect } from 'react';
import { selectCategories, selectCurrentCategoryId } from '@/store/filters/filtersSelectors';
import { changedCategoryId } from '@/store/filters/filtersSlice';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { getCategoriesThunk } from '@/store/filters/filtersThunks';

function Categories() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const selectedCategoryId = useAppSelector(selectCurrentCategoryId);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, []);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const validValue = event.target.value === '' ? null : Number(event.target.value);
    dispatch(changedCategoryId(validValue));
  };

  const defaultValue = '0';
  const actualValue = selectedCategoryId === null ? defaultValue : String(selectedCategoryId);

  return (
    <Box width="100%">
      <Typography variant="h6" pb={3}>
        Category
      </Typography>
      <FormControl fullWidth>
        <Select
          onChange={handleCategoryChange}
          value={actualValue}
          id="category"
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={defaultValue}>All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default Categories;
