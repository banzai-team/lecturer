import React from 'react';
import {Box, Container, Typography} from "@mui/material";

type EmptyPageProps = {
    text?: string;
    children?: any;
}
const EmptyPage: React.FC<EmptyPageProps> = ({text, children}) => {
    return (
        <Container sx={{ paddingTop: 10 }}>
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
        </Container>
    );
};

export default EmptyPage;