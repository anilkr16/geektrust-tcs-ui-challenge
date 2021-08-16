import React, {useState, useEffect} from 'react';
import {TableHeader, RenderRow} from '../components/DataTable';

const DataTable = props => {
    const [data, setData] = useState(props.data);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [emptyMessage, setEmptyMessage] = useState('');
    const [selectAll, setSelectAll] = useState(false);
    const getKeys = () => {
        const keys = Object.keys(props.data[0]);
        keys.unshift('selectall')
        keys.push('action');
        return keys;
    }
    const deleteRow = idToRemove => {
        let updateData = data.filter(elem => elem.id !== idToRemove);
        if(updateData && Array.isArray(updateData) && updateData.length) {
            setData(updateData);
        } else {
            setEmptyMessage(props.emptyMessage)
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
    
    const renderTableData = () => {
        if(data && Array.isArray(data) && data.length) {
            const keys = getKeys();
            return data.map((rowData, index) => {
                return <tr key={index}>
                    <RenderRow key={index}
                        data={data}
                        id={rowData.id}
                        rowData={rowData}
                        keys={keys}
                        setData={setData}
                        deleteRow={deleteRow}
                        onSelect={onSelect}
                        selectedKeys={selectedKeys}
                    />
                </tr>
             })
        } return '';
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
        </>
    )
}
export default DataTable;