// import React, { useState, useMemo, useCallback } from "react";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { DataGrid } from "@mui/x-data-grid";
// import {
//   TextField,
//   Autocomplete,
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   useTheme,
//   createFilterOptions,
//   Button,
//   Paper,
//   Divider,
// } from "@mui/material";
// import Header from "components/Header";
// import { useGetBillsQuery, useGetBillsByKnessetNumQuery } from "state/api";
// import { useEffect } from "react";

// const SelectedBillsList = ({ selectedBills }) => {
//   return (
//     <Card sx={{ maxWidth: 500, height: 400 }}>
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {selectedBills.map((bill) => bill.label)}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetBillsByKnessetNumQuery } from "state/api";
import { useState } from "react";
import { useEffect } from "react";
const Home = () => {
  const columns = [
    {
      field: "id",
      headerName: "מזהה חוק",
      flex: 1,
    },
    {
      field: "name",
      headerName: "הצעת חוק",
      flex: 1,
    },
  ];

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 20,
    knessetNum: 20,
  });

  const { isLoading, data } = useGetBillsByKnessetNumQuery(paginationModel);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={(data && data.bills) || {}}
        columns={columns}
        rowCount={(data && data.total) || 0}
        loading={isLoading && !data}
        pageSizeOptions={[5, 20, 50]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
};

//   const columns = [
//     {
//       field: "id",
//       headerName: "מזהה חוק",
//       flex: 1,
//     },
//     {
//       field: "name",
//       headerName: "הצעת חוק",
//       flex: 1,
//     },
//   ];

//   const OPTIONS_LIMIT = 20;
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(20);
//   const [knessetNum, setKnessetNum] = useState(20);
//   const [fromDateValue, setFromDateValue] = useState();
//   const [toDateValue, setToDateValue] = useState();
//   const defaultFilterOptions = createFilterOptions();
//   const [selectedBills, setSelectedBills] = useState([]);
//   const { data: bills, isLoading: isBillsLoading } = useGetBillsQuery();
//   const {
//     data: billsByKnessetNum,
//     isLoading: isBillsLoadingByKnessetNumLoading,
//   } = useGetBillsByKnessetNumQuery(["billsByKnessetNum"], {
//     page,
//     pageSize,
//     knessetNum,
//   });
//   const handlePageChange = (params) => {
//     setPage(params);
//   };
//   const handlePageSizeChange = (params) => {
//     setPageSize(params);
//   };
//   useEffect(() => {
//     console.log(`page: ${page}, pageSize: ${pageSize}`);
//   }, [page, pageSize]);
//   // const { data: votes } = useGetVotesQuery(selectedBill);

//   const handleBillSelect = (event, value) => {
//     if (value && !selectedBills.find((bill) => bill.id === value.id)) {
//       setSelectedBills([...selectedBills, value]);
//     }
//   };
//   const handleBillDeleteEvent = (index) => {
//     setSelectedBills(selectedBills.filter((bill) => bill.id !== index));
//   };
//   const handleDeleteAllBillsEvents = () => {
//     setSelectedBills([]);
//   };
//   const filterOptions = (options, state) => {
//     return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
//   };
//   const theme = useTheme();
//   return (
//     <Box
//       p="3.5rem"
//       m="1.5rem 2.5rem"
//       width="750px"
//       height="100%"
//       justifyContent="center"
//       sx={{ backgroundColor: theme.palette.grey[100] }}
//     >
//       <Box display="flex" justifyContent="center" alignItems="center">
//         <Header
//           title="כנסת"
//           subtitle="כאן תוכלו לבדוק אילו חברי כנסת הם המועדפים עליכם!!!"
//         />
//       </Box>
//       <Box mt="3.5rem" height="80vh" S>
//         <Autocomplete
//           dir="rtl"
//           loading={isBillsLoading || !bills}
//           filterOptions={filterOptions}
//           id="free-solo-demo"
//           disablePortal
//           onChange={handleBillSelect}
//           options={bills || {}}
//           getOptionLabel={(option) => option.label}
//           renderInput={(params) => (
//             <TextField dir="rtl" {...params} label="הצעות חוק..." />
//           )}
//         />
//         <Box display="flex" justifyContent="space-between" flexDirection="row">
//           <Box mt="3.5rem" width="7rem">
//             <Autocomplete
//               disablePortal
//               // onChange={(knessetNum) => {
//               //   setKnessetNum(knessetNum);
//               // }}
//               options={[...Array(25).keys()].map((i) => i + 1)}
//               renderInput={(params) => (
//                 <TextField dir="rtl" {...params} label="מספר כנסת..." />
//               )}
//             />
//           </Box>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Box mt="3.5rem" dir="ltr">
//               <DatePicker
//                 onChange={(value) => setFromDateValue(value)}
//                 label="From"
//                 format="DD/MM/YYYY"
//                 disableFuture
//               />
//             </Box>
//             <Box mt="3.5rem" dir="ltr">
//               <DatePicker
//                 onChange={(value) => setToDateValue(value)}
//                 label="To"
//                 format="DD/MM/YYYY"
//                 disableFuture
//               />
//             </Box>
//           </LocalizationProvider>
//         </Box>
//         <Box
//           m="1.5rem 2.5rem"
//           height="80vh"
//           sx={{
//             "& .MuiDataGrid-root": {
//               border: "none",
//             },
//             "& .MuiDataGrid-cell": {
//               borderBottom: "none",
//             },
//             "& .MuiDataGrid-columnHeaders": {
//               backgroundColor: theme.palette.background.alt,
//               color: theme.palette.secondary[100],
//               borderBottom: "none",
//             },
//             "& .MuiDataGrid-virtualScroller": {
//               backgroundColor: theme.palette.primary.light,
//             },
//             "& .MuiDataGrid-footerContainer": {
//               backgroundColor: theme.palette.background.alt,
//               color: theme.palette.secondary[100],
//               borderTop: "none",
//             },
//             "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//               color: `${theme.palette.secondary[200]} !important`,
//             },
//           }}
//         >
//           {/* <DataGrid/> */}
//           <DataGrid
//             loading={isBillsLoadingByKnessetNumLoading || !billsByKnessetNum}
//             getRowId={(row) => row.id}
//             rows={(billsByKnessetNum && billsByKnessetNum.bills) || []}
//             rowCount={(billsByKnessetNum && billsByKnessetNum.total) || 0}
//             columns={columns}
//             onPageChange={handlePageChange}
//             onPageSizeChange={handlePageSizeChange}
//           />
//         </Box>
//         <Box mt="1.5rem" height="500px" overflow="auto">
//           <Paper
//             height="100%"
//             maxWidth="300px"
//             sx={{ backgroundColor: theme.palette.grey[100] }}
//           >
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 הצעות חוק נבחרות
//               </Typography>
//               <Divider />
//               <Box display="flex" flexDirection="column">
//                 {selectedBills.map((bill, index) => (
//                   <Box
//                     key={bill.id}
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     mt={2}
//                     mr={3}
//                   >
//                     <Typography
//                       variant="body5"
//                       color="theme.palette.secondary[200]"
//                       sx={{ flexGrow: 1 }}
//                     >
//                       {bill.label}
//                     </Typography>
//                     <Button
//                       mr="1rem"
//                       variant="outlined"
//                       size="medium"
//                       sx={{
//                         marginLeft: "1rem",
//                         color: "black",
//                         borderRadius: "0.2rem",
//                         borderColor: "black",
//                       }}
//                       onClick={() => handleBillDeleteEvent(bill.id)}
//                     >
//                       הסר
//                     </Button>
//                   </Box>
//                 ))}
//               </Box>
//               <Box
//                 mt="1.5rem"
//                 display="flex"
//                 textAlign="center"
//                 flexDirection="row"
//               >
//                 <Button
//                   variant="outlined"
//                   size="large"
//                   sx={{
//                     marginLeft: "1rem",
//                     color: "black",
//                     borderRadius: "0.2rem",
//                     borderColor: "black",
//                   }}
//                 >
//                   המשך
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   size="large"
//                   sx={{
//                     marginLeft: "1rem",
//                     color: "black",
//                     borderRadius: "0.2rem",
//                     borderColor: "black",
//                   }}
//                   onClick={handleDeleteAllBillsEvents}
//                 >
//                   הסר הכל
//                 </Button>
//               </Box>
//             </CardContent>
//           </Paper>
//         </Box>
//       </Box>
//     </Box>
//   );

export default Home;
