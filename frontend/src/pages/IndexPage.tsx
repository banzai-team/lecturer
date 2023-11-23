import React from 'react';
import {Head} from "../components/Head";
import EmptyPage from "./EmptyPage";

const IndexPage: React.FC = () => {
    // DATA NOT FROM API ! ! !
    const data = [1];

    if (!data || !data.length) {
        return <EmptyPage text="Вы еще не загрузили ни одной лекции">
            --- BUTTON CREATE ---
        </EmptyPage>
    }

    return (
        <>
            <Head title="Главная страница"/>
            <div>
                THIS IS MAIN PAGE
            </div>
        </>
    );
};

export default IndexPage;