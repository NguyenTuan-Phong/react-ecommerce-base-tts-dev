// import React from "react";
// import type { FlashSale } from "../../../types";

// interface Props {
//   sales: FlashSale[];
//   selectedId: number | null;
//   onSelect: (id: number) => void;
// }

// export const FlashSaleFilterBar: React.FC<Props> = ({ sales, selectedId, onSelect }) => {
//   return (
//     <div className="flex gap-4 overflow-x-auto py-2">
//       {sales.map((sale) => (
//         <button
//           key={sale.productId}
//           className={`px-4 py-2 rounded-full border ${
//             selectedId === sale.productId ? "bg-red-500 text-white" : "bg-white text-black"
//           }`}
//           onClick={() => onSelect(sale.productId)}
//         >
//           {sale.name}
//         </button>
//       ))}
//     </div>
//   );
// };
