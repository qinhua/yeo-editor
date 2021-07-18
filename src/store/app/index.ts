/*
 * @Author: BabyChin
 * @Date: 2021-06-12 23:58:20
 * @LastEditTime: 2021-07-18 15:56:25
 * @Description:
 */
import { createStore, combineReducers } from "redux";

interface StateType {
  userInfo: {
    userName: string;
    userId: string;
    avatar?: string;
  };
  editorType: string;
  editorData: {
    type: string;
    value: string;
    line: number;
    words: number;
    [key: string]: any;
  };
  curPassage: any;
  theme: number;
  showPassage: boolean;
  showPreview: boolean;
  lastSave: null | {
    success: boolean;
    time: Date;
  };
}
interface ActionType {
  type: string;
  payload: any;
}
const initState: StateType = {
  userInfo: {
    userName: "BabyChin",
    userId: "2232442",
    avatar:
      "https://bbchin.com/upload/2021/01/avatar-2c517eceb544404eb0ee6367bc3207d6.png",
  },
  editorType: "markdown",
  editorData: {
    type: "markdown",
    value: "",
    line: 0,
    words: 0,
  },
  curPassage: null,
  theme: 1, // 1-浅色，2-暗黑，3-自动
  showPassage: true,
  showPreview: true,
  lastSave: null,
};
const actions: { [key: string]: any } = {
  togglePassage: {
    type: "togglePassage",
  },
  togglePreview: {
    type: "togglePreview",
  },
  toggleEditorType: {
    type: "toggleEditorType",
  },
  changeEditor: {
    type: "changeEditor",
  },
  updateSaving: {
    type: "updateSaving",
  },
  changeTheme: {
    type: "changeTheme",
  },
  pickPassage: {
    type: "pickPassage",
  },
  updateEditorData: {
    type: "updateEditorData",
  },
};

const appReducer = (state: StateType = initState, action: ActionType) => {
  switch (action.type) {
    case "togglePassage":
      return { ...state, showPassage: action.payload ?? !state.showPassage };
    case "togglePreview":
      return { ...state, showPreview: !state.showPreview };
    case "toggleEditorType":
      return {
        ...state,
        editorType: action.payload,
      };
    case "changeEditor":
      return { ...state, editorData: action.payload };
    case "updateSaving":
      return {
        ...state,
        lastSave: action.payload
          ? {
              success: action.payload.status,
              time: new Date().toLocaleString(),
            }
          : null,
      };
    case "changeTheme":
      let theme: number;
      if (action.payload === "theme-auto") {
        const now = new Date().getHours();
        theme = now > 6 && now < 18 ? 1 : 2;
      } else {
        theme = action.payload === "theme-light" ? 1 : 2;
      }
      return { ...state, theme };
    case "pickPassage":
      return {
        ...state,
        curPassage: action.payload,
      };
    case "updateEditorData":
      return {
        ...state,
        editorData: { ...state.editorData, ...action.payload },
      };
    default:
      return state;
  }
};

// 全局你可以创建多个reducer 在这里统一在一起
const rootReducers = combineReducers({ appReducer });

export const {
  togglePassage,
  togglePreview,
  toggleEditorType,
  changeEditor,
  updateSaving,
  changeTheme,
  pickPassage,
  updateEditorData,
} = actions;

export default createStore(rootReducers);
