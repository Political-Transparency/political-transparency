import React, { useState } from 'react';
import { Tabs, Tab, Paper } from '@material-ui/core';

const MyTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: 'Tab 1', content: 'This is the content for Tab 1' },
    { title: 'Tab 2', content: 'This is the content for Tab 2' },
    { title: 'Tab 3', content: 'This is the content for Tab 3' },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Paper>
      <Tabs value={activeTab} onChange={handleTabChange}>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.title} />
        ))}
      </Tabs>
      <div>{tabs[activeTab].content}</div>
    </Paper>
  );
};

export default MyTabs;
