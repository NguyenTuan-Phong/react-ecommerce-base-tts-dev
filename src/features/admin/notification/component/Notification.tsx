// import { Badge, Dropdown } from "antd";
// import { BellTwoTone } from "@ant-design/icons";
// import { useEffect, useState } from "react";
// import { onChildAdded, ref, get, update } from "firebase/database";

// const Notification = () => {
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const adminId = "admin";

//   useEffect(() => {
//     const notiRef = ref(database, `notifications/${adminId}`);
//     const unsubscribe = onChildAdded(notiRef, (snapshot) => {
//       const newNoti = { ...snapshot.val(), key: snapshot.key };
//       setNotifications((prev) => [...prev, newNoti]);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleOpenChange = async (open: boolean) => {
//     setDropdownOpen(open);
//     if (open) {
//       const notiRef = ref(database, `notifications/${adminId}`);
//       const snapshot = await get(notiRef);
//       if (snapshot.exists()) {
//         const updates: Record<string, any> = {};
//         snapshot.forEach((child) => {
//           const data = child.val();
//           if (!data.read) {
//             updates[child.key] = { ...data, read: true };
//           }
//         });

//         if (Object.keys(updates).length > 0) {
//           await update(notiRef, updates);
//         }

//         // Cập nhật lại trạng thái local để ẩn số badge
//         const updated = notifications.map((noti) => ({ ...noti, read: true }));
//         setNotifications(updated);
//       }
//     }
//   };

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   const items = notifications
//     .slice()
//     .reverse()
//     .map((noti, index) => ({
//       key: index,
//       label: (
//         <div
//           className={`px-3 py-2 border-b border-gray-200 text-sm ${
//             noti.read ? "bg-white" : "bg-blue-50"
//           }`}
//         >
//           <div>{noti.message}</div>
//           <div className="text-xs text-gray-500 mt-1">
//             {new Date(noti.timestamp).toLocaleString()}
//           </div>
//         </div>
//       ),
//     }));

//   return (
//     <Dropdown
//       menu={{ items }}
//       placement="bottomRight"
//       trigger={["click"]}
//       open={dropdownOpen}
//       onOpenChange={handleOpenChange}
//     >
//       <Badge count={unreadCount} overflowCount={99}>
//         <BellTwoTone className="text-xl text-[#fa7833] cursor-pointer" />
//       </Badge>
//     </Dropdown>
//   );
// };

// export default Notification;
