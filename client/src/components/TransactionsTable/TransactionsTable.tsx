import cn from 'classnames';
import React, { useEffect } from 'react';
import { Collapse, Typography, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchAllTransactionsAction, useTransactions } from 'entities/transactions/transactions.redux';

const { Panel } = Collapse;
const { Title } = Typography;

function TransactionsTable() {
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(fetchAllTransactionsAction());
  }, [dispatch])
  const {entities, isPending} = useTransactions();

  return (
    <div className="transactions-table">
        <Title>Transactions</Title>
        <Spin tip="Loading..." spinning={isPending}>
          <Collapse>
            {
              entities && entities.length > 0 && entities.map((item, idx) => {
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
        </Spin>
    </div>
  );
}

export default TransactionsTable;
