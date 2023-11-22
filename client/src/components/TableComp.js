import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'ttype', headerName: 'Type', width: 130 },
    { field: 'texpense', headerName: 'Expense', width: 130, type: 'number' }
];


const rows = [
    
        
            {
                "id": 1,
                "ttype": "other",
                "texpense": 20,
                "tdate": "2023-11-13T15:30:07.999Z",
            },
            {
                "id": 2,
                "ttype": "other",
                "texpense": 1000,
                "tdate": "2023-11-13T15:30:07.999Z",
                "_id": "65524371197a12e39e6af80f"
            },
            {
                "id": 3,
                "ttype": "other",
                "texpense": 500,
                "tdate": "2023-11-22T06:54:41.054Z",
            },
            {
                "id": 4,
                "ttype": "other ",
                "texpense": 600,
                "tdate": "2023-11-22T06:54:41.054Z",
            },
            {
                "id": 5,
                "ttype": "other",
                "texpense": 500,
                "tdate": "2023-11-22T06:54:41.054Z",
            }
        
    
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}