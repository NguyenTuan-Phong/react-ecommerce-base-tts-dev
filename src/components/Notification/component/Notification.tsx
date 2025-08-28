import { BellFilled } from "@ant-design/icons";
import { Badge, Dropdown, List, Tabs } from "antd";
import { useNotifications } from "../hook/useNotification";

const Notification = () => {
  const { notifications, setNotifications } = useNotifications();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const items = [
    {
      key: "all",
      label: "Tất cả",
      children: (
        <List
          dataSource={notifications}
          renderItem={(noti) => (
            <List.Item>
              <div>
                <div className="font-semibold">
                  [{noti.type?.toUpperCase()}] {noti.message}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(noti.timestamp).toLocaleString("vi-VN")}
                </div>
              </div>
            </List.Item>
          )}
        />
      ),
    },
    {
      key: "unread",
      label: `Chưa đọc (${unreadCount})`,
      children: (

        <List
          dataSource={notifications.filter((n) => !n.read)}
          renderItem={(noti) => (
            <List.Item>
            <div>
              <div className="font-semibold">
                [{noti.type?.toUpperCase()}] {noti.message}
              </div>

              {noti.imageUrl && (
                <div className="mt-2">
                  <img
                    src={noti.imageUrl}
                    alt="notification"
                    style={{ width: "100%", maxHeight: 150, objectFit: "cover", borderRadius: 4 }}
                  />
                </div>
              )}

              <div className="text-xs text-gray-400">
                {new Date(noti.timestamp).toLocaleString("vi-VN")}
              </div>
            </div>
          </List.Item>

          )}
        />
      ),
    },
  ];

  return (
    <Dropdown
      placement="bottomRight"
      dropdownRender={() => (
        <div style={{ width: 320, background: "white", padding: 8, overflow:"auto", height:300 }}>
          <Tabs
            defaultActiveKey="all"
            items={items}
            tabBarExtraContent={{
              right: (
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={markAllAsRead}
                >
                  Đánh dấu đã đọc
                </span>
              ),
            }}
          />
        </div>
      )}
      trigger={["click"]}
    >
        <Badge count={unreadCount} offset={[-2, 2]}>
          <BellFilled style={{ fontSize: 22, color: "#fa7833" }} />
        </Badge>
    </Dropdown>
  );
};

export default Notification;

