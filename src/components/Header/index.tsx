/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Author: BabyChin
 * @Date: 2021-06-11 11:02:35
 * @LastEditTime: 2021-07-22 00:46:32
 * @Description:
 */
import "./index.scss";
import { Component } from "react";
import { Menu, Avatar, Badge, Modal, Dropdown } from "antd";
import logo from "../../assets/imgs/logo.png";
import SvgIcon from "../../components/SvgIcon";
import { connect } from "react-redux";
import BraftEditor from "braft-editor";
import { createHtml, createMDHtml } from "../../utils/creatHtml";

import { withRouter } from "react-router";
import { saveAs } from "file-saver";
import domtoimage from "dom-to-image";
import moment from "moment";

import {
  togglePassage,
  togglePreview,
  toggleEditorType,
  updateEditorData,
  changeTheme,
} from "../../store/app";
const { confirm } = Modal;
const version = require("../../../package.json").version;
const { SubMenu } = Menu;

interface PropsType {
  [key: string]: any;
}
interface NavItem {
  label: string;
  value: string;
  key: string;
  icon?: string;
  url?: string;
  disabled?: boolean;
  child?: NavItem[];
}
interface StateType {
  navList: NavItem[];
  current: string;
  [key: string]: any;
}
const mapStateToProps = (state: any) => {
  return {
    userInfo: state.appReducer.userInfo,
    editorData: state.appReducer.editorData,
    editorType: state.appReducer.editorType,
    showPassage: state.appReducer.showPassage,
    showPreview: state.appReducer.showPreview,
    lastSave: state.appReducer.lastSave,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  changeEditor: (data: any) => dispatch({ ...changeEditor, payload: data }),
  togglePassage: (data: any) => dispatch({ ...togglePassage, payload: data }),
  togglePreview: () => dispatch(togglePreview),
  toggleEditorType: (data: any) =>
    dispatch({ ...toggleEditorType, payload: data }),
  updateEditorData: (data: string) => {
    dispatch({ ...updateEditorData, payload: data });
  },
  changeTheme: (data: any) => dispatch({ ...changeTheme, payload: data }),
});
const aboutConfig = {
  title: "YeoEditor",
  content: (
    <div className="about-content">
      <p>????????????markdown??????????????????????????????????????????</p>
      <p>???????????????????????????????????????????????????????????????????????????????????????</p>
      <p className="version">???????????????V{version}</p>
    </div>
  ),
  width: 428,
  closable: true,
};
// ????????????
const generateImg = (cb: any) => {
  const curEl = document.querySelector(".yeo-preview-wrapper") as HTMLElement;
  domtoimage
    .toBlob(curEl, {
      width: 2 * curEl!.offsetWidth,
      height: 2 * curEl!.offsetHeight + 400,
      bgcolor: "#fff",
      style: {
        transform: "scale(2)",
        transformOrigin: "top left",
        width: curEl?.offsetWidth + "px",
        height: curEl?.offsetHeight + "px",
      },
    })
    .then(function (blob: Blob) {
      cb && cb(blob);
    })
    .catch(function (error: any) {
      console.error("oops, something went wrong!", error);
    });
};

class Header extends Component<PropsType> {
  state: StateType = {
    navList: [
      {
        label: "??????",
        value: "1",
        key: "file",
        child: [
          {
            label: "??????",
            value: "1-1",
            key: "new",
          },
          {
            label: "??????",
            value: "1-2",
            key: "import",
          },
          {
            label: "??????MD",
            value: "1-3",
            key: "export-md",
          },
          {
            label: "??????PNG",
            value: "1-4",
            key: "export-png",
          },
          {
            label: "??????PDF",
            value: "1-5",
            key: "export-pdf",
          },
          {
            label: "??????HTML",
            value: "1-6",
            key: "export-html",
          },
        ],
      },
      {
        label: "?????????",
        value: "2",
        key: "editor",
        child: [
          {
            label: "MarkDown",
            value: "2-1",
            key: "markdown",
          },
          {
            label: "?????????",
            value: "2-2",
            key: "richtext",
          },
        ],
      },
      {
        label: "??????",
        value: "3",
        key: "theme",
        child: [
          {
            label: "??????",
            value: "3-1",
            key: "theme-light",
          },
          {
            label: "??????",
            value: "3-2",
            key: "theme-dark",
          },
          {
            label: "??????",
            value: "3-3",
            key: "theme-auto",
          },
        ],
      },
      {
        label: "??????",
        value: "4",
        key: "about",
        child: [
          {
            label: "??????",
            value: "4-1",
            key: "introduce",
          },
          {
            label: "github",
            value: "4-2",
            url: "https://github.con/qinhua",
            key: "github",
          },
        ],
      },
    ],
    current: "",
  };
  handleClick({ item, key, keyPath, domEvent }: any) {
    // console.log(item, key, keyPath, domEvent);
    const curItem = JSON.parse(item.props["data-item"]);
    console.log(curItem);
    this.setState({ current: key });
    ["markdown", "richtext"].includes(key) && this.props.toggleEditorType(key);
    key.includes("theme") && this.props.changeTheme(key);
    // key === "import" && Modal.info(aboutConfig);
    if (key === "new") {
      const that = this;
      if (this.props.editorData.value) {
        confirm({
          title: "????????????",
          content: "??????????????????????????????????????????????????????",
          okText: "??????",
          cancelText: "??????",
          onOk() {
            that.props.updateEditorData({ value: "" });
          },
        });
        return;
      }
      console.log("????????????");
    }
    // if (key === "save") {
    //   toggleArticleModal();
    // }
    if (key === "export-md") {
      const file = new File([this.props.editorData.value], `${Date.now()}.md`, {
        type: "text/markdown;charset=utf-8",
      });
      saveAs(file);
    }
    if (key === "export-png") {
      generateImg((blob: Blob) => {
        window.saveAs(blob, `${moment().format("YYYYMMDDHHmmss")}.png`);
      });
    }
    if (key === "export-pdf") {
      window.print();
    }
    if (key === "export-html") {
      let file;
      if (this.props.editorType === "richtext") {
        const html = createHtml(
          BraftEditor.createEditorState(this.props.editorData.value).toHTML(),
          this.props.editorData.value
        );
        file = new File([html], `${moment().format("YYYYMMDDHHmmss")}.html`, {
          type: "text/html;charset=utf-8",
        });
      } else {
        const doc = document.querySelector(
          ".yeo-preview-wrapper"
        ) as HTMLElement;
        const html = createMDHtml(doc.innerHTML, this.props.editorData.value);
        file = new File([html], `${moment().format("YYYYMMDDHHmmss")}.html`, {
          type: "text/html;charset=utf-8",
        });
      }
      saveAs(file);
    }
    key === "introduce" && Modal.info(aboutConfig);
    key === "github" && window.open(curItem.url);
  }
  handleUserClick(data: any) {
    if (data.key === "1") {
      console.log(this.props.history);
      this.props.history.push({ pathname: "/user" });
    }
  }
  openChange(data: any) {
    console.log(data);
  }
  clickLogo() {
    if (this.props.history.location.pathname === "/") return;
    this.props.history.replace({ pathname: "/" });
  }
  generateImg = (cb: any) => {
    const curEl = document.getElementById("js_preview");
    domtoimage
      .toBlob(curEl, {
        width: 2 * curEl!.offsetWidth,
        height: 2 * curEl!.offsetHeight + 400,
        bgcolor: "#fff",
        style: {
          transform: "scale(2)",
          transformOrigin: "top left",
          width: curEl?.offsetWidth + "px",
          height: curEl?.offsetHeight + "px",
        },
      })
      .then(function (blob: Blob) {
        cb && cb(blob);
      })
      .catch(function (error: any) {
        console.error("oops, something went wrong!", error);
      });
  };

  render() {
    const { userInfo, showPreview, lastSave, togglePreview } = this.props;
    return (
      <div className="yeo-header">
        <div className="logo-wrp">
          <img
            className="logo"
            src={logo}
            title="YeoEditor"
            alt="YeoEditor"
            onClick={this.clickLogo.bind(this)}
          />
          <canvas id="print-uuid" />
        </div>
        <Menu onClick={this.handleClick.bind(this)} mode="horizontal">
          {this.state.navList.map((item: NavItem) => {
            if (item.child) {
              return (
                <SubMenu
                  key={item.key}
                  data-item={JSON.stringify(item)}
                  title={item.label}
                >
                  {item.child.map((itm: NavItem) => {
                    return (
                      <Menu.Item
                        disabled={
                          itm.key === "export-md" &&
                          this.props.editorType !== "markdown"
                        }
                        key={itm.key}
                        data-item={JSON.stringify(itm)}
                      >
                        {itm.label}
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={item.key} data-item={JSON.stringify(item)}>
                  {item.label}
                </Menu.Item>
              );
            }
          })}
        </Menu>
        <span
          className={`btn-preview${showPreview ? " active" : ""}`}
          onClick={togglePreview}
          title={`${showPreview ? "??????" : "??????"}??????`}
        >
          <SvgIcon name="review" />
        </span>
        <div className="right-col">
          {lastSave && (
            <span
              className={`last-saving-time${!lastSave.success ? " fail" : ""}`}
            >
              {lastSave.success ? `??????????????????${lastSave.time}` : "????????????"}
            </span>
          )}
          <div className="user-con">
            <span className="avatar-item">
              <Badge dot>
                <Avatar
                  shape="square"
                  size="small"
                  src={userInfo.avatar}
                  icon={<SvgIcon name="user" />}
                />
              </Badge>
              <Dropdown
                overlay={
                  <Menu onClick={this.handleUserClick.bind(this)}>
                    <Menu.Item key="1">????????????</Menu.Item>
                    <Menu.Item key="2">????????????</Menu.Item>
                  </Menu>
                }
                placement="bottomCenter"
                arrow
              >
                <p>{userInfo.userName}</p>
              </Dropdown>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
