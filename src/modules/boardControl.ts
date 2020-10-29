import { createStore, Dispatch } from "redux";

const LOADRECIPE = "boardControl/LOADRECIPE" as const;
const BOARDRESET = "boardControl/BOARDRESET" as const;
//as const = const assertions

//  ---- state 정의 ----
export type boardType = {
  idx: number;
  author: string;
  title: string;
  content: string;
  category: number;
  view: number;
  like: number;
  needs: any;
  sauce: any;
  source: string;
  thumbnail: string;
};
type boardControlState = boardType[];
const initialState: boardControlState = [];
//  ---- state 정의 ----

//  ---- action 정의 ----
export const loadRecipe = (list: {
  idx: number;
  author: string;
  title: string;
  content: string;
  category: number;
  view: number;
  like: number;
  needs: any;
  sauce: any;
  source: string;
  thumbnail: string;
}) => ({
  type: LOADRECIPE,
  payload: {
    list,
  },
});

export const boardReset = () => ({
  type: BOARDRESET,
});

type boardControlAction = 
ReturnType<typeof loadRecipe>
| ReturnType<typeof boardReset>;
//  ---- action 정의 ----

// ---- api action ----
// ---- api action ----

// ---- reducer 정의 ---- //
export default function reducer(
  state: boardControlState = initialState,
  action: boardControlAction
) {
  switch (action.type) {
    case LOADRECIPE:
      return applyLoadRecipe(state, action);
    case BOARDRESET:
      return state = [];
    default:
      return state;
  }
}
// ---- reducer 정의 ---- //

// ---- reducer action ---- //
const applyLoadRecipe = (state: any, action: any) => {
  const { payload } = action;
  //   console.log(payload);
  //만약 스테이트에 idx가 없으면 concat)

  //   if(state.findIndex((a:any) => a.idx === payload.idx).length === 0) {
  return state.concat(payload.list);
  //   }
  //   else {
  //       console.log('d')
  //       return state;
  //   }
};
// ---- reducer action ---- //
