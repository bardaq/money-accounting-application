import cn from 'classnames';
import React from 'react';
import { Row, Col, Collapse, Typography } from 'antd';
import { ITransaction } from 'entities/transactions';

const { Panel } = Collapse;
const { Title } = Typography;

const data: ITransaction[] = [
  {
    id: '1fdsvafsdgnvajsfdgna',
    targetAccountID: 'John Brown',
    isWithdrawal: false,
    amount: 99999,
  },
  {
    id: '1fasdasdf23442312412341234f',
    targetAccountID: 'John Brown',
    isWithdrawal: true,
    amount: 99999,
  },
  {
    id: '1fdsafssafd123441423',
    targetAccountID: 'John Brown',
    isWithdrawal: false,
    amount: 99999,
  },
];

function Main() {
  return (
    <Row className="app-container">
      <Col span={8} offset={8}>
        <Title>Transactions</Title>
        <Collapse>
          {
            data.map((item, idx) => {
              const header = `${item.isWithdrawal ? '-' : ''}${item.amount}`;
              return (
                <Panel header={header} key={idx} className={cn({topup: !item.isWithdrawal})}>
                  <p><b>Target</b> {item.targetAccountID}</p>
                  <p><b>Type</b> {item.isWithdrawal ? 'Withdrawal' : 'Income'}</p>
                  <p><b>Amount</b> {item.amount}</p>
                  <p><b>ID</b> {item.id}</p>
                </Panel>
              );
            })
          }
        </Collapse>
      </Col>
    </Row>
  );
}

export default Main;
