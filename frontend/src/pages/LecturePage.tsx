import React from 'react';
import {useParams} from "react-router";

import {Box, Typography, Paper} from "@mui/material";

import PageTitle from "../components/PageTitle";
import {Routes} from "./router";
import {Head} from "../components/Head";
import BackLink from "../components/BackLink";
import SideBlock from "../components/SideBlock";
import GlosaryItem from "../components/GlosaryItem";

const drawerWidth = 240;

const LecturePage: React.FC = () => {
    const {id = ""} = useParams();

    // DATA NOT FROM API ! ! !
    const data = {id, name: "My best lecture", date: "10.11.2023"};
    const glosary = [
        {
            title: "Слово",
            description: "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper"
        },
        {
            title: "СловоСловоСловоСлово",
            description: "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper"
        },
        {
            title: "Слово сложное",
            description: "Consequat mauris"
        },
    ]

    return (
        <>
            <Head title={`Лекция "${data.name}"`}/>
            <Box sx={{ display: 'flex'}}>
                <SideBlock
                    anchor="left"
                >
                    <PageTitle>
                        Содержание:
                    </PageTitle>
                </SideBlock>
                <Box component="main" sx={{flexGrow: 1}}>
                    <BackLink to={Routes.ROOT}>
                        назад к лекциям
                    </BackLink>

                    <PageTitle>
                        {data.name}
                    </PageTitle>
                    <Paper
                        sx={{p: 3}}
                    >
                        <Typography paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                            enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                            imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                            Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                            Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                            nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                            leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                            feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                            sapien faucibus et molestie ac.
                        </Typography>
                        <Typography paragraph>
                            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                            eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                            neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                            tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                            sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                            tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                            et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                            tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                            eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                            posuere sollicitudin aliquam ultrices sagittis orci a.
                        </Typography>
                    </Paper>
                </Box>
                <SideBlock
                    anchor="right"
                >
                    <PageTitle>
                        Глосарий:
                    </PageTitle>
                    {
                        glosary.map((item, key) => (
                            <GlosaryItem
                                key={`word-${key}`}
                                title="Слово"
                                description="Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper"
                            />
                        ))
                    }
                </SideBlock>
            </Box>
        </>
    );
};

export default LecturePage;