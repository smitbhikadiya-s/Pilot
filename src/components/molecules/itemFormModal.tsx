import React, { useState, useEffect, useCallback } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Category, Ingredient, ItemFormValues } from '../../interface/types';
import { convertBase64ToFileList, getBase64 } from '../../utils/getBase64';
import ModalAtom from '../atoms/modal';
import FormAtom from '../atoms/form';
import { message, type UploadFile } from 'antd';
import InputAtom from '../atoms/input';
import InputNumberAtom from '../atoms/inputnumber';
import SelectAtom from '../atoms/select';
import UploadAtom from '../atoms/upload';
import ImageAtom from '../atoms/image';

import '../../styles/inputform.css';

const { Option } = SelectAtom;
const { TextArea } = InputAtom;

type ItemFormModalProps<T extends ItemFormValues = ItemFormValues> = {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (data: ItemFormValues, id?: string) => void;
  itemToEdit?: T & { id?: string };
  categories: string[];
  ingredients: string[];
  onCategoryAdd: (category: Category) => void;
  onIngredientAdd: (ingredient: Ingredient) => void;
};

const ItemFormModal = <T extends ItemFormValues = ItemFormValues>({
  visible,
  onCancel,
  onSubmit,
  itemToEdit,
  categories,
  ingredients,
  onCategoryAdd,
  onIngredientAdd,
}: ItemFormModalProps<T>): React.ReactElement => {
  const [form] = FormAtom.useForm<ItemFormValues>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [searchText, setSearchText] = useState('');
  const [ingredientSearchText, setIngredientSearchText] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleIngredientChange = useCallback(
    (values: string[]) => {
      values.forEach(val => {
        if (!ingredients.includes(val)) {
          onIngredientAdd(val);
        }
      });
    },
    [ingredients, onIngredientAdd],
  );

  const handleUploadChange = useCallback(
    ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
      setFileList(newFileList);
    },
    [],
  );

  const beforeUpload = useCallback((file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage || UploadAtom.LIST_IGNORE;
  }, []);

  const handleFileChange = useCallback(
    async (files: UploadFile<File>[] | undefined) => {
      const base64Images: string[] = [];

      if (!files) return base64Images;

      for (const file of files) {
        if (file.originFileObj) {
          const base64 = await getBase64(file.originFileObj);
          base64Images.push(base64);
        } else if (file.url) {
          base64Images.push(file.url);
        }
      }

      return base64Images;
    },
    [],
  );

  const resetModal = useCallback(() => {
    form.resetFields();
    setFileList([]);
    setSearchText('');
    setIngredientSearchText('');
  }, [form]);

  const handleFinish = useCallback(
    async (values: ItemFormValues) => {
      const images = await handleFileChange(fileList);

      onSubmit(
        {
          ...values,
          images,
        },
        itemToEdit?.id,
      );

      resetModal();
    },
    [itemToEdit, fileList, handleFileChange, onSubmit, resetModal],
  );

  const handleCancel = useCallback(() => {
    resetModal();
    onCancel();
  }, [onCancel, resetModal]);

  const handlePreview = useCallback(async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
  }, []);

  const handleCategoryKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && searchText && !categories.includes(searchText)) {
        e.preventDefault();
        onCategoryAdd(searchText);
        form.setFieldsValue({ category: searchText });
        setSearchText('');
      }
    },
    [categories, onCategoryAdd, searchText, form],
  );

  const handleTagKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (
        e.key === 'Enter' &&
        ingredientSearchText.trim() !== '' &&
        !ingredients.includes(ingredientSearchText.trim())
      ) {
        e.preventDefault();

        const newIngredient = ingredientSearchText.trim();
        const currentSelected = form.getFieldValue('ingredients') || [];

        form.setFieldsValue({
          ingredients: [...new Set([...currentSelected, newIngredient])],
        });

        setIngredientSearchText('');
      }
    },
    [ingredients, form, ingredientSearchText],
  );

  useEffect(() => {
    if (itemToEdit) {
      form.setFieldsValue({
        itemName: itemToEdit.itemName,
        category: itemToEdit.category,
        description: itemToEdit.description,
        ingredients: itemToEdit.ingredients,
        images: itemToEdit.images,
        pricing: itemToEdit.pricing,
      });

      const convertedFileList = convertBase64ToFileList(
        itemToEdit.images || [],
      );
      setFileList(convertedFileList);

      if (itemToEdit.category && !categories.includes(itemToEdit.category)) {
        onCategoryAdd(itemToEdit.category);
      }

      itemToEdit.ingredients?.forEach((ing: string) => {
        if (!ingredients.includes(ing)) {
          onIngredientAdd(ing);
        }
      });
    }

    // Intentionally want this effect to run only when the itemToEdit changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemToEdit]);

  return (
    <ModalAtom
      title={itemToEdit ? 'Edit Menu Item' : 'Add Menu Item'}
      open={visible}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      okText={itemToEdit ? 'Update' : 'Submit'}
      destroyOnClose
    >
      <FormAtom form={form} layout="vertical" onFinish={handleFinish}>
        <FormAtom.Item
          name="itemName"
          label="Item Name"
          rules={[
            { required: true, message: 'Item name is required' },
            { max: 255, message: 'Max length is 255 characters' },
          ]}
        >
          <InputAtom placeholder="Enter item name" maxLength={255} />
        </FormAtom.Item>

        <FormAtom.Item
          name="pricing"
          label="Price (in INR)"
          rules={[
            { required: true, message: 'Price is required' },
            {
              type: 'number',
              min: 1,
              message: 'Price must be at least 1',
            },
          ]}
        >
          <InputNumberAtom
            suffix="INR"
            className="full-width"
            type="number"
            min={1}
            step="1"
            placeholder="Enter price"
            onWheel={e => e?.currentTarget?.blur()}
          />
        </FormAtom.Item>

        <FormAtom.Item
          name="category"
          label="Category"
          rules={[
            { required: true, message: 'Category is required' },
            { max: 100, message: 'Max length is 100 characters' },
          ]}
        >
          <SelectAtom
            showSearch
            placeholder="Select or type to add"
            onSearch={val => setSearchText(val)}
            onInputKeyDown={handleCategoryKeyDown}
            notFoundContent={
              <div className="no-found-wrapper">
                <div className="no-found-text">No category found</div>
                <div className="no-found-add-text">
                  Press <strong>Enter</strong> to add{' '}
                  <strong>{searchText}</strong>
                </div>
              </div>
            }
            value={form.getFieldValue('category')}
            onChange={value => {
              if (!categories.includes(value)) {
                onCategoryAdd(value);
              }
              form.setFieldsValue({ category: value });
            }}
            filterOption={(input, option) =>
              (option?.value as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {categories.map(cat => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </SelectAtom>
        </FormAtom.Item>

        <FormAtom.Item
          name="description"
          label="Description"
          rules={[{ max: 500, message: 'Max 500 characters (~5 lines)' }]}
        >
          <TextArea rows={4} placeholder="Optional" maxLength={500} showCount />
        </FormAtom.Item>

        <FormAtom.Item
          name="ingredients"
          label="Ingredients"
          rules={[
            {
              validator: (_, value: string[]) => {
                if (value && value.length > 100) {
                  return Promise.reject(
                    new Error('Max 100 ingredients allowed'),
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <SelectAtom
            mode="tags"
            placeholder="Select or add ingredients"
            onSearch={val => setIngredientSearchText(val)}
            onInputKeyDown={handleTagKeyDown}
            onChange={(values: string[]) => {
              handleIngredientChange(values);
              form.setFieldsValue({ ingredients: values });
            }}
            value={form.getFieldValue('ingredients')}
            dropdownRender={menu => (
              <>
                {menu}
                {ingredientSearchText &&
                  !ingredients
                    .map(i => i.toLowerCase())
                    .includes(ingredientSearchText.toLowerCase()) && (
                    <div className="no-found-wrapper">
                      <div className="no-found-text">No ingredient found</div>
                      <div className="no-found-add-text">
                        Press <strong>Enter</strong> to add{' '}
                        <strong>{ingredientSearchText}</strong>
                      </div>
                    </div>
                  )}
              </>
            )}
            filterOption={(input, option) =>
              (option?.value as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {ingredients.map(ing => (
              <Option key={ing} value={ing}>
                {ing}
              </Option>
            ))}
          </SelectAtom>
        </FormAtom.Item>

        <FormAtom.Item
          name="images"
          label="Upload Images"
          rules={[
            {
              validator: () =>
                fileList.length > 0
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error('Please upload at least one image'),
                    ),
            },
          ]}
        >
          <UploadAtom
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
            accept="image/*"
            onPreview={handlePreview}
            multiple
            customRequest={({ onSuccess }) =>
              setTimeout(() => onSuccess && onSuccess('ok'), 0)
            }
          >
            {fileList.length >= 5 ? null : (
              <div>
                <PlusOutlined />
                <div className="upload-btn-text">Upload</div>
              </div>
            )}
          </UploadAtom>
          <ModalAtom
            visible={previewVisible}
            title="Image Preview"
            footer={null}
            onCancel={() => setPreviewVisible(false)}
          >
            <ImageAtom
              alt="Preview"
              className="full-width"
              src={previewImage}
            />
          </ModalAtom>
        </FormAtom.Item>
      </FormAtom>
    </ModalAtom>
  );
};

ItemFormModal.displayName = 'ItemFormModal';

export default ItemFormModal;
