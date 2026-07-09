import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShopState {
  selectedCategory: string;
  priceLimit: number;
  sortBy: string;
  currentPage: number;
  searchQuery: string;
}

const initialState: ShopState = {
  selectedCategory: 'All Products',
  priceLimit: 5000,
  sortBy: 'Featured',
  currentPage: 1,
  searchQuery: '',
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
    },
    setPriceLimit: (state, action: PayloadAction<number>) => {
      state.priceLimit = action.payload;
      state.currentPage = 1;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    resetFilters: (state, action: PayloadAction<number>) => {
      state.selectedCategory = 'All Products';
      state.priceLimit = action.payload;
      state.sortBy = 'Featured';
      state.currentPage = 1;
      state.searchQuery = '';
    }
  },
});

export const { setSelectedCategory, setPriceLimit, setSortBy, setCurrentPage, setSearchQuery, resetFilters } = shopSlice.actions;
export default shopSlice.reducer;
