import React from "react";
import Taro from "@tarojs/taro";
import { Image } from "@tarojs/components";

 export default function Back() {
    return (
        <Image src={require("../../images/custom/back.png")} 
            onClick={() => {Taro.navigateBack()}}
            className="back-wrap"
        ></Image>
    )
}
