import { Button } from "antd";

interface ButtonUpdateProps {
    onclick: () => void;
}

const ButtonUpdate = ({
    onclick
} : ButtonUpdateProps) => {
    return (
        <Button
            className="bg-green-700! text-[white]!"
            onClick={onclick}
        >
            Cập nhật
        </Button>
    );
}
export default ButtonUpdate;