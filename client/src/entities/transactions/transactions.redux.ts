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
    const transactions = await API.getAll();
    dispatch({
      type: FETCH_ALL_TRANSACTION_SUCCESS,
      payload: { entities: transactions || [] },
    });
  };
}

export const FETCH_ALL_TRANSACTION_SUCCESS = "FETCH_ALL_TRANSACTION_SUCCESS";
export interface IFetchAllTransactionsSuccess {
  type: typeof FETCH_ALL_TRANSACTION_SUCCESS;
  payload: { entities: ITransaction[] };
}
export function fetchAllTransactionsSuccessAction(entities: ITransaction[]) {
  console.log(entities);
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch({
        type: FETCH_ALL_TRANSACTION_SUCCESS,
        payload: { entities }
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
  entities: ITransaction[] | null,
  isPending: boolean;

}
const initialState: Readonly<ITransactionState> = {
  entities: null,
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
          entities: payload.entities,
          // entities: [...(state.entities || []), ...payload.entities],
          isPending: false,
        };

    case COMMIT_TRANSACTION:
      return {
        ...state,
        entities: { ...payload.organization },
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