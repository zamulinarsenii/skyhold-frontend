// src/store/slices/selectorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectorState {
    selector: Array<number>;
}

const initialState: SelectorState = {
    selector: [],
};

const selectorSlice = createSlice({
    name: 'selector',
    initialState,
    reducers: {
        clearSelector: (state) => {
            state.selector = []
        },
        pushId: (state, action: PayloadAction<number>) => {
            state.selector?.push(action.payload)
        },
        removeId: (state, action: PayloadAction<number>) => {
            state.selector = state.selector?.filter(s => s != action.payload)
        }
    },
});

export const { clearSelector, pushId, removeId } = selectorSlice.actions;
export default selectorSlice.reducer;