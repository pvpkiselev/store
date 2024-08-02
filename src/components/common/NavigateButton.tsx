import useAppNavigate from '@/hooks/useAppNavigate';
import { ArrowBack } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';

interface Styles {
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
  direction: 'home' | 'back' | 'checkout';
}

function NavigateButton(props: Styles) {
  const { color = 'primary', variant = 'contained', direction } = props;
  const { goBack, goToHome, goToCheckout } = useAppNavigate();

  const handleClick = () => {
    switch (direction) {
      case 'home':
        goToHome();
        break;
      case 'back':
        goBack();
        break;
      case 'checkout':
        goToCheckout();
        break;
      default:
        console.error('Unknown direction:', direction);
    }
  };

  const buttonText =
    direction === 'home' ? 'Go To Home' : direction === 'checkout' ? 'Go To Checkout' : 'Go Back';

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
