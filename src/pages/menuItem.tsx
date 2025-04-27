import React from 'react';
import MenuItemContainer from '../components/organism/menuItemsContainer';
import { useAppDispatch, useAppSelector } from '../store';
import {
  addCategory,
  addIngredient,
  addItemToMenu,
  deleteItemFromMenu,
  updateItem,
} from '../store/features/menuSlice';

const MenuItem: React.FC = () => {
  const { categories, ingredients, items } = useAppSelector(
    state => state.menu,
  );

  const dispatch = useAppDispatch();

  return (
    <MenuItemContainer
      data={items}
      categories={categories}
      ingredients={ingredients}
      onItemAdd={item => {
        dispatch(addItemToMenu(item));
      }}
      onItemEdit={item => {
        dispatch(updateItem(item));
      }}
      onItemDelete={id => {
        dispatch(deleteItemFromMenu({ id }));
      }}
      onCategoryAdd={name => {
        dispatch(addCategory({ name }));
      }}
      onIngredientAdd={name => {
        dispatch(addIngredient({ name }));
      }}
    />
  );
};

export default MenuItem;
