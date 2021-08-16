import React, {useState} from 'react';

const Pagination = props => {
    const pages = [...Array(props.totalPages).keys()].map(num => num + 1);
    return (
        <div>
            {pages && pages.map((page, index) => {
                return (
                    <button key={index} onClick={() => props.onPageClick(page)}>{page}</button>
                )
            })}
        </div>
    )
}

export default Pagination;