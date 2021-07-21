/*
 * @Author: BabyChin
 * @Date: 2021-06-11 10:56:26
 * @LastEditTime: 2021-07-21 23:31:11
 * @Description:
 */
import "./index.scss";
import "braft-editor/dist/index.css";
import { Component } from "react";
import Editor from "braft-editor";

interface PropsType {
  [key: string]: any;
}
interface StateType {
  editorState: any;
  outHtml: string;
}

export default class RichText extends Component<PropsType> {
  state: StateType = {
    editorState: Editor.createEditorState(""),
    outHtml: "",
  };
  static getDerivedStateFromProps(props: PropsType, state: StateType) {
    if (props.content !== state.outHtml) {
      return {
        editorState: Editor.createEditorState(`${props.content}`),
        outHtml: props.content,
      };
    }
    return null;
  }
  shouldComponentUpdate(props: PropsType) {
    if (props.content !== this.state.outHtml) {
      return true;
    }
    return false;
  }
  async submitContent() {
    // Pressing ctrl + s when the editor has focus will execute this method
    // Before the editor content is submitted to the server, you can directly call editorState.toHTML () to get the HTML content
    const htmlContent = this.state.outHtml;
    console.log(htmlContent);

    // const result = await saveEditorContent(htmlContent)
  }

  handleChange(editorState: any) {
    const value = editorState.toHTML(true);
    const text = editorState.toText();
    this.setState({
      editorState,
      outHtml: value,
    });
    this.props.onChange({
      type: "richtext",
      value,
      line: text ? JSON.parse(editorState.toRAW()).blocks.length : 0,
      words: text.length,
    });
  }
  render() {
    const { editorState } = this.state;
    return (
      <div id="yeo-richtext-editor">
        <Editor
          excludeControls={["media"]}
          value={editorState}
          onChange={(data) => this.handleChange(data)}
        />
      </div>
    );
  }
}
