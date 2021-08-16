import React, {useState, useEffect} from "react";
import DataTable from 'components/datatable'
const Index = () => {
   const [data, setData] = useState([]);
   const API_HOST = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem';
   const MEMBER_API_URL = `${API_HOST}/members.json`;

   const fetchMembers = () => {
       fetch(`${MEMBER_API_URL}`)
           .then(res => res.json())
           .then(json => setData(json));
   }
   useEffect(() => {
      fetchMembers();
   }, []);
   return (
      <div>
         <h1 id='title'>Admin Dashboard</h1>
         {data && Array.isArray(data) && data.length ?
            <DataTable data={data}
               emptyMessage={'No Records Found.'}
               pagination={true} multiDelete={true}
               searchbar={true}   
            /> : ''
         }
      </div>
   )
};

export default Index;