import React, { useState } from "react";
import { Tabs, Tab, Paper } from "@material-ui/core";

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
      <div>{tabsHeaders[activeTab].content}</div>
    </Paper>
  );
};

export default TabsCard;
