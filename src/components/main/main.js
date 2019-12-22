import React, { useState, useEffect } from 'react';
import { Container, Grid, Tabs, Tab, TabPanel, AppBar } from '@material-ui/core';
import { Air } from '../air/air';
import { Road } from '../road/road';
import { Admin } from '../admin/admin';
import './main.scss';

export const Main = () => {
  const [currentTab, setTab] = useState(0);

  const switchTab = (event, value) => {
    setTab(value);
  }

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 0:
        return <Air />;
      case 1:
        return <Road />;
      case 2:
        return <Admin />;
      default:
        return <Air />;
    }
  }

  return (
    <Container>
      <AppBar position="static">
        <Tabs
          value={currentTab}
          onChange={switchTab}
          centered={true}
          className="main-tabs"
          indicatorColor="secondary"
          TabIndicatorProps={{ className: "main-indicator" }}>
          <Tab label='Légi/belföld' />
          <Tab label='Közúti' />
          <Tab label='Bejelentkezés' />
        </Tabs>
      </AppBar>
      {renderCurrentTab()}
    </Container>
  )
}