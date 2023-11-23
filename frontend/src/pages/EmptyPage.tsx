import React from 'react';
import {Box, Typography} from "@mui/material";

type EmptyPageProps = {
    text?: string;
    children?: any;
}
const EmptyPage: React.FC<EmptyPageProps> = ({text, children}) => {
    return (
        <Box paddingTop={10}>
            {
                text ? (
                    <Typography variant="h6" gutterBottom color="primary" fontWeight='fontWeightBold'>
                        {text}
                    </Typography>
                ) : null
            }
            {
                children ? <Box>{children}</Box> : null
            }
        </Box>
    );
};

export default EmptyPage;