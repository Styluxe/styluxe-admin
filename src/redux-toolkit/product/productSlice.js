import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedProduct: {},
    selectedCategory: {}
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSelectedProduct: (state, {payload}) => {
            state.selectedProduct = payload
        },
        setSelectedCategory: (state, {payload}) => {
            state.selectedCategory = payload
        },
    }
})
export const {setSelectedProduct, setSelectedCategory} = productSlice.actions;
export const selectedProductState = state => state.product.selectedProduct
export const selectedCategoryState = state => state.product.selectedCategory

export default productSlice.reducer;