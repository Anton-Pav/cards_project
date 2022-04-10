import React from 'react';
import {usePagination} from "../../../utils/hooks/hooks";
import s from  './Pagination.module.scss'

type PropsType = {
    onPageChange:(value: number| string)=> void,
    totalCount: number,
    currentPage: number,
    pageSize: number,
    siblingCount: number,
}

function Pagination({currentPage,pageSize,onPageChange,totalCount, siblingCount}: PropsType) {

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });
    const DOTS = '...'
    // If there are less than 2 times in pagination range we shall not render the component
    // @ts-ignore
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    console.log(currentPage)

    // @ts-ignore
    let lastPage = paginationRange[paginationRange.length - 1];
    // @ts-ignore
    return (
        <ul
            className={s.paginationContainer}
        >
            {/*<li*/}
            {/*    className={s.paginationItem}*/}
            {/*    onClick={onPrevious}*/}
            {/*>*/}
            {/*    <div className="arrow left" />*/}
            {/*</li>*/}

            {paginationRange && paginationRange.map((pageNumber, index) => {

                if (pageNumber === DOTS) {
                    return <li key={index} className={s.dots }>&#8230;</li>;
                }
                return (
                    <li key={index}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber !== currentPage? pageNumber: <b>{pageNumber}</b>}
                    </li>
                );
            })}
            <li
                onClick={onNext}
            >
                <div className={`${s.arrow} ${s.right}`} />
            </li>
        </ul>
    );
};

export default Pagination;