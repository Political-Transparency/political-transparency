import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

const BillsSuggestionsTable = (props) => {
  const { selectedData, setSelectedData, data, setData } = props;
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

  const renderCheckbox = (params, handler) => {
    return (
      <input
        type="checkbox"
        onChange={(event) => {
          handler(event, params);
        }}
      />
    );
  };

  const removeRow = (row_index) => {
    const res = [...data];
    res.splice(row_index, 1);
    setData(res);
  };

  const checkboxMarkHandler = (event, params) => {
    if (event.target.checked) {
      const res = [...selectedData, params.row];
      setSelectedData(res);
    }
    if (!event.target.checked) {
      const res = [...selectedData];
      res.splice(params.row.id, 1);
      setSelectedData(res);
    }
  };

  const columns = [
    {
      field: "select",
      headerName: "",
      headerAlign: "right",
      align: "right",
      flex: 0.1,
      renderCell: (params) => renderCheckbox(params, checkboxMarkHandler),
    },
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
      field: "remove",
      headerName: "Action",
      headerAlign: "right",
      align: "right",
      width: 150,
      renderCell: (params) => renderRemoveRowButton(params, removeRow),
    },
  ];

  useEffect(() => {
    setRowsData(parseData(data));
  }, [data]);

  return <DataGrid rows={rowsData} columns={[...columns].reverse()} />;
};

export default BillsSuggestionsTable;
