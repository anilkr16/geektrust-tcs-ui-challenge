import React, {useState, useEffect} from 'react';
import {TableHeader, RenderRow} from '../components/DataTable';

const DataTable = props => {
    const [data, setData] = useState(props.data);
    const [emptyMessage, setEmptyMessage] = useState('');
    const getKeys = () => {
        const keys = Object.keys(props.data[0]);
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
                    />
                </tr>
             })
        } return '';
    }  
    return (
        <>
            {!emptyMessage.trim().length ? 
                <table id='datatable'>
                    <TableHeader columns={getKeys()}/>
                    <tbody>
                        {renderTableData()}
                    </tbody>
                </table> : <h4>{props.emptyMessage}</h4>
            }
        </>
    )
}
export default DataTable;