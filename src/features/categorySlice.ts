import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface ICategortState {
  value: number;
}

const initialState: ICategortState = {
  value: 1,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (
      state: ICategortState,
      { payload }: PayloadAction<ICategortState>
    ) => {
      state.value = payload.value;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;

export const selectCategory = (state: RootState) => state.category;
