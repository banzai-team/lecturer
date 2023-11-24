import React from 'react';
import {useParams} from "react-router";

import {Box, IconButton, Paper, Tooltip, Typography} from "@mui/material";

import PageTitle from "../components/PageTitle";
import {Routes} from "./router";
import {Head} from "../components/Head";
import BackLink from "../components/BackLink";
import SideBlock from "../components/SideBlock";
import GlosaryItem from "../components/GlosaryItem";
import {getLecture} from "../domain/api";
import {useQuery} from "react-query";
import EmptyPage from "./EmptyPage";
import CircularProgress from "@mui/material/CircularProgress";
import {Link} from "react-router-dom";
import {formData} from "../utils/DateUtils";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddGlosaryItemForm from "../components/AddGlosaryItemForm";
const LecturePage: React.FC = () => {
    const [hasAddForm, setHasAddForm] = React.useState(false);

    const {id = ""} = useParams();

    const {data: lecture, isLoading, error} = useQuery(id, () => getLecture(id));

    if (isLoading) {
        return (
            <EmptyPage>
                <CircularProgress color="primary"/>
            </EmptyPage>
        )
    }

    if (error) {
        return (
            <EmptyPage text="Ой! Произошла ошибка с данной лекцией">
                <Link to={Routes.ROOT}>Перейти на главную страницу</Link>
            </EmptyPage>
        )
    }

    const data = lecture?.data;


    // DATA NOT FROM API ! ! !
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
            <Head title={`Лекция "${data.lectureName}"`}/>
            <Box sx={{display: 'flex'}}>
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

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <PageTitle>
                            {data.lectureName}
                        </PageTitle>
                        <Typography variant="subtitle2" color="primary" fontWeight='fontWeightNormal'>
                            {formData(data.createdAt)}
                        </Typography>
                    </Box>

                    <Paper
                        sx={{p: 3}}
                    >
                        <Typography paragraph align="justify">
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
                        <Typography paragraph align="justify">
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
                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                        <PageTitle>
                            Глосарий:
                        </PageTitle>
                        <Tooltip title="Добавить">
                            <IconButton
                                aria-label="add"
                                color="primary"
                                size="small"
                                onClick={() => setHasAddForm(true)}
                                sx={{border: "1px solid", "&:focus": {outline: "none"}}}
                            >
                                <AddOutlinedIcon fontSize="medium"/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    { hasAddForm ? (
                        <AddGlosaryItemForm onClose={() => setHasAddForm(false)} />
                    ) : null}

                    {
                        glosary.map((item, key) => (
                            <GlosaryItem
                                key={`word-${key}`}
                                title={item.title}
                                description={item.description}
                            />
                        ))
                    }
                </SideBlock>
            </Box>
        </>
    );
};

export default LecturePage;