import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import TagAtom from "../atoms/tag";
import { type ColumnsType } from "antd/es/table";
import FlexAtom from "../atoms/flex";
import TableAtom from "../atoms/table";
import PageSectionHeader from "../molecules/pageSectionHeader";
import ItemFormModal from "../molecules/itemFormModal";
import ConfirmDeleteModal from "../molecules/itemDeleteModal";
import { Category, Ingredient, ItemFormValues } from "../../interface/types";
import ButtonAtom from "../atoms/button";
import SearchToggleInput, { SearchToggleInputRef } from "../molecules/searchToggleInput";
import ImageAtom from "../atoms/image";
import { useNotification } from "../../context/notificationContext";

type MenuItemContainerPropType = {
  data: ItemFormValues[];
  onItemEdit: (item: ItemFormValues & { id: string }) => void;
  onItemAdd: (item: ItemFormValues) => void;
  onItemDelete: (id: string) => void;
  onCategoryAdd: (category: Category) => void;
  onIngredientAdd: (ingredient: Ingredient) => void;
  categories: string[];
  ingredients: string[];
};

type ModalType = {
  isOpen: boolean;
};

type ItemToEdit = ItemFormValues & { id: string };

type FormModalType = ModalType & {
  item?: ItemToEdit;
};

const MenuItemContainer: React.FC<MenuItemContainerPropType> = ({
  data,
  categories,
  ingredients,
  onItemEdit,
  onItemAdd,
  onItemDelete,
  onCategoryAdd,
  onIngredientAdd,
}) => {
  const [formModalConfig, setFormModalConfig] = useState<FormModalType>({
    isOpen: false,
  });
  const [deleteModalConfig, setDeleteModalConfig] = useState<FormModalType>({
    isOpen: false,
  });
  const { openNotification } = useNotification()
  const [filteredData, setFilteredData] = useState<ItemFormValues[]>(data);
  const searchRef = useRef<SearchToggleInputRef>(null);

  const handleFormSubmit = useCallback(
    (data: ItemFormValues, id?: string | undefined) => {
      if (formModalConfig.item && id) {
        onItemEdit({ ...data, id });
        openNotification({
          message: "Item updated successfully",
          placement: "top",
          theme: "success",
        });
      } else {
        onItemAdd(data);
        openNotification({
          message: "Item added successfully",
          placement: "top",
          theme: "success",
        });
      }
      setFormModalConfig({ isOpen: false });
    },
    [formModalConfig, onItemAdd, onItemEdit]
  );

  const handleItemDelete = useCallback(
    (item: ItemToEdit) => {
      setDeleteModalConfig({ isOpen: true, item });
    },
    [setDeleteModalConfig]
  );

  const columns: ColumnsType<ItemFormValues> = useMemo(
    () => [
      {
        title: "#",
        key: "index",
        render: (_value, _record, index) => <strong>{index + 1}</strong>,
        width: 80,
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        filters: categories.map((cat) => ({ text: cat, value: cat })),
        onFilter: (value, record) => record.category === value,
        render: (label: Category) => (
          <TagAtom
            color="purple"
            style={{ fontWeight: 500, maxWidth: "max-content" }}
          >
            {label}
          </TagAtom>
        ),
        width: 120,
      },
      {
        title: "Title",
        dataIndex: "itemName",
        key: "itemName",
        sorter: (a, b) => a.itemName.localeCompare(b.itemName),
        render: (text: string) => (
          <span style={{ fontWeight: 600, fontSize: "16px" }}>{text}</span>
        ),
        width: 250,
      },
      {
        title: "Images",
        dataIndex: "images",
        key: "images",
        render: (images: string[]) =>
          images.length ? (
            <FlexAtom wrap="wrap" gap="8px">
              {images.map((src, idx) => (
                <ImageAtom
                  key={idx}
                  width={50}
                  height={50}
                  src={src}
                  alt={`menu-img-${idx}`}
                  style={{ objectFit: "cover", borderRadius: "6px" }}
                />
              ))}
            </FlexAtom>
          ) : (
            "-"
          ),
        width: 250,
      },
      {
        title: "Ingredients",
        dataIndex: "ingredients",
        key: "ingredients",
        filters: ingredients.map((ing) => ({ text: ing, value: ing })),
        onFilter: (value, record) =>
          record.ingredients.includes(value as string),
        render: (ingredients: Ingredient[]) =>
          ingredients.length ? (
            <FlexAtom wrap="wrap" gap="8px">
              {ingredients.map((ingredient) => (
                <TagAtom
                  key={ingredient}
                  style={{
                    borderRadius: "20px",
                    fontSize: "12px",
                    backgroundColor: "#f0f0f0",
                    color: "#333",
                    border: "1px solid #ccc",
                  }}
                >
                  {ingredient}
                </TagAtom>
              ))}
            </FlexAtom>
          ) : (
            "-"
          ),
        width: 250,
      },
      {
        title: "Pricing",
        dataIndex: "pricing",
        key: "pricing",
        sorter: (a, b) => a.pricing - b.pricing,
        render: (price: number) => `₹${price}`,
        width: 100,
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: (desc?: string) => (
          <span style={{ fontSize: "14px", color: "#555" }}>{desc}</span>
        ),
      },
      {
        title: "Actions",
        key: "action",
        render: (item) => (
          <FlexAtom gap="12px">
            <a title="Edit">
              <EditOutlined
                style={{ fontSize: "20px" }}
                onClick={() => setFormModalConfig({ isOpen: true, item })}
              />
            </a>
            <a title="Delete">
              <DeleteOutlined
                style={{ fontSize: "20px" }}
                onClick={() => handleItemDelete(item)}
              />
            </a>
          </FlexAtom>
        ),
        width: 100,
      },
    ],
    [categories, ingredients, data, handleItemDelete]
  );

  useEffect(()=>{
    if(searchRef.current){
      setFilteredData(data);
      searchRef.current.reset();
    }
  }, [data])

  return (
    <FlexAtom vertical>
      <PageSectionHeader
        title="Items"
        actions={[
          <SearchToggleInput
            ref={searchRef}
            key="search"
            onSearchChange={(query) => {
              const filtered = data.filter(
                (item) =>
                  item.itemName.toLowerCase().includes(query) ||
                  item.description?.toLowerCase().includes(query) ||
                  item.pricing.toString().includes(query) ||
                  item.category.toLowerCase().includes(query) ||
                  item.ingredients.some((ing) =>
                    ing.toLowerCase().includes(query)
                  )
              );
              setFilteredData(filtered);
            }}
          />,
          <ButtonAtom
            icon={<PlusOutlined />}
            iconPosition="end"
            key="addItemAction"
            size="large"
            onClick={() => setFormModalConfig({ isOpen: true })}
          >
            Add Item
          </ButtonAtom>,
        ]}
      />
      <TableAtom
        dataSource={filteredData}
        columns={columns}
        pagination={{
          total: filteredData.length,
          defaultPageSize: 10,
          showSizeChanger: true,
          defaultCurrent: 1,
          pageSizeOptions: [5, 10, 20, 50],
          showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`
        }}
        scroll={{ x: 1200 }}
      />
      <ItemFormModal
        visible={formModalConfig.isOpen}
        categories={categories}
        ingredients={ingredients}
        onCategoryAdd={onCategoryAdd}
        onIngredientAdd={onIngredientAdd}
        onCancel={() => setFormModalConfig({ isOpen: false })}
        onSubmit={handleFormSubmit}
        itemToEdit={formModalConfig?.item}
      />
      <ConfirmDeleteModal
        visible={deleteModalConfig.isOpen}
        itemName={deleteModalConfig.item?.itemName}
        onCancel={() =>
          setDeleteModalConfig({ isOpen: false, item: undefined })
        }
        onConfirm={() => {
          if (deleteModalConfig.item) {
            onItemDelete(deleteModalConfig.item.id);
            openNotification({
              message: "Item deleted successfully",
              placement: "top",
              theme: "success",
            });
          }
          setDeleteModalConfig({ isOpen: false, item: undefined });
        }}
      />
    </FlexAtom>
  );
};

MenuItemContainer.displayName = "MenuItemContainer";

export default MenuItemContainer;
