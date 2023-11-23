import React from 'react';
import {
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


    // DATA NOT FROM API ! ! !
    const data = [
        {id: 1, name: "My best lecture", date: "10.11.2023"},
        {id: 3, name: "foooooo", date: "16.11.2023"},
        {id: 15, name: "like", date: "10.10.2023"},
    ];

    if (!data || !data.length) {
        return <EmptyPage text="Вы еще не загрузили ни одной лекции">
            --- BUTTON CREATE ---
        </EmptyPage>
    }

    return (
        <>
            <Head title="Главная страница"/>
            <Container maxWidth="lg" >
                <PageTitle>
                    Ваши лекции
                </PageTitle>

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
                            {data.map((row) => (
                                <TableRow
                                    hover
                                    key={row.name}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    onClick={() => onRowClick(row.id)}
                                    style={{cursor: "pointer"}}
                                >
                                    <NameTableCell component="th">
                                        {row.name}
                                    </NameTableCell>
                                    <DateTableCell align="right">{row.date}</DateTableCell>
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