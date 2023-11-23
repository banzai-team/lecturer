import React from 'react';
import {useParams} from "react-router";

import {
    Box,
    Divider,
    Drawer,
    Toolbar,
    Typography
} from "@mui/material";

import PageTitle from "../components/PageTitle";
import {Routes} from "./router";
import {Head} from "../components/Head";
import BackLink from "../components/BackLink";

const drawerWidth = 240;

const LecturePage: React.FC = () => {
    const {id = ""} = useParams();

    // DATA NOT FROM API ! ! !
    const data = {id, name: "My best lecture", date: "10.11.2023"};

    return (
        <>
            <Head title={`Лекция "${data.name}"`}/>
            {/*<Box display='flex' flexDirection='column' position={"relative"}>*/}
            {/*    /!*<MainData>HEADER</MainData>*!/*/}
            {/*    /!*<Box display='flex' flexDirection='column' flex={1} >*!/*/}

            {/*    /!*</Box>*!/*/}
            {/*</Box>*/}

            <Box sx={{ display: 'flex'}}>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar />
                    <Divider />
                    SCHEMA
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <BackLink to={Routes.ROOT}>
                        назад к лекциям
                    </BackLink>

                    <PageTitle>
                        {data.name}
                    </PageTitle>
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
                </Box>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="right"
                >
                    <Toolbar />
                    <Divider />
                    GLOSARIY
                </Drawer>
            </Box>
        </>
    );
};

export default LecturePage;