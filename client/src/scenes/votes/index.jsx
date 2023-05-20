import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import { useSelector } from "react-redux";
import { useGetVotesQuery } from "state/api";

function Votes() {
  const [selectedBillsIds, setSelectedBillsIds] = useState([]);
  const selectedBills = useSelector((state) => state.global.selectedBills);
  const { data, isLoading } = useGetVotesQuery(selectedBillsIds || []);
  console.log(data);
  useEffect(() => {
    const getIds = () => {
      const billIds = selectedBills.map((bill) => bill.id);
      setSelectedBillsIds(billIds);
    };

    getIds();
  }, [selectedBills]);

  console.log(selectedBillsIds);

  return (
    <Box
      p="3.5rem"
      m="1.5rem 2.5rem"
      width="1000px"
      height="100%"
      justifyContent="center"
    >
      <Header
        title="הצבעות"
        subtitle="כאן תוכלו לראות הצבעה על פי החוקים שנבחרו"
      />
    </Box>
  );
}

export default Votes;
