import { useState } from "react";
import Read from "/app/src/database/Read";

const ListOfShowingsCmp = () => {
    const [showings, setShowings] = useState(undefined);
    const [pageNumber, setPageNumber] = useState(undefined);
    const [pageLength, setPageLength] = useState(undefined);

    const { fetchAbbreviatedShowings } = Read();

    const getShowings = async (num) => {

        const lower = num * (pageNumber.current-1);
        const upper = lower + num - 1;

        console.log(lower);
        console.log(upper);

        const {abbreviatedShowings, count} = await fetchAbbreviatedShowings(lower, upper);
        setShowings(abbreviatedShowings);

    };

    const getShowingsInit = async (num) => {

        const {abbreviatedShowings, count} = await fetchAbbreviatedShowings(0, num - 1);
        setShowings(abbreviatedShowings);

        const maxPageNumber = Math.ceil(count / num);
        setPageNumber({ current: 1, max: maxPageNumber });
        setPageLength({current: num});

    };

    const handlePageChange = async (num) => {
        setPageNumber({ current: num, max: pageNumber.max });
        
        const lower = pageLength.current * (num-1);
        const upper = lower + pageLength.current - 1;

        const {abbreviatedShowings, count} = await fetchAbbreviatedShowings(lower, upper);
        setShowings(abbreviatedShowings);
    };

    return {showings, pageNumber, getShowings, getShowingsInit, handlePageChange};

}

export default ListOfShowingsCmp;