
import { notification, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export function openNotification(placement, title, text, icon, duration) {
  return notification.info({
    message: title,
    description: text,
    placement,
    icon: icon ? icon : <ExclamationCircleOutlined style={{ color:"#DA291C" }} />,
    duration: duration ? duration : 2,
  });
};

export function checkModal({ icon, title, content, okText, cancelText, onOk, onCancel }) {
  return Modal.confirm({
    icon: icon ? icon : <ExclamationCircleOutlined style={{ color:"#DA291C" }}/>,
    title: title,
    content: content,
    okText: okText ? okText : "확인",
    cancelText: cancelText ? cancelText : "취소",
    onOk: onOk,
    onCancel: onCancel,
  });
}