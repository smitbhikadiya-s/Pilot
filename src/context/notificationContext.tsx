import { notification } from "antd";
import { createContext, useCallback, useContext, type ReactNode } from "react";

type NotificationType = {
  theme: "success" | "info" | "warning" | "error";
  placement:
    | "top"
    | "topLeft"
    | "topRight"
    | "bottom"
    | "bottomLeft"
    | "bottomRight"
    | undefined;
  message: string;
  description?: string;
};

interface NotificationContextValue {
  openNotificationWithIcon: (arg: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = useCallback(
    ({ message, theme, description, placement }: NotificationType) => {
      api[theme]({
        message,
        description,
        placement,
      });
    },
    [api]
  );

  const contextValue: NotificationContextValue = {
    openNotificationWithIcon,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
