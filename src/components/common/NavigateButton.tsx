import useAppNavigate from '@/hooks/useAppNavigate';
import { ArrowBack } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';

interface Styles {
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
  direction: 'home' | 'back';
}

const navButtonText = {
  home: 'Go To Home',
  back: 'Go Back',
};

function NavigateButton(props: Styles) {
  const { color = 'primary', variant = 'contained', direction } = props;
  const { goBack, goToHome } = useAppNavigate();

  const handleClick = () => {
    switch (direction) {
      case 'home':
        goToHome();
        break;
      case 'back':
        goBack();
        break;
      default:
        console.error('Unknown direction:', direction);
    }
  };

  const buttonText = direction === 'home' ? navButtonText.home : navButtonText.back;

  const isIcon = direction === 'back';

  return (
    <Button
      color={color}
      variant={variant}
      onClick={handleClick}
      startIcon={isIcon && <ArrowBack color={color} />}
    >
      {buttonText}
    </Button>
  );
}

export default NavigateButton;
