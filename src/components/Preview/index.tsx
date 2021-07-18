/*
 * @Author: BabyChin
 * @Date: 2021-06-11 10:56:37
 * @LastEditTime: 2021-06-12 23:43:32
 * @Description:
 */
import "./index.scss";
import { Component } from "react";
import { message, Tooltip } from "antd";
import ForEditor from "for-editor";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SvgIcon from "../../components/SvgIcon";
import { connect } from "react-redux";

interface PropsType {
  content: string;
  [key: string]: any;
}

interface StateType {
  mode: string;
  [key: string]: any;
}
const mapStateToProps = (state: any) => {
  return {
    showPreview: state.appReducer.showPreview,
    editorData: state.appReducer.editorData,
  };
};
class Preview extends Component<PropsType> {
  state: StateType = {
    mode: "pc",
  };
  togglePreviewMode() {
    this.setState({ mode: this.state.mode === "pc" ? "mobile" : "pc" });
  }
  handleCopy() {
    message.success("复制成功");
  }
  render() {
    const { mode } = this.state;
    const { type, value } = this.props.editorData;
    return (
      <div className={`yeo-preview${!this.props.showPreview ? " hide" : ""}`}>
        <div
          className={`yeo-preview-wrapper${mode === "mobile" ? " mobile" : ""}`}
        >
          {type === "markdown" ? (
            <ForEditor preview value={value} lineNum={0} toolbar={{}} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: value }} />
          )}
        </div>
        <ol className="fixed-tools">
          <Tooltip placement="left" title="预览模式">
            <li title="预览模式" onClick={this.togglePreviewMode.bind(this)}>
              <SvgIcon
                name={mode === "pc" ? "shouji" : "lianxi2hebing_diannao"}
              />
            </li>
          </Tooltip>
          <Tooltip placement="left" title="一键复制">
            <li>
              <CopyToClipboard text={value} onCopy={this.handleCopy}>
                <span>
                  <SvgIcon name="fuzhi1" />
                </span>
              </CopyToClipboard>
            </li>
          </Tooltip>
        </ol>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Preview);
