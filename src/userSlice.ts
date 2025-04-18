// store/userSlice.ts
export const SET_SELECTED_USER = 'SET_SELECTED_USER';

export const setSelectedUserId = (id: string) => ({
  type: SET_SELECTED_USER,
  payload: id,
});

interface UserState {
  selectedUserId: string;
}

const initialState: UserState = {
  selectedUserId: 'user1',
};

type Action = 
  | { type: typeof SET_SELECTED_USER; payload: string };

export const userReducer = (state = initialState, action: Action): UserState => {
  switch (action.type) {
    case SET_SELECTED_USER:
      return { ...state, selectedUserId: action.payload };
    default:
      return state;
  }
};
