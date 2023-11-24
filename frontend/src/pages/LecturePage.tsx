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

    const data = lecture;

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

    const text = React.useMemo<string>(() => data.textChunks.reduce((acc: string, t: { content: string }) => acc + t.content , ""), data.textChunks);

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
                            {text}
                        </Typography>
                    </Paper>
                </Box>
                <SideBlock
                    anchor="right"
                >
                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                        <PageTitle>
                            Глоссарий:
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