export type Child = {
  id: number;
  name: string;
};

export type TypeItem = {
  id: number;
  name: string;
  children: Child[] | null;
};

export type FilterItem = {
  id: number;
  name:string;
  type: TypeItem[];
};

export const filter:FilterItem[] = [
   {
        id: 1,
        name:"LÓT CHUỘT",
        type: [
        {
            id: 1,
            name: "HÃNG SẢN XUẤT",
            children: [
                { id: 1, name: "LẮC ĐẦU" },
                { id: 2, name: "EDRA" },
            ],
        },
        {
            id: 2,
            name: "KHOẢNG GIÁ",
            children: [
                { id: 1, name: "Dưới 100 ngàn" },
                { id: 2, name: "100-200 ngàn" },
            ],
        },
        {
        id: 3,
        name: "KÍCH THƯỚC",
        children: [
          { id: 1, name: "26x21CM" },
          { id: 2, name: "35x30CM" },
        ]
      },
      {
        id: 4,
        name: "ĐỘ DÀY",
        children: [
          { id: 1, name: "26x21CM" },
          { id: 2, name: "35x30CM" },
        ]
      },
      {
        id: 3,
        name: "CHỦ ĐỀ",
        children: [
          { id: 1, name: "26x21CM" },
          { id: 2, name: "35x30CM" },
        ]
      },
        ],
    },
     {
        id: 2,
        name:"GAMMING GEAR",
        type: [
        {
            id: 1,
            name: "HÃNG SẢN XUẤT",
            children: [
                { id: 1, name: "AKKO" },
                { id: 2, name: "ARION" },
            ],
        },
        {
            id: 2,
            name: "KHOẢNG GIÁ",
            children: [
                { id: 1, name: "Dưới 100 ngàn" },
                { id: 2, name: "100-200 ngàn" },
            ],
        },
       
        ],
    },
     {
        id: 3,
        name:"PHỤ KIỆN MÁY TÍNH",
        type: [
        {
            id: 1,
            name: "HÃNG SẢN XUẤT",
            children: [
                { id: 1, name: "AKKO" },
                { id: 2, name: "ARION" },
            ],
        },
        {
            id: 2,
            name: "KHOẢNG GIÁ",
            children: [
                { id: 1, name: "Dưới 100 ngàn" },
                { id: 2, name: "100-200 ngàn" },
            ],
        },
       
        ],
    },
     {
        id: 4,
        name:"MÔ HÌNH",
        type: [
        {
            id: 1,
            name: "HÃNG SẢN XUẤT",
            children: [
                { id: 1, name: "AKKO" },
                { id: 2, name: "ARION" },
            ],
        },
        {
            id: 2,
            name: "KHOẢNG GIÁ",
            children: [
                { id: 1, name: "Dưới 100 ngàn" },
                { id: 2, name: "100-200 ngàn" },
            ],
        },
       
        ],
    },
     {
        id: 5,
        name:"PHỤ KIỆN TRANG TRÍ",
        type: [
        {
            id: 1,
            name: "HÃNG SẢN XUẤT",
            children: [
                { id: 1, name: "AKKO" },
                { id: 2, name: "ARION" },
            ],
        },
        {
            id: 2,
            name: "KHOẢNG GIÁ",
            children: [
                { id: 1, name: "Dưới 100 ngàn" },
                { id: 2, name: "100-200 ngàn" },
            ],
        },
       
        ],
    },
     {
        id: 6,
        name:"LOA",
        type: [
        {
            id: 1,
            name: "HÃNG SẢN XUẤT",
            children: [
                { id: 1, name: "AKKO" },
                { id: 2, name: "ARION" },
            ],
        },
        {
            id: 2,
            name: "KHOẢNG GIÁ",
            children: [
                { id: 1, name: "Dưới 100 ngàn" },
                { id: 2, name: "100-200 ngàn" },
            ],
        },
       
        ],
    },
     {
        id: 7,
        name:"GHẾ GAMMING",
        type: [
        {
            id: 1,
            name: "HÃNG SẢN XUẤT",
            children: [
                { id: 1, name: "AKKO" },
                { id: 2, name: "ARION" },
            ],
        },
        {
            id: 2,
            name: "KHOẢNG GIÁ",
            children: [
                { id: 1, name: "Dưới 100 ngàn" },
                { id: 2, name: "100-200 ngàn" },
            ],
        },
       
        ],
    },
     {
        id: 8,
        name:"BÀN GAMMING",
        type: [
        {
            id: 1,
            name: "HÃNG SẢN XUẤT",
            children: [
                { id: 1, name: "AKKO" },
                { id: 2, name: "ARION" },
            ],
        },
        {
            id: 2,
            name: "KHOẢNG GIÁ",
            children: [
                { id: 1, name: "Dưới 100 ngàn" },
                { id: 2, name: "100-200 ngàn" },
            ],
        },
       
        ],
    },
     {
        id: 9,
        name:"PHỤ KIỆN ĐIỆN THOẠI",
        type: [
        {
            id: 1,
            name: "HÃNG SẢN XUẤT",
            children: [
                { id: 1, name: "AKKO" },
                { id: 2, name: "ARION" },
            ],
        },
        {
            id: 2,
            name: "KHOẢNG GIÁ",
            children: [
                { id: 1, name: "Dưới 100 ngàn" },
                { id: 2, name: "100-200 ngàn" },
            ],
        },
       
        ],
    },
    {
        id: 10,
        name:"LINK KIỆN MÁY TÍNH",
        type: [
        {
            id: 1,
            name: "HÃNG SẢN XUẤT",
            children: [
                { id: 1, name: "AKKO" },
                { id: 2, name: "ARION" },
            ],
        },
        {
            id: 2,
            name: "KHOẢNG GIÁ",
            children: [
                { id: 1, name: "Dưới 100 ngàn" },
                { id: 2, name: "100-200 ngàn" },
            ],
        },
       
        ],
    },
     {
        id: 11,
        name:"COMBO ƯU ĐÃI",
        type: [
        {
            id: 1,
            name: "HÃNG SẢN XUẤT",
            children: [
                { id: 1, name: "AKKO" },
                { id: 2, name: "ARION" },
            ],
        },
        {
            id: 2,
            name: "KHOẢNG GIÁ",
            children: [
                { id: 1, name: "Dưới 100 ngàn" },
                { id: 2, name: "100-200 ngàn" },
            ],
        },
       
        ],
    },
];
