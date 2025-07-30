import { Typography, Checkbox } from "antd";
import type { PriceRange } from "../../../types";
import { useGetPublishers } from "../hook/useGetPublishers";

const { Title } = Typography;

interface Props {

  selectedPublisher: string | undefined;
  setSelectedPublisher: (id: string | undefined) => void;
  minPrice: number| undefined;
  setMinPrice: ( min: number | undefined) => void;
  maxPrice: number| undefined;
  setMaxPrice: (max: number | undefined) => void;
}

const ProductFilterPage = ({
  selectedPublisher,
  setSelectedPublisher,
  minPrice,
  setMaxPrice,
  setMinPrice,
  maxPrice
}: Props) => {

  const page = 0
  const size = 10
  const {
    ResponseGetPublisher
  } = useGetPublishers(page, size)


  const priceRanges: PriceRange[] = [
    { label: "Dưới 100.000", min: 0, max: 100000 },
    { label: "100.000 - 200.000", min: 100000, max: 200000 },
    { label: "200.000 - 300.000", min: 200000, max: 300000 },
    { label: "Trên 300.000", min: 300000, max: 99999999 },
  ];

  return (
    <div className="p-6 bg-white rounded-xl">
      <div className="flex flex-col gap-2">
        {priceRanges.map((range) => {
          const isSelected = 
            minPrice === range.min && maxPrice === range.max;

          if (minPrice && maxPrice && !isSelected) return null;

          return (
            <Checkbox
              key={range.label}
              checked={isSelected}
              onChange={() => {
                if (isSelected) {
                  setMinPrice(undefined);
                  setMaxPrice(undefined);
                } else {
                  setMinPrice(range.min);
                  setMaxPrice(range.max);
                }
              }}
            >
              {range.label}
            </Checkbox>
          );
        })}
      </div>

        <>
          <Title level={4} className="mt-4">Hãng sản xuất</Title>
          <div className="flex flex-col gap-2">
            {ResponseGetPublisher?.data?.content?.map((pub) => {
              const isChecked = selectedPublisher === pub.id;

              if (selectedPublisher && !isChecked) return null;

              return (
                <Checkbox
                  key={pub.id}
                  checked={isChecked}
                  onChange={() =>
                    setSelectedPublisher(isChecked ? undefined : pub.id)
                  }
                >
                  {pub.name}
                </Checkbox>
              );
            })}
          </div>
        </>
    </div>
  );
};

export default ProductFilterPage;