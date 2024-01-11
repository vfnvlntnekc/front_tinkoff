import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import AppLayoutDetails from './components/AppLayoutDetails';
import AppLayoutAdd from './components/AppLayoutAdd';
import AppLayoutEditForm from './components/AppLayoutEditForm';
import { Layout } from 'antd';

const { Header } = Layout;

const App = () => {
  return (
    <Router>
      <div>
      <Header style={{ background: '#fff', padding: '36px', textAlign: 'center' }}>
        <h1>Movies 6407 Быкова Дарья</h1>
      </Header>
        <Routes>
          <Route path="/" element={<AppLayout />} />
          <Route path="/movies" element={<AppLayout />} />
          <Route path="/movies/new" element={<AppLayoutAdd />} />
          <Route path="/movies/:id" element={<AppLayoutDetails />} />
          <Route path="/movies/:id/edit" element={<AppLayoutEditForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
