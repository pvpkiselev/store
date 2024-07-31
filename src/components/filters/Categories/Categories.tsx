import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';

function Categories(props: { height: string; width: string }) {
  const { height, width } = props;

  return (
    <FormControl
      component="fieldset"
      variant="standard"
      sx={{
        maxHeight: height,
        width: width,
        overflowY: 'auto',
      }}
    >
      <FormLabel>
        <FormGroup sx={{ pl: 2 }}>
          <FormControlLabel label="1cat" control={<Checkbox name="1cat" />} />
          <FormControlLabel label="2cat" control={<Checkbox name="2cat" />} />
          <FormControlLabel label="2cat" control={<Checkbox name="2cat" />} />
          <FormControlLabel label="2cat" control={<Checkbox name="2cat" />} />
          <FormControlLabel label="2cat" control={<Checkbox name="2cat" />} />
          <FormControlLabel label="2cat" control={<Checkbox name="2cat" />} />
          <FormControlLabel label="2cat" control={<Checkbox name="2cat" />} />
          <FormControlLabel label="2cat" control={<Checkbox name="2cat" />} />
        </FormGroup>
      </FormLabel>
    </FormControl>
  );
}

export default Categories;
