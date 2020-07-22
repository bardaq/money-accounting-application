import React from 'react';
import { Row, Col } from 'antd';
import TransactionsTable from 'components/TransactionsTable';
import { Provider } from 'react-redux';
import store from 'store';

function Main() {
  return (
    <Provider store={store}>
      <Row className="app-container">
        <Col span={8} offset={8}>
          <TransactionsTable />
        </Col>
      </Row>
    </Provider>
  );
}

export default Main;
