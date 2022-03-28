
import { notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export function openNotification(placement, title, text, icon, duration) {
  return notification.info({
    message: title,
    description: text,
    placement,
    icon: icon ? icon : <ExclamationCircleOutlined style={{color:"#DA291C"}} />,
    duration: duration ? duration : 2,
  });
};
