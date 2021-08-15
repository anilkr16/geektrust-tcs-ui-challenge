import React, {useState, useEffect} from "react";
import DataTable from '../../ui-library/datatable/index'
const Index = () => {
   const [data, setData] = useState([]);
   const API_HOST = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem';
   const INVENTORY_API_URL = `${API_HOST}/members.json`;

   const fetchInventory = () => {
       fetch(`${INVENTORY_API_URL}`)
           .then(res => res.json())
           .then(json => setData(json));
   }
   useEffect(() => {
       fetchInventory();
   }, []);
   return (
      <div>
         <h1 id='title'>Admin Dashboard</h1>
         {data && Array.isArray(data) && data.length ?
            <DataTable data={data} emptyMessage={'No Records Found.'}/> : ''
         }
      </div>
   )
};

export default Index;