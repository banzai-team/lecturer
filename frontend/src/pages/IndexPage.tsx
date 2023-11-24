import React from 'react';
import {
    Box,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router";

import {Head} from "../components/Head";
import EmptyPage from "./EmptyPage";
import {Routes} from "./router";
import PageTitle from "../components/PageTitle";
import AddButton from "../components/AddButton";
import {useQuery} from "react-query";
import {getLectures} from "../domain/api";
import CircularProgress from "@mui/material/CircularProgress";
import {formData} from "../utils/DateUtils";

const NameTableCell = styled(TableCell)(() => ({
    fontSize: "16px",
    fontWeight: "bold"
}));

const DateTableCell = styled(TableCell)(({theme}) => ({
    color: theme.palette.primary.main,
}));

const IndexPage: React.FC = () => {
    const navigate = useNavigate();
    const onRowClick = (id: string | number) => navigate(`${Routes.LECTURE}/${id}`);

    const {data: lectures, isLoading} = useQuery(["getLectures"], () => getLectures());

    if (isLoading) {
        return (
            <EmptyPage>
                <CircularProgress color="primary"/>
            </EmptyPage>
        )
    }

    const data = lectures?.data.content;

    if (!data || !data.length) {
        return <EmptyPage text="Вы еще не загрузили ни одной лекции">
            <AddButton />
        </EmptyPage>
    }

    return (
        <>
            <Head title="Главная страница"/>
            <Container maxWidth="lg" >
                <Box display="flex" justifyContent="space-between" pb={2}>
                    <PageTitle>
                        Ваши лекции
                    </PageTitle>
                    <AddButton />
                </Box>


                <TableContainer component={Paper}>
                    <Table
                        sx={{minWidth: 650}}
                        aria-label="lectures table"
                        stickyHeader size="medium"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Название</TableCell>
                                <TableCell align="right">Дата загрузки</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row: {lectureName: string, id: string, createdAt: string}) => (
                                <TableRow
                                    hover
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    onClick={() => onRowClick(row.id)}
                                    style={{cursor: "pointer"}}
                                >
                                    <NameTableCell component="th">
                                        {row.lectureName}
                                    </NameTableCell>
                                    <DateTableCell align="right">
                                        {formData(row.createdAt)}
                                    </DateTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
};

export default IndexPage;