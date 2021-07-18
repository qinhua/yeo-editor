/*
 * @Author: BabyChin
 * @Date: 2021-06-11 11:29:37
 * @LastEditTime: 2021-06-12 22:49:25
 * @Description:
 */
import { Component } from "react";
import "./index.css";
interface PropType {
  [key: string]: any;
}
export default class SvgIcon extends Component<PropType> {
  render() {
    return (
      <span
        className={`x-svg-icon${
          this.props.customClass ? " " + this.props.customClass : ""
        }`}
      >
        <svg className="svg-icon" aria-hidden="true">
          <use xlinkHref={"#icon-" + this.props.name}></use>
        </svg>
      </span>
    );
  }
}
