import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlineOutlined, AddOutlined } from "@mui/icons-material";
import {
  TextField,
  Autocomplete,
  Box,
  CardContent,
  Typography,
  useTheme,
  createFilterOptions,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import Header from "components/Header";
import { useGetBillsQuery, useGetBillsByKnessetNumQuery } from "state/api";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBills, setPaginationModel } from "state";

const Home = () => {
  const dispatch = useDispatch();
  const selectedBills = useSelector((state) => state.global.selectedBills);
  const paginationModel = useSelector((state) => state.global.paginationModel);
  const navigate = useNavigate();
  const theme = useTheme();
  const OPTIONS_LIMIT = 20;
  const defaultFilterOptions = createFilterOptions();
  const [knessetInput, setKnessetInput] = useState(0);
  const handleContinueButtonEvent = () => {
    console.log("Is navigate working?");
    navigate("/votes");
  };
  const handleBillSelect = (event, value) => {
    if (value && !selectedBills.find((bill) => bill.id === value.id)) {
      const clonedBill = { ...value };
      clonedBill.selectedOption = [];
      const updatedSelectedBills = [...selectedBills, clonedBill];

      dispatch(setSelectedBills(updatedSelectedBills));
    }
  };
  const handleBillSelectFromGrid = (value) => {
    if (value && !selectedBills.find((bill) => bill.id === value.id)) {
      const selection = {
        id: value.id,
        label: value.row.name,
        selectedOption: [],
      };
      dispatch(setSelectedBills([...selectedBills, selection]));
      console.log(selectedBills);
    }
  };
  const handleBillDeleteEvent = (index) => {
    dispatch(
      setSelectedBills(selectedBills.filter((bill) => bill.id !== index))
    );
  };
  const handleDeleteAllBillsEvents = () => {
    dispatch(setSelectedBills([]));
  };
  const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  const handlePaginationModelChange = (newPaginationModel) => {
    const mergedPaginationModel = {
      ...paginationModel,
      ...newPaginationModel,
    };
    dispatch(setPaginationModel(mergedPaginationModel));
  };
  const handleBillAcceptEvent = (billId) => {};
  const handleBillAgainstEvent = () => {};

  const columns = [
    {
      field: "id",
      headerName: "מזהה חוק",
      flex: 0.2,
    },
    {
      field: "name",
      headerName: "הצעת חוק",
      flex: 1,
    },
    {
      field: "action",
      headerName: "פעולה",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="outlined"
            sx={{
              marginLeft: "1rem",
              color: "black",
              borderRadius: "0.2rem",
              borderColor: "black",
            }}
            onClick={() => {
              console.log(cellValues);
              handleBillSelectFromGrid(cellValues);
            }}
          >
            הוספה
          </Button>
        );
      },
    },
  ];

  const { data: bills, isLoading: isBillsLoading } = useGetBillsQuery();
  const { data, isLoading } = useGetBillsByKnessetNumQuery(paginationModel);

  return (
    <Box
      p="3.5rem"
      m="1.5rem 2.5rem"
      width="1000px"
      height="100%"
      justifyContent="center"
    >
      <Header
        title="כנסת"
        subtitle="כאן תוכלו לבדוק אילו חברי כנסת הם המועדפים עליכם!!!"
      />

      <Box mt="3.5rem" height="80vh" S>
        <Autocomplete
          dir="rtl"
          loading={isBillsLoading || !bills}
          filterOptions={filterOptions}
          id="free-solo-demo"
          disablePortal
          onChange={handleBillSelect}
          options={bills || {}}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label="הצעות חוק..."
              sx={{
                "& .label": {
                  transformOrigin: "right !important",
                  left: "inherit !important",
                  right: "1.75rem !important",
                  fontSize: "small",
                  color: "#807D7B",
                  fontWeight: 400,
                  overflow: "unset",
                },
              }}
            />
          )}
        />
        <Box
          m="1.5rem 2.5rem"
          height="80vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <Box style={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={(data && data.bills) || {}}
              columns={columns}
              rowCount={(data && data.total) || 0}
              loading={isLoading && !data}
              pageSizeOptions={[5, 20, 50]}
              paginationModel={paginationModel}
              paginationMode="server"
              onPaginationModelChange={handlePaginationModelChange}
              action
              slots={{
                toolbar: () => (
                  <DataGridCustomToolbar
                    knessetInput={knessetInput}
                    setKnessetInput={setKnessetInput}
                  />
                ),
              }}
            />
          </Box>
        </Box>
        <Box mt="1.5rem" height="500px" overflow="auto">
          <Paper
            height="100%"
            maxWidth="300px"
            sx={{ backgroundColor: theme.palette.grey[100] }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                הצעות חוק נבחרות
              </Typography>
              <Divider />
              <Box display="flex" flexDirection="column">
                {selectedBills.map((bill, index) => (
                  <Box
                    key={bill.id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={2}
                    mr={3}
                  >
                    <Typography
                      variant="body5"
                      color="theme.palette.secondary[200]"
                      sx={{ flexGrow: 1 }}
                    >
                      {bill.label}
                    </Typography>
                    <Button
                      mr="1rem"
                      variant="outlined"
                      size="medium"
                      sx={{
                        marginLeft: "1rem",
                        color: "black",
                        borderRadius: "0.2rem",
                        borderColor: "black",
                      }}
                      onClick={() => handleBillAcceptEvent(bill.id)}
                    >
                      בעד
                    </Button>
                    <Button
                      mr="1rem"
                      variant="outlined"
                      size="medium"
                      sx={{
                        marginLeft: "1rem",
                        color: "black",
                        borderRadius: "0.2rem",
                        borderColor: "black",
                      }}
                      onClick={() => handleBillAgainstEvent(bill.id)}
                    >
                      נגד
                    </Button>
                    <Button
                      mr="1rem"
                      variant="outlined"
                      size="medium"
                      sx={{
                        marginLeft: "1rem",
                        color: "black",
                        borderRadius: "0.2rem",
                        borderColor: "black",
                      }}
                      onClick={() => handleBillDeleteEvent(bill.id)}
                    >
                      הסר
                    </Button>
                  </Box>
                ))}
              </Box>
              <Box
                mt="1.5rem"
                display="flex"
                textAlign="center"
                flexDirection="row"
              >
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    marginLeft: "1rem",
                    color: "black",
                    borderRadius: "0.2rem",
                    borderColor: "black",
                  }}
                  onClick={handleContinueButtonEvent}
                >
                  המשך
                </Button>

                <Button
                  endIcon={<DeleteOutlineOutlined sx={{ mr: "0.3rem" }} />}
                  color="primary"
                  variant="outlined"
                  size="large"
                  sx={{
                    marginLeft: "1rem",
                    color: "black",
                    borderRadius: "0.2rem",
                    borderColor: "black",
                  }}
                  onClick={handleDeleteAllBillsEvents}
                >
                  הסר הכל
                </Button>
              </Box>
            </CardContent>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
