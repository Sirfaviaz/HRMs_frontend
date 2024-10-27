import React from 'react';
import { Card, Typography } from 'antd';

const GenericWelcome = () => {
  return (
    <Card style={{ width: '400px', margin: '0 auto', textAlign: 'center' }}>
      <Typography.Title level={3}>Welcome!</Typography.Title>
      <Typography.Paragraph>
        It seems you don't have access to any specific admin, manager, or HR features. 
        Please contact your administrator if this is an error.
      </Typography.Paragraph>
    </Card>
  );
};

export default GenericWelcome;
