import React from 'react';

import {Box, Typography} from "@mui/material";
import EditableText from "./EditableText";

type GlosaryItemProps = {
    title: string,
    description: string,
}

const GlosaryItem: React.FC<GlosaryItemProps> = ({title, description }) => (
    <Box mb={2}>
        <Typography variant="subtitle1" fontWeight='fontWeightBold' align={"left"} display="inline-block" pr={1}>
            {title}:
        </Typography>
        <EditableText currentValue={description}/>
    </Box>
);

export default GlosaryItem