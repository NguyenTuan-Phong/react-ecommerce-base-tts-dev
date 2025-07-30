import { Popconfirm, Button } from "antd";

interface ConfirmActionButtonProps {
  title?: string;
  description?: string;
  okText?: string;
  cancelText?: string;
  onConfirm: () => void;
  isLoading?: boolean;
  danger?: boolean;
}

export default function ButtonDelete({
  title = "Bạn có chắc chắn muốn xóa?",
  description,
  okText = "Xác nhận",
  cancelText = "Hủy",
  onConfirm,
  isLoading = false,
  danger = false,
}: ConfirmActionButtonProps) {
  return (
    <Popconfirm
      title={title}
      description={description}
      okText={okText}
      cancelText={cancelText}
      onConfirm={onConfirm}
      okButtonProps={{ danger, loading: isLoading }}
    >
      <Button className="bg-red-500! text-white!">Xóa</Button>
    </Popconfirm>
  );
}
