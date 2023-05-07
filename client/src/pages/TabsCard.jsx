import React, { useState } from "react";
import { Tabs, Tab, Paper } from "@material-ui/core";
import styled from "styled-components";

const TabsCard = (props) => {
  const { tabsHeaders } = props;
  const [activeTab, setActiveTab] = useState(tabsHeaders.length - 1);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Paper>
      <Tabs value={activeTab} onChange={handleTabChange}>
        {tabsHeaders.map((tab, index) => (
          <Tab key={index} label={tab.title}></Tab>
        ))}
      </Tabs>
      <TabContentWrapper>
        <div>{tabsHeaders[activeTab].description}</div>
        <div>{tabsHeaders[activeTab].content}</div>
      </TabContentWrapper>
    </Paper>
  );
};

const TabContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default TabsCard;
