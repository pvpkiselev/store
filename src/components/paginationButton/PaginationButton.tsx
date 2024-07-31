import { useAppDispatch, useAppSelector } from '@/store/redux';
import { selectFiltersStatus } from '@/store/filters/filtersSelectors';
import { changedOffset } from '@/store/filters/filtersSlice';
import { LoadingButton } from '@mui/lab';

const DEFAULT_LIMIT = 20;

function PaginationButton() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectFiltersStatus);
  const isPending = status === 'pending';

  const handleOffsetChange = () => {
    dispatch(changedOffset(DEFAULT_LIMIT));
  };

  return (
    <LoadingButton loading={isPending} variant="contained" onClick={handleOffsetChange} fullWidth>
      Show More
    </LoadingButton>
  );
}

export default PaginationButton;
