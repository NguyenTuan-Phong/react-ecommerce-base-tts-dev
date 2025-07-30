import {
    CarOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    SmileOutlined,
    ScheduleOutlined 
} from "@ant-design/icons";

export const STATUS_CONFIG = [
  {
    key: "processing",
    label: "Chờ xác nhận",
    icon: <ClockCircleOutlined className="text-amber-300! text-[40px]!" />,
    matchText: "Đơn hàng đang được chuẩn bị",
    time: null
  },
  {
    key: "confirmed",
    label: "Xác nhận",
    icon: <CheckCircleOutlined className="text-rose-500! text-[40px]!" />,
    matchText: "Đơn hàng sẵn sàng để giao",
    time: null
  },
  {
    key: "ready",
    label: "Sẵn sàng giao",
    icon: <ScheduleOutlined  className="text-fuchsia-500! text-[40px]!" />,
    matchText: "Đơn hàng đang được giao",
    time: null
  },
  {
    key: "shipping",
    label: "Đang giao",
    icon: <CarOutlined className="text-orange-500! text-[40px]!" />,
    matchText: "Đơn hàng đã hoàn thành",
    time: null
  },
  {
    key: "completed",
    label: "Giao thành công",
    icon: <SmileOutlined className="text-pink-500! text-[40px]!" />,
    matchText: "Đơn hàng đã hoàn thành",
    time: null
  },
];
