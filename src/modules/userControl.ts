import { createStore, Dispatch } from "redux";
import { db } from '../config';

const LOADNICK = "userControl/LOADNICK" as const;
//as const = const assertions 

//  ---- state 정의 ----
export type userType = {
  nickname:string
};
const initialState:userType = {nickname : ''};
//  ---- state 정의 ----

//  ---- action 정의 ----
export const loadNick = (nickname:string) => ({
  type : LOADNICK,
  payload : {
    nickname
  }
})

type userControlAction = 
| ReturnType<typeof loadNick>;
//  ---- action 정의 ----

// ---- api action ----
// ---- api action ----


// ---- reducer 정의 ---- //
export default function reducer(
  state: userType = initialState,
  action: userControlAction
) {
  switch (action.type) {
    case LOADNICK:
      return applyLoadNick(state, action);
    default:
      return state;
  }
}
// ---- reducer 정의 ---- //

// ---- reducer action ---- //
const applyLoadNick = (state:any, action:any) => {
  const { payload } = action;
  return payload;
}
// ---- reducer action ---- //