// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import api from '../../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeJobPostings: 0,
    pendingOnboarding: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin_app/stats/');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Statistic title="Total Employees" value={stats.totalEmployees} />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic title="Active Job Postings" value={stats.activeJobPostings} />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic title="Pending Onboarding" value={stats.pendingOnboarding} />
        </Card>
      </Col>
    </Row>
  );
};

export default AdminDashboard;
