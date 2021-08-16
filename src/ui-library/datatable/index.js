import React, {useState, useEffect} from 'react';
import {TableHeader, RenderRow, Pagination} from '../components/DataTable';
const ROWS_PER_PAGE = 10;
const DataTable = props => {
    const [data, setData] = useState(props.data);
    const [selectPageData, setSelectPageData] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [emptyMessage, setEmptyMessage] = useState('');
    const [selectAll, setSelectAll] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        udpateTotalpagination(props.data)
        onPageclick(1)
    }, [])
    const getKeys = () => {
        const keys = Object.keys(props.data[0]);
        keys.unshift('selectall')
        keys.push('action');
        return keys;
    }
    const deleteRow = idToRemove => {
        let updateData = data.filter(elem => elem.id !== idToRemove);
        let updatedSelectedPageData = selectPageData.filter(elem => elem.id !== idToRemove);
        setData(updateData);
        setSelectPageData(updatedSelectedPageData);
        if (updatedSelectedPageData && Array.isArray(updatedSelectedPageData) && !updatedSelectedPageData.length) {
            if (page > 0) {
                setPage(page - 1);
                onPageclick(page - 1);
                udpateTotalpagination(updateData);
            }
        }
        if(!updateData.length) {
            if (page > 0) {
                setPage(page - 1);
                onPageclick(page - 1);
            }
            setEmptyMessage(props.emptyMessage);
        }
    }
    const onSelectAll = flag => {
        if (flag === true) {
            const ids = data.map(elem => elem.id);
            setSelectedKeys([...ids]);
            setSelectAll(flag);
        } else {
            setSelectedKeys([]);
            setSelectAll(flag);
        }
    }
    const onSelect = id => {
        const updatedSelectedRows = selectedKeys;
        if (id && updatedSelectedRows && Array.isArray(updatedSelectedRows) &&
            updatedSelectedRows.length && updatedSelectedRows.includes(id)) {
            const index = updatedSelectedRows.findIndex(elem => elem === id);
            updatedSelectedRows.splice(index, 1);
            setSelectedKeys([...updatedSelectedRows]);
        } else {
            updatedSelectedRows.push(id);
            setSelectedKeys([...updatedSelectedRows])
        }
    }
    const udpateTotalpagination = values => {
        if (values && Array.isArray(values) && values.length) {
            setTotalPages(Math.ceil(values.length / ROWS_PER_PAGE));
        }
    }
    const onPageclick = num => {
        const value = data;
        const startIndex = (num - 1) * ROWS_PER_PAGE;
        const selectPageData = value.slice(startIndex, startIndex + ROWS_PER_PAGE);
        setSelectPageData(selectPageData);
    }
    const renderTableData = () => {
        if(selectPageData && Array.isArray(selectPageData) && selectPageData.length) {
            const keys = getKeys();
            return selectPageData.map((rowData, index) => {
                return <tr key={index}>
                    <RenderRow key={index}
                        selectPageData={selectPageData}
                        id={rowData.id}
                        rowData={rowData}
                        keys={keys}
                        setSelectPageData={setSelectPageData}
                        deleteRow={deleteRow}
                        onSelect={onSelect}
                        selectedKeys={selectedKeys}
                    />
                </tr>
             })
        } return '';
    }
    const onHandlePageClick = num => {
        setPage(num);
        onPageclick(num);
    }
    return (
        <>
            {!emptyMessage.trim().length ? 
                <table id='datatable'>
                    <TableHeader
                        columns={getKeys()}
                        selectAll={selectAll}
                        onSelectAll={onSelectAll}
                    />
                    <tbody>
                        {renderTableData()}
                    </tbody>
                </table> : <h4>{props.emptyMessage}</h4>
            }
            {props.pagination ? <Pagination totalPages={totalPages} onPageClick={onHandlePageClick}/> : ''}
        </>
    )
}
export default DataTable;