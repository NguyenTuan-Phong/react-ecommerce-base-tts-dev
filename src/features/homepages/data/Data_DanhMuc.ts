export type Child = {
  id: number;
  name: string;
};

export type TypeItem = {
  id: number;
  name: string;
  img:string;
  children: Child[] | null;
};

export type DanhMucItem = {
  id: number;
  name:string;
  type: TypeItem[];
};

export const danhMuc:DanhMucItem[] = [
   {
        id: 1,
        name:"LÓT CHUỘT",
        type: [
        {
            id: 1,
            name: "Lót chuột cỡ 26 x 21",
            img:'',
            children: null,
        },
        {
            id: 2,
            name: "Lót chuột cỡ 35 x 30",
            img:'',
            children: [
                { id: 1, name: "Lót chuột DORAEMON" },
                { id: 2, name: "Lót chuột NOBITA" },
            ],
        },
        {
            id: 3,
            name: "Lót chuột cỡ 120 x 160",
            img:'',
            children:null,
        },
        ],
    },
    {
        id: 2,
        name:"Bàn phím",
        type: [
        {
            id: 1,
            name: "Bàn phím cơ",
            img:'',
            children: [
                { id: 1, name: "Bàn phím AKKO" },
                { id: 2, name: "Bàn phím Leopold" },
            ],
        },
        {
            id: 2,
            name: "Bàn phím giả cơ",
            img:'',
            children: null,
        },
        ],
    },
    {
        id: 3,
        name:"Tai nghe",
        type: [
        {
            id: 1,
            name: "Tai nghe gaming",
            img:'',
            children: null,
        },
        {
            id: 2,
            name: "Tai nghe bluetooth",
            img:'',
            children: [
                { id: 1, name: "Tai nghe Samsung" },
                { id: 2, name: "Tai nghe Xiaomi" },
            ],
        },
        ],
    },
    {
        id: 4,
        name:'Chuột',
        type: [
        {
            id: 1,
            name: "Chuột không dây",
            img:'',
            children: null,
        },
        {
            id: 2,
            name: "Chuột có dây",
            img:'',
            children: [
                { id: 1, name: "Chuột Logitech" },
                { id: 2, name: "Chuột Razer" },
            ],
        },
        ],
    },
    {
        id: 5,
        name:'Manf hình',
        type: [
        {
            id: 1,
            name: "Màn hình cong",
            img:'',
            children: [{ id: 1, name: "Màn hình Samsung" }],
        },
        {
            id: 2,
            name: "Màn hình phẳng",
            img:'',
            children: null,
        },
        ],
    },
    {
        id: 6,
        name: 'Ghế',
        type: [
        {
            id: 1,
            img:'',
            name: "Ghế gaming",
            children: null,
        },
        {
            id: 2,
            name: "Ghế công thái học",
            img:'',
            children: [
                { id: 1, name: "Ghế Sihoo" },
                { id: 2, name: "Ghế Herman Miller" },
            ],
        },
        ],
    },
    {
        id: 7,
        name:'Máy tính',
        type: [
        {
            id: 1,
            name: "Máy tính để bàn",
            img:'',
            children: null,
        },
        {
            id: 2,
            name: "Máy tính mini",
            img:'',
            children: [{ id: 1, name: "Mini PC Intel NUC" }],
        },
        ],
    },
    {
        id: 8,
        name:'Laptop',
        type: [
        {
            id: 1,
            name: "Laptop gaming",
            img:'',
            children: [
                { id: 1, name: "Laptop ASUS TUF" },
                { id: 2, name: "Laptop MSI" },
            ],
        },
        {
            id: 2,
            name: "Laptop văn phòng",
            img:'',
            children: null,
        },
        ],
    },
    {
        id: 9,
        name:'Ổ cứng',
        type: [
        {
            id: 1,
            name: "Ổ cứng SSD",
            img:'',
            children: null,
        },
        {
            id: 2,
            name: "Ổ cứng HDD",
            img:'',
            children: [
                { id: 1, name: "HDD Seagate" },
                { id: 2, name: "HDD Western Digital" },
            ],
        },
        ],
    },
    {
        id: 10,
        name:'USB',
        type: [
        {
            id: 1,
            name: "USB 3.0",
            img:'',
            children: null,
        },
        {
            id: 2,
            name: "USB OTG",
            img:'',
            children: [{ id: 1, name: "USB SanDisk" }],
        },
        ],
    },
    {
        id: 11,
        name:'Thiết bị mạng',
        type: [
        {
            id: 1,
            name: "Thiết bị mạng",
            img:'',
            children: [
                { id: 1, name: "Router TP-Link" },
                { id: 2, name: "Router Asus" },
            ],
        },
        {
            id: 2,
            name: "Bộ mở rộng sóng",
            img:'',
            children: null,
        },
        ],
    },
];
