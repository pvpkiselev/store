import { useAppDispatch } from '@/store/redux';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
} from '@mui/material';
import { useState } from 'react';

function Categories() {
  const dispatch = useAppDispatch();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  // const handleCategoriesToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const categoryId = Number(event.target.id);
  //   setSelectedCategories((prev) => {
  //     const isSelected = prev.includes(categoryId);
  //     const newSelected = isSelected
  //       ? prev.filter((id) => id !== categoryId)
  //       : [...prev, categoryId];
  //     dispatch(toggledCategories(newSelected));
  //     return newSelected;
  //   });
  // };

  return (
    <FormControl component="fieldset" variant="standard" fullWidth>
      <Typography fontSize={18}>Categories</Typography>
      <FormLabel
        sx={{
          height: 320,
          width: '100%',
          overflowY: 'auto',
        }}
      >
        {/* <FormGroup sx={{ pl: 2, width: '100%' }}>
          <FormControlLabel
            label="1cat"
            control={
              <Checkbox
                name="1cat"
                id="1"
                checked={selectedCategories.includes(1)}
                onChange={handleCategoriesToggle}
              />
            }
          />
          <FormControlLabel label="2cat" control={<Checkbox name="2cat" />} />
          <FormControlLabel label="2cat" control={<Checkbox name="2cat" />} />
          <FormControlLabel label="2cat" control={<Checkbox name="2cat" />} />
          <FormControlLabel label="2cat" control={<Checkbox name="2cat" />} />
          <FormControlLabel label="2cat" control={<Checkbox name="2cat" />} />
          <FormControlLabel label="2cat" control={<Checkbox name="2cat" />} />
          <FormControlLabel label="2cat" control={<Checkbox name="2cat" />} />
        </FormGroup> */}
      </FormLabel>
    </FormControl>
  );
}

export default Categories;
