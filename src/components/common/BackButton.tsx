import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

interface Styles {
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

function BackButton(props: Styles) {
  const { color } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleBack = () => {
    navigate(from, { replace: true });
  };

  return (
    <Button color={color} onClick={handleBack} startIcon={<ArrowBack color={color} />}>
      Back
    </Button>
  );
}

export default BackButton;
