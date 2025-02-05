"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardProps, ButtonProps } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const CardRoot = styled(Card, {
    name: 'MuiCard',
    slot: 'root',
})(({ theme }) => ({
    padding: "0",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "32px",
    boxShadow: theme.shadows[2],
    letterSpacing: '-0.025em',
    fontWeight: 600,
    variants: [
        {
            props: {
                variant: 'outlined',
            },
            style: {
                border: `2px solid ${theme.palette.divider}`,
                boxShadow: 'none',
            },
        },
    ],
}));

const LeftArrowButton = styled((props: ButtonProps) => {
    const { ...other } = props;
    return <Button {...other} />;
})(({ theme }) => ({
    padding: '8px',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: true,
            style: {
                padding: '8px',
            },
        },
    ],
}));

interface TeraCardProps {
    title: string;
    back: boolean;
    children?: React.ReactNode;
}

export function TeraCard({ ...props }: TeraCardProps) {
    const { title, back, children } = props;

    const pageHistoryBack = () => {
        window.history.back();
    }

    return (
        <CardRoot>
            <CardHeader
                avatar={(back && <LeftArrowButton variant="outlined" className='border-2' size="large" aria-label="settings" onClick={pageHistoryBack} style={{ padding: "9px 7px" }}>
                    <ArrowBackIosNewIcon />
                </LeftArrowButton>)
                }
                title={
                    <Typography variant="h5" component="div" className='text-center font-bold'>
                        {title} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                    </Typography>
                }
                sx={{
                    padding: "18px 24px",
                }}
                divider={true}
                classes={{
                    root: 'border-b-2',
                }}
            />
            <CardContent sx={{
                padding: "0px",
                paddingBottom: "0px !important"
            }}>
                
                {children}
                
            </CardContent>
        </CardRoot>
    )
}