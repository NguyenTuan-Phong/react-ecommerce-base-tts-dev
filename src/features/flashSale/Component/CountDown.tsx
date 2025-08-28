import Countdown from "react-countdown";

type Props = {
  endTime: string;
};

const FlipCountdown = ({ endTime }: Props) => {
  return (
    <Countdown
      date={new Date(endTime)}
      renderer={({ days, hours, minutes, seconds, completed }) => {
        if (completed) return null;

        return (
          <div className="flex justify-center gap-2">
            <div className="bg-[black] text-[white] font-bold p-1">{String(days).padStart(2, "0")}</div>
            <span className="font-bold">:</span>
            {/* Giờ */}
            <div className="bg-[black] text-[white] font-bold p-1">{String(hours).padStart(2, "0")}</div>
            <span className="font-bold">:</span>
            {/* Phút */}
            <div className="bg-[black] text-[white] font-bold p-1">{String(minutes).padStart(2, "0")}</div>
            <span className="font-bold">:</span>
            {/* Giây */}
            <div className="bg-[black] text-[white] font-bold p-1">{String(seconds).padStart(2, "0")}</div>
          </div>
        );
      }}
    />
  );
};

export default FlipCountdown;
