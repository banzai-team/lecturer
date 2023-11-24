import React from 'react';

import {Box, Typography} from "@mui/material";

type GlosaryItemProps = {
    title: string,
    description: string,
}

const GlosaryItem: React.FC<GlosaryItemProps> = ({title, description }) => (
    <Box mb={2}>
        <Typography variant="subtitle1" fontWeight='fontWeightBold' align={"left"} display="inline-block" pr={1}>
            {title}:
        </Typography>
        <Typography variant="body2" align={"left"} display="inline">
            {description}
        </Typography>
    </Box>
);

export default GlosaryItem