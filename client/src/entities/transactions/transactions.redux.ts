import { AnyAction, Dispatch } from "redux";
import { useSelector } from "react-redux";

import { RootState } from "store";
import { ITransaction } from "./transactions.type";
import * as API from "./transactions.api";

/**
 *
 *
 * Actions
 *
 *
 */
export const FETCH_ALL_TRANSACTION = "FETCH_ALL_TRANSACTION";
export interface IFetchAllTransactions {
  type: typeof FETCH_ALL_TRANSACTION;
}
export function fetchAllTransactionsAction() {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch({ type: FETCH_ALL_TRANSACTION });
  };
}

export const FETCH_ALL_TRANSACTION_SUCCESS = "FETCH_ALL_TRANSACTION_SUCCESS";
export interface IFetchAllTransactionsSuccess {
  type: typeof FETCH_ALL_TRANSACTION_SUCCESS;
}
export function fetchAllTransactionsSuccessAction(entities: ITransaction[]) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch({
        type: FETCH_ALL_TRANSACTION_SUCCESS,
        payload: { data: entities }
    });
  };
}

export const COMMIT_TRANSACTION = "COMMIT_TRANSACTION";
export interface ICommitTransactions {
  type: typeof COMMIT_TRANSACTION;
}
export function commitTransactionsAction() {
  return async (dispatch: Dispatch<AnyAction>, state: RootState) => {
    try {
      dispatch({ type: COMMIT_TRANSACTION });
    } catch (error) {
      console.log(error);
    }
  };
}


/**
 *
 *
 * Reducer
 *
 *
 */

interface ITransactionState {
  transactions: ITransaction[] | null,
  isPending: boolean;

}
const initialState: Readonly<ITransactionState> = {
  transactions: null,
  isPending: false,
};

export const transactionsReducer = (
  state = initialState,
  { type, payload }: AnyAction
): ITransactionState => {
  switch (type) {
    case FETCH_ALL_TRANSACTION:
      return { ...state, isPending: true };
    case FETCH_ALL_TRANSACTION_SUCCESS:
      return {
          ...state,
          transactions: [...(state.transactions || []), ...payload.entities],
          isPending: false,
        };

    case COMMIT_TRANSACTION:
      return {
        ...state,
        transactions: { ...payload.organization },
        isPending: false,
      };

    default:
      return state;
  }
};

export default transactionsReducer;

/**
 *
 * Selectors
 *
 */
export const useTransactions = () => {
  const common = useSelector<RootState, ITransactionState>(
    (state) => state.transactions
  );
  return common;
};