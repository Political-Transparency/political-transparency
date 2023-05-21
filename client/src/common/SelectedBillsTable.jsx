import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

const SelectedBillsTable = (props) => {
  const { data } = props;
  const [rowsData, setRowsData] = useState([]);

  const parseData = (data) => {
    const res = data.map((obj, index) => ({
      ...obj,
      id: index,
    }));
    return res;
  };

  const renderRemoveRowButton = (params, handler) => {
    const handleButtonClick = () => {
      handler(params.row.id);
    };

    return (
      <button variant="contained" color="primary" onClick={handleButtonClick}>
        הסר
      </button>
    );
  };

  const removeRow = (row_index) => {
    const res = [...data];
    res.splice(row_index, 1);
    setRowsData(res);
  };

  const columns = [
    {
      field: "id",
      headerName: "מזהה חוק",
      flex: 1,
      headerAlign: "right",
      align: "center",
    },
    {
      field: "name",
      headerName: "הצעת חוק",
      flex: 1,
      headerAlign: "right",
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "right",
      align: "right",
      width: 150,
      //renderCell: (params) => renderRemoveRowButton(params, removeRow),
    },
  ];

  useEffect(() => {
    setRowsData(parseData(data));
  }, [data]);

  return <DataGrid rows={rowsData} columns={[...columns].reverse()} />;
};

export default SelectedBillsTable;
