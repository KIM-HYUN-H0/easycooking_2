import { createStore, Dispatch } from "redux";
import { db } from '../config';

const SETCATEGORY = "categoryControl/SETCATEGORY" as const;
//as const = const assertions 

//  ---- state 정의 ----
export type categoryType = {
  idx: number;
  name: string;
};
type categoryControlState = categoryType[];
const initialState: categoryControlState = [];
//  ---- state 정의 ----

//  ---- action 정의 ----
export const setCategory = (idx:number, name:string) => ({
  type : SETCATEGORY,
  payload : {
    idx,
    name
  }
})

type categoryControlAction = 
| ReturnType<typeof setCategory>;
//  ---- action 정의 ----

// ---- api action ----
// ---- api action ----


// ---- reducer 정의 ---- //
export default function reducer(
  state: categoryControlState = initialState,
  action: categoryControlAction
) {
  switch (action.type) {
    case SETCATEGORY:
      return applySetCategory(state, action);
    default:
      return state;
  }
}
// ---- reducer 정의 ---- //

// ---- reducer action ---- //
const applySetCategory = (state:any, action:any) => {
  const { payload } = action;
  return state.concat(payload);
}
// ---- reducer action ---- //