import type { Combo } from "../../admin/combo/type";
import ImageWithFallback from "../../../components/img/ImageWithFallback";
import { Link } from "react-router-dom";
import { Button, Tag, Tooltip } from "antd";
import { LoadingOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useCart } from "../../cart/hook";
import useAddCart from "../../cart/hook/useAddCart";
import useUserStore from "../../../store/useUserStore";
import { useMemo } from "react";

interface ComboProductCardProp {
  data: Combo[];
}

const formatVND = (n?: number) =>
    (n ?? 0).toLocaleString("vi-VN") + " VNĐ";

const ComboProductCard = ({ data }: ComboProductCardProp) => {
    const { refetchCart } = useCart();
    const { loadingComboId, handleAddCart } = useAddCart(refetchCart);
    const userId = useUserStore((state) => state.user?.id);

    if (!data?.length) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-200 p-10 text-center text-gray-500">
                Chưa có combo nào.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {data.map((combo) => {
                const discountPercent = useMemo(() => {
                    if (!combo.originalTotalPrice) return 0;
                    const pct = 100 - Math.round((combo.price / combo.originalTotalPrice) * 100);
                    return Math.max(0, pct);
                }, [combo.price, combo.originalTotalPrice]);

                return (
                    <div
                        key={combo.id}
                        className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-xl"
                    >
                        <div className="flex items-start justify-between gap-3 border-b px-5 py-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <h3 className="text-base font-semibold text-gray-900 md:text-lg">
                                    {combo.nameCombo}
                                </h3>
                                <Tag className="rounded-full px-2 py-[2px] text-xs">
                                    {combo.products?.length ?? 0} sản phẩm
                                </Tag>
                                {discountPercent > 0 && (
                                    <Tag color="red" className="rounded-full px-2 py-[2px] text-xs font-semibold">
                                        -{discountPercent}%
                                    </Tag>
                                )}
                            </div>

                            <Link
                                to={"/combo-product"}
                                state={combo.id}
                                className="text-sm text-gray-600 transition-colors hover:text-red-600"
                                aria-label={`Xem chi tiết combo ${combo.nameCombo}`}
                            >
                                Xem chi tiết →
                            </Link>
                        </div>

                        <div className="flex flex-col gap-5 p-5 lg:flex-row">
                            <div className="grid flex-1 gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:border-r lg:pr-6">
                                {combo.products.slice(0, 4).map((product, index) => {
                                    const isLastVisible = index === 3 && combo.products.length > 4;
                                    const remainingCount = combo.products.length - 4;

                                    return (
                                        <div key={product.id} className="relative">
                                            <div className={`min-w-[120px] text-start ${isLastVisible ? "opacity-50" : ""}`}>
                                                <div className="overflow-hidden rounded-lg">
                                                    <ImageWithFallback
                                                        src={product.productImageUrl}
                                                        alt={product.productName}
                                                        className="mx-auto h-40 w-full transform object-cover transition duration-300 group-hover:scale-[1.02]"
                                                    />
                                                </div>
                                                <Tooltip title={product.productName}>
                                                    <div className="line-clamp-1 px-1 pt-2 text-xs text-gray-800">
                                                        {product.productName}
                                                    </div>
                                                </Tooltip>
                                                <div className="px-1 pt-1 text-xs">
                                                    <span className="mr-1 line-through text-gray-400">
                                                        {formatVND(product.totalPrice)}
                                                    </span>
                                                </div>
                                            </div>

                                            {isLastVisible && (
                                                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 text-lg font-semibold text-white">
                                                    +{remainingCount}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="w-full shrink-0 lg:w-72 lg:pl-6">
                                <div className="mb-2 flex items-baseline justify-end gap-2">
                                    <span className="text-sm text-gray-400 line-through">
                                        {formatVND(combo.originalTotalPrice)}
                                    </span>
                                    <span className="text-xl font-bold text-pink-600">{formatVND(combo.price)}</span>
                                </div>
                                <div className="mb-4 text-right text-sm text-green-600">
                                    Tiết kiệm <span className="font-semibold">{formatVND(combo.originalTotalPrice - combo.price)}</span>
                                </div>

                                <Button
                                    className="w-full select-none rounded-xl border! border-red-500! bg-white! py-2! font-semibold! text-red-600! shadow-sm! transition hover:bg-red-50!"
                                    disabled={loadingComboId === combo.id}
                                    onClick={() => handleAddCart(userId!,false, undefined, undefined, { id: combo.id, quantity: 1 })}
                                >
                                    {loadingComboId === combo.id ? (
                                        <LoadingOutlined />
                                    ) : (
                                        <div className="flex items-center justify-center gap-2 text-sm">
                                            <ShoppingCartOutlined className="h-4 w-4" />
                                            Bấm Để Mua Deal Sốc
                                        </div>
                                    )}
                                </Button>

                                <div className="mt-3 text-right text-[11px] text-gray-500">
                                    Giao nhanh • Đổi trả dễ • Bảo hành chính hãng
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ComboProductCard;