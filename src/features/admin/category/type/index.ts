export interface ExpandedDataType {
    key: React.Key;
    id: string;
    name: string;
}

export interface DataType {
    key: React.Key;
    id: string;
    name: string;
    categoryItems: ExpandedDataType[];
}

export interface SubItem {
  id: string;
  name: string;
  key: number;
  isParent: false;
  categoryId: number;
}

export interface Item {
  id: string;
  name: string;
  key: number;
  isParent: true;
  categoryItems: SubItem[];
}

export interface FormUpdateCategory {
    name: string;
}

export interface FormUpdateCategoryItems {
    name: string;
    categoryId: string;
}