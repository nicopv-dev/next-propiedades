import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface IFilterState {
  isActive: boolean;
  price: [number];
  guests: number;
}

const initialState: IFilterState = {
  isActive: false,
  price: [0, 100],
  guests: 0,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveFilter: (
      state: IFilterState,
      { payload }: PayloadAction<IFilterState>
    ) => {
      state.isActive = payload.isActive;
    },
    setPrice: (
      state: IFilterState,
      { payload }: PayloadAction<IFilterState>
    ) => {
      state.price = payload.price;
    },
    setGuests: (
      state: IFilterState,
      { payload }: PayloadAction<{ guests: number }>
    ) => {
      state.guests = payload.guests;
    },
  },
});

export const { setActiveFilter, setPrice, setGuests } = filterSlice.actions;

export default filterSlice.reducer;

export const selectPrice = (state: RootState) => state.filter.price;
export const selectGuests = (state: RootState) => state.filter.guests;
