/*
 * @Author: BabyChin
 * @Date: 2021-06-11 12:38:23
 * @LastEditTime: 2021-06-11 14:42:47
 * @Description:
 */
import "./index.scss";
import { Empty } from "antd";

export default function NoData(props: { [key: string]: any }) {
  return (
    <Empty
      description={props.text || "暂无数据"}
      image={props.image || Empty.PRESENTED_IMAGE_SIMPLE}
      imageStyle={{
        marginTop: "30px",
        height: 46,
      }}
    />
  );
}
