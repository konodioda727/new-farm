import React, { useState } from "react";
import { useLoad } from "@tarojs/taro";
import { View } from "@tarojs/components";
definePageConfig({
    navigationStyle:"custom",
    enableShareAppMessage: true,
    disableScroll: true
  })
export interface ArticleProps {
    name: string,
    imgurl: string,
    naviurl: string,
    context: string,
}
const Article: React.FC = () => {
    const [articleInfo, setarticleInfo] = useState()
    useLoad((props) => {
        const {} = props
    })
    return (
       <>
       <View className="article-wrap">
            <View className="article-top-wrap">
                <View className="article-title"></View>
                <View className="article-time"></View>
            </View>
            <View className="article-body"></View>
       </View>
       </>
    )
}
export default Article