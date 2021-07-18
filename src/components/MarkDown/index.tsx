/*
 * @Author: BabyChin
 * @Date: 2021-06-11 10:56:37
 * @LastEditTime: 2021-07-14 22:09:56
 * @Description:
 */
import "./index.scss";
import { Component } from "react";
import Editor from "for-editor";

interface PropsType {
  content: string;
  [key: string]: any;
}

interface StateType {
  value: string;
  [key: string]: any;
}
export default class MarkDown extends Component<PropsType> {
  state: StateType;
  constructor(props: PropsType) {
    super(props);
    this.state = {
      value: "",
      lineNum: false,
      toolbar: {
        h1: true, // h1
        h2: true, // h2
        h3: true, // h3
        h4: true, // h4
        img: true, // 图片
        link: true, // 链接
        code: true, // 代码块
        preview: false, // 预览
        expand: true, // 全屏
        undo: true, // 撤销
        redo: true, // 重做
        save: false, // 保存
        subfield: false, // 单双栏模式
      },
    };
  }
  shouldComponentUpdate(nextProps: PropsType) {
    if (nextProps.content === this.state.value) return false;
    this.setState({
      value: nextProps.content,
    });
    return true;
  }
  handleChange(value: string) {
    this.setState({
      value,
    });
    const lines = value.match(/\n/g);
    this.props.onChange({
      type: "markdown",
      value,
      line: value ? (lines ? lines.length + 1 : 1) : 0,
      words: value.length,
    });
  }

  render() {
    const { value, toolbar, lineNum } = this.state;
    return (
      <div id="yeo-markdown-editor">
        <Editor
          value={value}
          toolbar={toolbar}
          lineNum={lineNum}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}
