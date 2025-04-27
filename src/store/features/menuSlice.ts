import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemFormValues } from '../../interface/types';
import { v4 as uuidv4 } from 'uuid';

type NewItemType = ItemFormValues & {
  id: string;
  createdAt?: string;
  updatedAt?: string;
};

export interface IntialState {
  ingredients: string[];
  categories: string[];
  items: NewItemType[];
}

const initialState: IntialState = {
  ingredients: [
    'Tomato',
    'Lettuce',
    'Cheese',
    'Onions',
    'Pickles',
    'Ketchup',
    'Mayonnaise',
    'Mushrooms',
    'Garlic',
    'Spinach',
    'Avocado',
  ],
  categories: [
    'Appetizers',
    'Main Course',
    'Beverages',
    'Desserts',
    'Combo Meals',
  ],
  items: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addItemToMenu: (state, action: PayloadAction<ItemFormValues>) => {
      const timestamp = new Date().toISOString();
      const newItem = {
        id: uuidv4(),
        ...action.payload,
        createdAt: timestamp,
        updatedAt: timestamp,
      } as NewItemType;
      state.items.push(newItem);
    },
    updateItem: (state, { payload }: PayloadAction<NewItemType>) => {
      const timestamp = new Date().toISOString();
      const index = state.items.findIndex(item => item.id == payload.id);
      if (index >= 0) {
        const updatedItem = {
          ...state.items[index],
          ...payload,
          updatedAt: timestamp,
        } as NewItemType;

        state.items[index] = updatedItem;
      }
    },
    deleteItemFromMenu: (
      state,
      { payload: { id } }: PayloadAction<{ id: string }>,
    ) => {
      const index = state.items.findIndex(item => item.id == id);
      if (index >= 0) {
        state.items.splice(index, 1);
      }
    },
    addCategory: (state, action: PayloadAction<{ name: string }>) => {
      state.categories.push(action.payload.name);
    },
    addIngredient: (state, action: PayloadAction<{ name: string }>) => {
      state.ingredients.push(action.payload.name);
    },
  },
});

export const {
  addCategory,
  addIngredient,
  addItemToMenu,
  deleteItemFromMenu,
  updateItem,
} = menuSlice.actions;
export default menuSlice.reducer;
