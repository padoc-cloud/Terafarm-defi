import { blueGrey } from '@mui/material/colors';

export const lightPaletteText = {
    primary: 'rgb(17, 24, 39)',
    secondary: 'rgb(107, 114, 128)',
    disabled: 'rgb(149, 156, 169)',
};

export const darkPaletteText = {
    primary: 'rgb(255,255,255)',
    secondary: 'rgb(148, 163, 184)',
    disabled: 'rgb(156, 163, 175)',
};

const themesConfig = {
    default: {
        palette: {
            mode: 'light',
            divider: '#e2e8f0',
            text: lightPaletteText,
            common: {
                black: 'rgb(17, 24, 39)',
                white: 'rgb(255, 255, 255)',
            },
            primary: {
                light: '#64748b',
                main: '#1e293b',
                dark: '#0f172a',
                contrastText: darkPaletteText.primary,
            },
            secondary: {
                light: '#818cf8',
                main: '#4f46e5',
                dark: '#3730a3',
                contrastText: darkPaletteText.primary,
            },
            background: {
                paper: '#FFFFFF',
                default: '#f1f5f9',
            },
            error: {
                light: '#ffcdd2',
                main: '#f44336',
                dark: '#b71c1c',
            },
        },
        status: {
            danger: 'orange',
        },
    },
    defaultDark: {
        palette: {
            mode: 'dark',
            divider: 'rgba(241,245,249,.12)',
            text: darkPaletteText,
            common: {
                black: 'rgb(17, 24, 39)',
                white: 'rgb(255, 255, 255)',
            },
            primary: {
                light: '#64748b',
                main: '#334155',
                dark: '#0f172a',
                contrastText: darkPaletteText.primary,
            },
            secondary: {
                light: '#818cf8',
                main: '#4f46e5',
                dark: '#3730a3',
                contrastText: darkPaletteText.primary,
            },
            background: {
                paper: '#1e293b',
                default: '#111827',
            },
            error: {
                light: '#ffcdd2',
                main: '#f44336',
                dark: '#b71c1c',
            },
            status: {
                danger: 'orange',
            },
        },
    },
    light: {
        palette: {
            mode: 'light',
            divider: '#e2e8f0',
            text: lightPaletteText,
            common: {
                black: 'rgb(17, 24, 39)',
                white: 'rgb(255, 255, 255)',
            },
            primary: {
                light: '#64748b',
                main: '#1e293b',
                dark: '#0f172a',
                contrastText: darkPaletteText.primary,
            },
            secondary: {
                light: '#818cf8',
                main: '#4f46e5',
                dark: '#3730a3',
                contrastText: darkPaletteText.primary,
            },
            background: {
                paper: '#FFFFFF',
                default: '#f1f5f9',
            },
            error: {
                light: '#ffcdd2',
                main: '#f44336',
                dark: '#b71c1c',
            },
        },
        status: {
            danger: 'red',
        },
    },
    light1: {
        palette: {
            mode: 'light',
            divider: '#e2e8f0',
            text: lightPaletteText,
            primary: {
                light: '#b3d1d1',
                main: '#006565',
                dark: '#003737',
                contrastText: darkPaletteText.primary,
            },
            secondary: {
                light: '#ffecc0',
                main: '#FFBE2C',
                dark: '#ff9910',
                contrastText: lightPaletteText.primary,
            },
            background: {
                paper: '#F0F7F7',
                default: '#F0F7F7',
            },
            error: {
                light: '#ffcdd2',
                main: '#f44336',
                dark: '#b71c1c',
            },
        },
        status: {
            danger: 'red',
        },
    },
    dark: {
        palette: {
            mode: 'dark',
            divider: 'rgba(241,245,249,.12)',
            text: darkPaletteText,
            primary: {
                light: '#C2C2C3',
                main: '#323338',
                dark: '#131417',
                contrastText: darkPaletteText.primary,
            },
            secondary: {
                light: '#B8E1D9',
                main: '#129B7F',
                dark: '#056D4F',
                contrastText: darkPaletteText.primary,
            },
            background: {
                paper: '#262526',
                default: '#1E1D1E',
            },
            error: {
                light: '#ffcdd2',
                main: '#f44336',
                dark: '#b71c1c',
            },
        },
        status: {
            danger: 'orange',
        },
    },
};

export default themesConfig;
