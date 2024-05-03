import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: 0,
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, {payload}) => {
            state.value += payload
        },
        decrement: (state, {payload}) => {
            state.value -= payload
        },
    }
})
export const {increment, decrement} = counterSlice.actions;
export const counterState = state => state.counter.value

export default counterSlice.reducer;