'use client';
import type { ButtonProps as MuiButtonProps } from '@mui/material';
import { Button as MuiButton, alpha, darken } from '@mui/material'; //ButtonProps
import { styled } from '@mui/material/styles';

export const ButtonBase = styled(MuiButton)<MuiButtonProps>(({ theme }) => ({
  padding: '24px 32px 24px 32px',
  borderRadius: '9999px',
  fontSize: '16px',
  letterSpacing: 0,
  textTransform: 'none',
  fontWeight: 700,
  overflow: 'hidden',
  height: '48px',
  color: '#fff',
  '&:hover': {
    backgroundColor:'#4a6cf7',
  },
  [theme.breakpoints.down('sm')]: {
    height: 40,
    fontSize: '14px'
  },
}));

export const ButtonPrimary = styled(ButtonBase)<MuiButtonProps>(
  () => ({
    color: '#fff',
    backgroundColor:'#4a6cf7',
    ':hover': {
      backgroundColor: darken('#4a6cf7', 0.16),
    },
  }),
);

export const ButtonSecondary = styled(ButtonBase)<MuiButtonProps>(
  () => ({
    border: '1px solid #4a6cf7',
    color: '#4a6cf7',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: alpha('#4a6cf7', 0.1),
    },
  }),
);

export const WalletListButton = styled(ButtonBase)<MuiButtonProps>(
  () => ({
    border: '0.5px solid rgba(255, 255, 255, 0.3)',
    padding: '12px 12px',
    borderRadius: '8px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2) !important',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:active': {
      backgroundColor: 'rgba(255, 255, 255, 0.35)',
    },
  }),
);