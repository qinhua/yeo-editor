/*
 * @Author: BabyChin
 * @Date: 2021-06-11 10:56:37
 * @LastEditTime: 2021-07-18 14:08:07
 * @Description:
 */
import "./index.scss";
import { Component } from "react";
import MarkDown from "../MarkDown";
import RichText from "../RichText";
import { connect } from "react-redux";
import { changeEditor, updateSaving } from "../../store/app";
interface PropsType {
  type: string;
  [key: string]: any;
}
const mapStateToProps = (state: any) => ({
  type: state.appReducer.editorType,
  editorData: state.appReducer.editorData,
});
const mapDispatchToProps = (dispatch: any) => ({
  changeEditor: (data: any) => dispatch({ ...changeEditor, payload: data }),
  updateSaving: (data: any) => dispatch({ ...updateSaving, payload: data }),
});
let saveTimer: any = null;

class Editor extends Component<PropsType> {
  change(data?: any) {
    clearTimeout(saveTimer);
    console.log(`${data.type}内容改变：`, data);
    this.props.changeEditor(data);
    this.save(data);
  }
  save(data: any) {
    saveTimer = setTimeout(() => {
      fetch("http://www.dkf.com/api/dff", {
        method: "POST",
        body: JSON.stringify(data),
      }).catch((e) => {
        console.log(e);
        this.props.updateSaving({ status: false });
      });
      // this.props.updateSaving({ status: true });
      clearTimeout(saveTimer);
      setTimeout(() => {
        this.props.updateSaving();
      }, 5000);
    }, 2000);
  }
  render() {
    const { editorData } = this.props;
    return (
      <div className="yeo-editor">
        {this.props.type === "markdown" ? (
          <MarkDown
            content={editorData.value}
            onChange={this.change.bind(this)}
          />
        ) : (
          <RichText
            content={editorData.value}
            onChange={this.change.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
