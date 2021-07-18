/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Author: BabyChin
 * @Date: 2021-06-11 11:02:35
 * @LastEditTime: 2021-07-18 16:15:59
 * @Description:
 */
import "./index.scss";
import { Component } from "react";
import { Menu, Avatar, Badge, Modal, Dropdown } from "antd";
import logo from "../../assets/imgs/logo.png";
import SvgIcon from "../../components/SvgIcon";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  togglePassage,
  togglePreview,
  toggleEditorType,
  updateEditorData,
  changeTheme,
} from "../../store/app";
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
    editorType: state.appReducer.editorType,
    showPassage: state.appReducer.showPassage,
    showPreview: state.appReducer.showPreview,
    lastSave: state.appReducer.lastSave,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
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
      <p>一个基于markdown和富文本的轻量级文档编辑器。</p>
      <p>提供在线文档编写、实时预览、导入导出等功能，自动同步保存。</p>
      <p className="version">当前版本：V{version}</p>
    </div>
  ),
  width: 428,
  closable: true,
};
class Header extends Component<PropsType> {
  state: StateType = {
    navList: [
      {
        label: "文件",
        value: "1",
        key: "file",
        child: [
          {
            label: "新建",
            value: "1-1",
            key: "new",
          },
          {
            label: "导入",
            value: "1-2",
            key: "import",
          },
          {
            label: "导出MD",
            value: "1-3",
            key: "export-md",
          },
          {
            label: "导出PNG",
            value: "1-4",
            key: "export-png",
          },
          {
            label: "导出PDF",
            value: "1-5",
            key: "export-pdf",
          },
          {
            label: "导出HTML",
            value: "1-6",
            key: "export-html",
          },
        ],
      },
      {
        label: "编辑器",
        value: "2",
        key: "editor",
        child: [
          {
            label: "MarkDown",
            value: "2-1",
            key: "markdown",
          },
          {
            label: "富文本",
            value: "2-2",
            key: "richtext",
          },
        ],
      },
      {
        label: "主题",
        value: "3",
        key: "theme",
        child: [
          {
            label: "浅色",
            value: "3-1",
            key: "theme-light",
          },
          {
            label: "暗黑",
            value: "3-2",
            key: "theme-dark",
          },
          {
            label: "自动",
            value: "3-3",
            key: "theme-auto",
          },
        ],
      },
      {
        label: "关于",
        value: "4",
        key: "about",
        child: [
          {
            label: "简介",
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
    // if (key === "save") {
    //   toggleArticleModal();
    // }
    // if (key === "export-md") {
    //   const file = new File([markdown], `${Date.now()}.md`, {
    //     type: "text/markdown;charset=utf-8",
    //   });
    //   // saveAs(file);
    // }
    // if (key === "export-png") {
    //   generateImg((blob: Blob) => {
    //     window.saveAs(blob, `${moment().format("YYYYMMDDHHmmss")}.png`);
    //   });
    // }
    // if (key === "export-html") {
    //   let file;
    //   if (isRichText) {
    //     const html = createHtml(
    //       BraftEditor.createEditorState(richText).toHTML(),
    //       article
    //     );
    //     file = new File([html], `${moment().format("YYYYMMDDHHmmss")}.html`, {
    //       type: "text/html;charset=utf-8",
    //     });
    //   } else {
    //     const doc = document.querySelector(
    //       ".for-markdown-preview"
    //     ) as HTMLElement;
    //     const html = createMDHtml(doc.innerHTML, article);
    //     file = new File([html], `${moment().format("YYYYMMDDHHmmss")}.html`, {
    //       type: "text/html;charset=utf-8",
    //     });
    //   }
    //   // saveAs(file);
    // }
    if (key === "export-pdf") {
      window.print();
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
                      <Menu.Item key={itm.key} data-item={JSON.stringify(itm)}>
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
          title={`${showPreview ? "关闭" : "打开"}预览`}
        >
          <SvgIcon name="review" />
        </span>
        <div className="right-col">
          {lastSave && (
            <span
              className={`last-saving-time${!lastSave.success ? " fail" : ""}`}
            >
              {lastSave.success ? `最后保存于：${lastSave.time}` : "保存失败"}
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
                    <Menu.Item key="1">个人中心</Menu.Item>
                    <Menu.Item key="2">退出登录</Menu.Item>
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