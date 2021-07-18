/*
 * @Author: BabyChin
 * @Date: 2021-06-12 23:05:59
 * @LastEditTime: 2021-07-18 14:14:22
 * @Description:
 */
import "./index.scss";
import { Component, MouseEvent, createRef } from "react";
import NoData from "../NoData";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import SvgIcon from "../../components/SvgIcon";
import { togglePassage, pickPassage, updateEditorData } from "../../store/app";
import { throttle } from "lodash";

interface PropsType {
  [key: string]: any;
}
interface PassageItem {
  id: string;
  title: string;
  content: string;
  status: number;
}
interface StateType {
  list: PassageItem[];
  offsetWidth: null | number;
}
const mapStateToProps = (state: any) => {
  return {
    showPassage: state.appReducer.showPassage,
    showPreview: state.appReducer.showPreview,
    curPassage: state.appReducer.curPassage,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    togglePassage: (data: boolean) => {
      dispatch({ ...togglePassage, payload: data });
    },
    pickPassage: (data: string) => {
      dispatch({ ...pickPassage, payload: data });
    },
    updateEditorData: (data: string) => {
      dispatch({ ...updateEditorData, payload: data });
    },
  };
};
class PassageList extends Component<PropsType> {
  state: StateType = {
    list: [
      {
        id: "1",
        title: "一篇测试文章1",
        content: "高三的时候说好大风好大风好的好大风呼呼的返回",
        status: 1,
      },
      {
        id: "2",
        title: "一篇测试文章2",
        content: "<p>76568685856858的d67868式rhrdhsdhdhdsh</p>",
        status: 0,
      },
    ],
    offsetWidth: null,
  };
  isMove: boolean = false;
  xPos: number = 0;
  myWrapRef = createRef<HTMLDivElement>();
  togglePassage(status: any) {
    this.setState({
      offsetWidth: this.props.showPassage ? 40 : 200,
    });
    this.props.togglePassage(typeof status === "object" ? null : status);
  }
  addPassage() {
    this.props.updateEditorData({ value: "" });
    this.setState((state: StateType) => {
      return {
        list: [
          {
            id: Date.now(),
            title: "无标题",
            content: "",
            status: 0,
          },
          ...state.list,
        ],
      };
    });
    setTimeout(() => {
      this.props.pickPassage(this.state.list[0]);
    }, 0);
  }
  pickPassage(item: PassageItem) {
    this.props.pickPassage(item);

    const lines = item.content.match(/\n/g);
    this.props.updateEditorData({
      value: item.content,
      line: item.content ? (lines ? lines.length + 1 : 1) : 0,
      words: item.content.length,
    });
  }
  getActive(id: string) {
    if (this.state.list.length && this.props.curPassage) {
      return this.state.list.findIndex(
        (c) => c.id === this.props.curPassage.id
      );
    } else {
      return -1;
    }
  }
  moveFn(e: any) {
    const ele = this.myWrapRef;
    return throttle(() => {
      if (this.isMove && ele.current) {
        // const curWidth = ele.current.offsetWidth;
        const diff = e.pageX - this.xPos;
        let left = e.target.offsetLeft + diff;
        if (left <= 40) {
          left = 40;
        }
        if (left <= 110) {
          this.togglePassage(false);
        }
        if (left > 110) {
          this.togglePassage(true);
        }
        if (left >= 400) {
          left = 400;
        }
        this.setState({
          offsetWidth: left,
        });
        this.xPos = e.pageX;
      }
    }, 10);
  }
  handleMouseDown(e: any) {
    // console.log(e, "mousedown");
    this.isMove = true;
    this.xPos = e.pageX;
  }
  handleMouseMove(e: MouseEvent) {
    // console.log(e, "mousemove");
    this.moveFn(e)();
  }
  handleMouseUp(e: MouseEvent) {
    // console.log(e, "mouseup");
    this.isMove = false;
  }
  handleMouseOut(e: MouseEvent) {
    // console.log(e, "mouseout");
    this.isMove = false;
  }
  render() {
    let content;
    const { showPassage } = this.props;
    const { list, offsetWidth } = this.state;
    if (list.length) {
      content = (
        <ul className="passage-list">
          {list.map((item, index) => {
            return (
              <Tooltip placement="right" title={item.title} key={item.id}>
                <li
                  onClick={() => this.pickPassage(item)}
                  className={this.getActive(item.id) === index ? "active" : ""}
                >
                  {showPassage ? <p>{item.title}</p> : <i>{index + 1}</i>}
                </li>
              </Tooltip>
            );
          })}
        </ul>
      );
    } else {
      content = <NoData text="暂无文章" />;
    }
    return (
      <div
        className={`yeo-passage${!showPassage ? " hide" : ""}`}
        ref={this.myWrapRef}
        style={{ width: offsetWidth + "px" }}
      >
        <h2>文章列表</h2>
        <Tooltip placement="right" title={showPassage ? "收起" : "展开"}>
          <span
            className="btn-expander"
            onClick={this.togglePassage.bind(this)}
          >
            <SvgIcon name={showPassage ? "shouqi" : "zhedie2"} />
          </span>
        </Tooltip>
        <div className="passage-content">{content}</div>
        <span className="btn-add" onClick={this.addPassage.bind(this)}>
          <SvgIcon name="add" />
        </span>
        <span
          style={{ left: offsetWidth + "px" }}
          className="v-dragger"
          onMouseDown={this.handleMouseDown.bind(this)}
          onMouseMove={this.handleMouseMove.bind(this)}
          onMouseUp={this.handleMouseUp.bind(this)}
          onMouseOut={this.handleMouseOut.bind(this)}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PassageList);
