export interface District {
  id: string;
  name: string;
}

export interface Province {
  id: string;
  name: string;
  districts?: District[];
}
export const cities : Province[] = [
    // {
    //     id: "00",
    //     name: "Tỉnh/TP",
    // },
    {
        id: "01",
        name: "Thành phố Hà Nội",
        districts: [
            { id: "001", name: "Quận Ba Đình" },
            { id: "002", name: "Quận Hoàn Kiếm" },
            { id: "003", name: "Quận Tây Hồ" },
            { id: "004", name: "Quận Long Biên" },
            { id: "005", name: "Quận Cầu Giấy" },
            { id: "006", name: "Quận Đống Đa" },
            { id: "007", name: "Quận Hai Bà Trưng" },
            { id: "008", name: "Quận Hoàng Mai" },
            { id: "009", name: "Quận Thanh Xuân" },
            { id: "010", name: "Huyện Sóc Sơn" }
        ]
    },
    {
        id: "79",
        name: "Thành phố Hồ Chí Minh",
        districts: [
            { id: "760", name: "Quận 1" },
            { id: "761", name: "Quận 2" },
            { id: "762", name: "Quận 3" },
            { id: "763", name: "Quận 4" },
            { id: "764", name: "Quận 5" },
            { id: "765", name: "Quận 6" },
            { id: "766", name: "Quận 7" },
            { id: "767", name: "Quận 8" },
            { id: "768", name: "Quận 9" },
            { id: "769", name: "Quận 10" }
        ]
    },
    {
        id: "48",
        name: "Thành phố Đà Nẵng",
        districts: [
            { id: "480", name: "Quận Hải Châu" },
            { id: "481", name: "Quận Thanh Khê" },
            { id: "482", name: "Quận Sơn Trà" },
            { id: "483", name: "Quận Ngũ Hành Sơn" },
            { id: "484", name: "Quận Liên Chiểu" },
            { id: "485", name: "Huyện Hòa Vang" },
            { id: "486", name: "Quận Cẩm Lệ" }
        ]
    },
    {
        id: "02",
        name: "Tỉnh Hà Giang",
        districts: [
            { id: "201", name: "Thành phố Hà Giang" },
            { id: "202", name: "Huyện Đồng Văn" },
            { id: "203", name: "Huyện Mèo Vạc" },
            { id: "204", name: "Huyện Yên Minh" },
            { id: "205", name: "Huyện Quản Bạ" },
            { id: "206", name: "Huyện Vị Xuyên" },
            { id: "207", name: "Huyện Bắc Mê" },
            { id: "208", name: "Huyện Hoàng Su Phì" },
            { id: "209", name: "Huyện Xín Mần" },
            { id: "210", name: "Huyện Bắc Quang" }
        ]
    },
    {
        id: "04",
        name: "Tỉnh Cao Bằng",
        districts: [
            { id: "401", name: "Thành phố Cao Bằng" },
            { id: "402", name: "Huyện Bảo Lạc" },
            { id: "403", name: "Huyện Bảo Lâm" },
            { id: "404", name: "Huyện Thông Nông" },
            { id: "405", name: "Huyện Hà Quảng" },
            { id: "406", name: "Huyện Trùng Khánh" },
            { id: "407", name: "Huyện Hạ Lang" },
            { id: "408", name: "Huyện Quảng Hòa" },
            { id: "409", name: "Huyện Hoà An" },
            { id: "410", name: "Huyện Nguyên Bình" }
        ]
    },
    {
        id: "06",
        name: "Tỉnh Bắc Kạn",
        districts: [
            { id: "601", name: "Thành phố Bắc Kạn" },
            { id: "602", name: "Huyện Pác Nặm" },
            { id: "603", name: "Huyện Ba Bể" },
            { id: "604", name: "Huyện Ngân Sơn" },
            { id: "605", name: "Huyện Bạch Thông" },
            { id: "606", name: "Huyện Chợ Đồn" },
            { id: "607", name: "Huyện Chợ Mới" },
            { id: "608", name: "Huyện Na Rì" }
        ]
    },
    {
        id: "08",
        name: "Tỉnh Tuyên Quang",
        districts: [
            { id: "801", name: "Thành phố Tuyên Quang" },
            { id: "802", name: "Huyện Lâm Bình" },
            { id: "803", name: "Huyện Na Hang" },
            { id: "804", name: "Huyện Chiêm Hóa" },
            { id: "805", name: "Huyện Hàm Yên" },
            { id: "806", name: "Huyện Yên Sơn" },
            { id: "807", name: "Huyện Sơn Dương" }
        ]
    },
    {
        id: "10",
        name: "Tỉnh Lào Cai",
        districts: [
            { id: "1001", name: "Thành phố Lào Cai" },
            { id: "1002", name: "Huyện Bát Xát" },
            { id: "1003", name: "Huyện Mường Khương" },
            { id: "1004", name: "Huyện Si Ma Cai" },
            { id: "1005", name: "Huyện Bắc Hà" },
            { id: "1006", name: "Huyện Bảo Thắng" },
            { id: "1007", name: "Huyện Bảo Yên" },
            { id: "1008", name: "Huyện Sa Pa" }
        ]
    },
    {
        id: "11",
        name: "Tỉnh Điện Biên",
        districts: [
            { id: "1101", name: "Thành phố Điện Biên Phủ" },
            { id: "1102", name: "Huyện Điện Biên" },
            { id: "1103", name: "Huyện Điện Biên Đông" },
            { id: "1104", name: "Huyện Mường Ảng" },
            { id: "1105", name: "Huyện Mường Chà" },
            { id: "1106", name: "Huyện Tủa Chùa" },
            { id: "1107", name: "Huyện Tuần Giáo" },
            { id: "1108", name: "Huyện Nậm Pồ" }
        ]
    },
    {
        id: "12",
        name: "Tỉnh Lai Châu",
        districts: [
            { id: "1201", name: "Thành phố Lai Châu" },
            { id: "1202", name: "Huyện Tam Đường" },
            { id: "1203", name: "Huyện Mường Tè" },
            { id: "1204", name: "Huyện Sìn Hồ" },
            { id: "1205", name: "Huyện Phong Thổ" },
            { id: "1206", name: "Huyện Than Uyên" },
            { id: "1207", name: "Huyện Tân Uyên" }
        ]
    },
    {
        id: "14",
        name: "Tỉnh Sơn La",
        districts: [
            { id: "1401", name: "Thành phố Sơn La" },
            { id: "1402", name: "Huyện Quỳnh Nhai" },
            { id: "1403", name: "Huyện Mường La" },
            { id: "1404", name: "Huyện Thuận Châu" },
            { id: "1405", name: "Huyện Bắc Yên" },
            { id: "1406", name: "Huyện Phù Yên" },
            { id: "1407", name: "Huyện Mộc Châu" },
            { id: "1408", name: "Huyện Yên Châu" },
            { id: "1409", name: "Huyện Mai Sơn" },
            { id: "1410", name: "Huyện Sông Mã" }
        ]
    },
    {
        id: "15",
        name: "Tỉnh Yên Bái",
        districts: [
            { id: "1501", name: "Thành phố Yên Bái" },
            { id: "1502", name: "Huyện Lục Yên" },
            { id: "1503", name: "Huyện Mù Căng Chải" },
            { id: "1504", name: "Huyện Trấn Yên" },
            { id: "1505", name: "Huyện Trạm Tấu" },
            { id: "1506", name: "Huyện Văn Yên" },
            { id: "1507", name: "Huyện Văn Chấn" },
            { id: "1508", name: "Huyện Yên Bình" }
        ]
    },
    {
        id: "17",
        name: "Tỉnh Hòa Bình",
        districts: [
            { id: "1701", name: "Thành phố Hòa Bình" },
            { id: "1702", name: "Huyện Đà Bắc" },
            { id: "1703", name: "Huyện Kỳ Sơn" },
            { id: "1704", name: "Huyện Lương Sơn" },
            { id: "1705", name: "Huyện Kim Bôi" },
            { id: "1706", name: "Huyện Cao Phong" },
            { id: "1707", name: "Huyện Tân Lạc" },
            { id: "1708", name: "Huyện Mai Châu" },
            { id: "1709", name: "Huyện Lạc Sơn" },
            { id: "1710", name: "Huyện Yên Thủy" }
        ]
    },
    {
        id: "22",
        name: "Tỉnh Quảng Ninh",
        districts: [
            { id: "2201", name: "Thành phố Hạ Long" },
            { id: "2202", name: "Thành phố Cẩm Phả" },
            { id: "2203", name: "Thành phố Uông Bí" },
            { id: "2204", name: "Thị xã Đông Triều" },
            { id: "2205", name: "Huyện Bình Liêu" },
            { id: "2206", name: "Huyện Hải Hà" },
            { id: "2207", name: "Huyện Tiên Yên" },
            { id: "2208", name: "Huyện Đầm Hà" },
            { id: "2209", name: "Huyện Ba Chẽ" },
            { id: "2210", name: "Huyện Vân Đồn" }
        ]
    },
    {
        id: "24",
        name: "Tỉnh Bắc Giang",
        districts: [
            { id: "2401", name: "Thành phố Bắc Giang" },
            { id: "2402", name: "Huyện Yên Thế" },
            { id: "2403", name: "Huyện Tân Yên" },
            { id: "2404", name: "Huyện Lạng Giang" },
            { id: "2405", name: "Huyện Lục Nam" },
            { id: "2406", name: "Huyện Lục Ngạn" },
            { id: "2407", name: "Huyện Sơn Động" },
            { id: "2408", name: "Huyện Việt Yên" },
            { id: "2409", name: "Huyện Hiệp Hòa" }
        ]
    },
    {
        id: "25",
        name: "Tỉnh Phú Thọ",
        districts: [
            { id: "2501", name: "Thành phố Việt Trì" },
            { id: "2502", name: "Thị xã Phú Thọ" },
            { id: "2503", name: "Huyện Lâm Thao" },
            { id: "2504", name: "Huyện Cẩm Khê" },
            { id: "2505", name: "Huyện Thanh Ba" },
            { id: "2506", name: "Huyện Phù Ninh" },
            { id: "2507", name: "Huyện Yên Lập" },
            { id: "2508", name: "Huyện Đoan Hùng" },
            { id: "2509", name: "Huyện Hạ Hoà" },
            { id: "2510", name: "Huyện Thanh Sơn" }
        ]
    },
    {
        id: "26",
        name: "Tỉnh Vĩnh Phúc",
        districts: [
            { id: "2601", name: "Thành phố Vĩnh Yên" },
            { id: "2602", name: "Thị xã Phúc Yên" },
            { id: "2603", name: "Huyện Lập Thạch" },
            { id: "2604", name: "Huyện Tam Đảo" },
            { id: "2605", name: "Huyện Tam Dương" },
            { id: "2606", name: "Huyện Bình Xuyên" },
            { id: "2607", name: "Huyện Yên Lạc" },
            { id: "2608", name: "Huyện Sông Lô" }
        ]
    },
    {
        id: "27",
        name: "Tỉnh Bắc Ninh",
        districts: [
            { id: "2701", name: "Thành phố Bắc Ninh" },
            { id: "2702", name: "Huyện Yên Phong" },
            { id: "2703", name: "Huyện Quế Võ" },
            { id: "2704", name: "Huyện Tiên Du" },
            { id: "2705", name: "Huyện Từ Sơn" },
            { id: "2706", name: "Thị xã Thuận Thành" },
            { id: "2707", name: "Huyện Gia Bình" },
            { id: "2708", name: "Huyện Lương Tài" }
        ]
    },
    {
        id: "30",
        name: "Tỉnh Hải Dương",
        districts: [
            { id: "3001", name: "Thành phố Hải Dương" },
            { id: "3002", name: "Thị xã Chí Linh" },
            { id: "3003", name: "Huyện Nam Sách" },
            { id: "3004", name: "Huyện Kinh Môn" },
            { id: "3005", name: "Huyện Kim Thành" },
            { id: "3006", name: "Huyện Thanh Hà" },
            { id: "3007", name: "Huyện Cẩm Giàng" },
            { id: "3008", name: "Huyện Bình Giang" },
            { id: "3009", name: "Huyện Gia Lộc" },
            { id: "3010", name: "Huyện Tứ Kỳ" }
        ]
    },
    {
        id: "31",
        name: "Tỉnh Hưng Yên",
        districts: [
            { id: "3101", name: "Thành phố Hưng Yên" },
            { id: "3102", name: "Huyện Văn Lâm" },
            { id: "3103", name: "Huyện Mỹ Hào" },
            { id: "3104", name: "Huyện Văn Giang" },
            { id: "3105", name: "Huyện Yên Mỹ" },
            { id: "3106", name: "Huyện Khoái Châu" },
            { id: "3107", name: "Huyện Kim Động" },
            { id: "3108", name: "Huyện Tiên Lữ" },
            { id: "3109", name: "Huyện Phù Cừ" }
        ]
    },
    {
        id: "33",
        name: "Tỉnh Thái Bình",
        districts: [
            { id: "3301", name: "Thành phố Thái Bình" },
            { id: "3302", name: "Huyện Quỳnh Phụ" },
            { id: "3303", name: "Huyện Hưng Hà" },
            { id: "3304", name: "Huyện Đông Hưng" },
            { id: "3305", name: "Huyện Tiền Hải" },
            { id: "3306", name: "Huyện Thái Thụy" },
            { id: "3307", name: "Huyện Vũ Thư" }
            ]
    },
    {
        id: "34",
        name: "Tỉnh Hà Nam",
        districts: [
            { id: "3401", name: "Thành phố Phủ Lý" },
            { id: "3402", name: "Huyện Duy Tiên" },
            { id: "3403", name: "Huyện Kim Bảng" },
            { id: "3404", name: "Huyện Thanh Liêm" },
            { id: "3405", name: "Huyện Bình Lục" }
        ]
    },
    {
        id: "40",
        name: "Tỉnh Nghệ An",
        districts: [
            { id: "4001", name: "Thành phố Vinh" },
            { id: "4002", name: "Thị xã Cửa Lò" },
            { id: "4003", name: "Huyện Quế Phong" },
            { id: "4004", name: "Huyện Quỳ Châu" },
            { id: "4005", name: "Huyện Kỳ Sơn" },
            { id: "4006", name: "Huyện Tương Dương" },
            { id: "4007", name: "Huyện Nghĩa Đàn" },
            { id: "4008", name: "Huyện Quỳ Hợp" },
            { id: "4009", name: "Huyện Quỳnh Lưu" },
            { id: "4010", name: "Huyện Con Cuông" }
        ]
    },
    {
        id: "44",
        name: "Tỉnh Bình Định",
        districts: [
            { id: "4401", name: "Thành phố Quy Nhơn" },
            { id: "4402", name: "Thị xã An Nhơn" },
            { id: "4403", name: "Huyện Phù Cát" },
            { id: "4404", name: "Huyện Hoài Nhơn" },
            { id: "4405", name: "Huyện Hoài Ân" },
            { id: "4406", name: "Huyện An Lão" },
            { id: "4407", name: "Huyện Vĩnh Thạnh" },
            { id: "4408", name: "Huyện Tây Sơn" },
            { id: "4409", name: "Huyện Phù Mỹ" },
            { id: "4410", name: "Huyện Tuy Phước" }
        ]
    },
    {
        id: "47",
        name: "Tỉnh Đồng Nai",
        districts: [
            { id: "4701", name: "Thành phố Biên Hòa" },
            { id: "4702", name: "Thành phố Long Khánh" },
            { id: "4703", name: "Huyện Tân Phú" },
            { id: "4704", name: "Huyện Vĩnh Cửu" },
            { id: "4705", name: "Huyện Định Quán" },
            { id: "4706", name: "Huyện Thống Nhất" },
            { id: "4707", name: "Huyện Cẩm Mỹ" },
            { id: "4708", name: "Huyện Trảng Bom" },
            { id: "4709", name: "Huyện Xuân Lộc" },
            { id: "4710", name: "Huyện Long Thành" }
        ]
    },
    {
        id: "49",
        name: "Tỉnh Bình Dương",
        districts: [
            { id: "4901", name: "Thị xã Thủ Dầu Một" },
            { id: "4902", name: "Thị xã Dĩ An" },
            { id: "4903", name: "Thị xã Thuận An" },
            { id: "4904", name: "Huyện Bàu Bàng" },
            { id: "4905", name: "Huyện Dầu Tiếng" },
            { id: "4906", name: "Huyện Phú Giáo" }
        ]
    },
    {
        id: "51",
        name: "Tỉnh Cần Thơ",
        districts: [
            { id: "5101", name: "Quận Ninh Kiều" },
            { id: "5102", name: "Quận Bình Thủy" },
            { id: "5103", name: "Quận Cái Răng" },
            { id: "5104", name: "Quận Ô Môn" },
            { id: "5105", name: "Quận Thốt Nốt" },
            { id: "5106", name: "Huyện Vĩnh Thạnh" },
            { id: "5107", name: "Huyện Cờ Đỏ" },
            { id: "5108", name: "Huyện Thới Lai" }
        ]
    },
    {
        id: "54",
        name: "Tỉnh An Giang",
        districts: [
            { id: "5401", name: "Thành phố Long Xuyên" },
            { id: "5402", name: "Thị xã Châu Đốc" },
            { id: "5403", name: "Huyện Tịnh Biên" },
            { id: "5404", name: "Huyện Tri Tôn" },
            { id: "5405", name: "Huyện Châu Phú" },
            { id: "5406", name: "Huyện Châu Thành" },
            { id: "5407", name: "Huyện Chợ Mới" },
            { id: "5408", name: "Huyện Thoại Sơn" }
        ]
    },
    {
        id: "56",
        name: "Tỉnh Kiên Giang",
        districts: [
            { id: "5601", name: "Thành phố Rạch Giá" },
            { id: "5602", name: "Thị xã Hà Tiên" },
            { id: "5603", name: "Huyện Kiên Lương" },
            { id: "5604", name: "Huyện Hòn Đất" },
            { id: "5605", name: "Huyện Tân Hiệp" },
            { id: "5606", name: "Huyện Châu Thành" },
            { id: "5607", name: "Huyện Giang Thành" },
            { id: "5608", name: "Huyện An Biên" },
            { id: "5609", name: "Huyện An Minh" }
        ]
    },
    {
        id: "58",
        name: "Tỉnh Đồng Tháp",
        districts: [
            { id: "5801", name: "Thành phố Cao Lãnh" },
            { id: "5802", name: "Thành phố Sa Đéc" },
            { id: "5803", name: "Thị xã Hồng Ngự" },
            { id: "5804", name: "Huyện Tân Hồng" },
            { id: "5805", name: "Huyện Hồng Ngự" },
            { id: "5806", name: "Huyện Tam Nông" },
            { id: "5807", name: "Huyện Tháp Mười" },
            { id: "5808", name: "Huyện Cao Lãnh" },
            { id: "5809", name: "Huyện Thanh Bình" },
            { id: "5810", name: "Huyện Lấp Vò" }
        ]
    }
];
