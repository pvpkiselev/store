import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface AppLinkProps {
  to: string;
  children: React.ReactNode;
  disabled?: boolean;
}

function AppLink(props: AppLinkProps) {
  const { to, children, disabled = false } = props;

  return (
    <Link
      to={disabled ? '#' : to}
      style={{ textDecoration: 'none', pointerEvents: disabled ? 'none' : 'auto' }}
    >
      <Typography
        color={disabled ? 'text.disabled' : 'initial'}
        sx={{
          '&:hover': {
            color: disabled ? 'text.disabled' : 'primary.main',
            textDecoration: disabled ? 'none' : 'underline',
          },
          '&:active': {
            color: disabled ? 'text.disabled' : 'secondary.main',
          },
        }}
      >
        {children}
      </Typography>
    </Link>
  );
}

export default AppLink;
