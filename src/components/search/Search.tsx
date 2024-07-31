import { FormControl, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Close } from '@mui/icons-material';

function Search() {
  const handleResetClick = () => {};

  return (
    <FormControl sx={{ minWidth: '100%' }}>
      <TextField
        variant="outlined"
        // onChange={handleQueryChange}
        // value={localQuery}
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" onClick={handleResetClick}>
              <Close />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
}

export default Search;
