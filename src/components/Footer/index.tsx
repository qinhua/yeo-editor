/*
 * @Author: BabyChin
 * @Date: 2021-06-11 12:38:23
 * @LastEditTime: 2021-06-11 14:42:47
 * @Description:
 */
import "./index.scss";
import { connect } from "react-redux";
interface PropsType {
  [key: string]: any;
}
const mapStateToProps = (state: any) => {
  return {
    editorData: state.appReducer.editorData,
    theme: state.appReducer.theme,
  };
};
function Footer(props: PropsType) {
  return (
    <div className="yeo-footer">
      <p>
        行数：{props.editorData.line}&nbsp;&nbsp;&nbsp;字数：
        {props.editorData.words}&nbsp;&nbsp;&nbsp;主题：
        {props.theme === 1 ? "浅色" : "暗黑"}模式
      </p>
    </div>
  );
}

export default connect(mapStateToProps)(Footer);
