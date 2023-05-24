import React from "react";
import { WebView } from "@tarojs/components";

const Map: React.FC = () => {
    const url = 'https://map.lookvt.com/shibanyan'
    // const url = 'https://www.bilibili.com/'
    return (
        <>
        <WebView src={url}></WebView>
        </>
    )
}
export default Map