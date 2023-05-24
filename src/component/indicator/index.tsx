import React, { CSSProperties } from "react";
import Taro from "@tarojs/taro";
import {View} from "@tarojs/components"

export interface IndicatorProps {
    swiperList: any[],
    currentIndex: number,
    style?: CSSProperties
}
const Indicator:React.FC<IndicatorProps> = (props) => {
    const {currentIndex, swiperList, style} = props
    return (
        <>
         <View className='custom-indicator' style={style}>
          {swiperList.map((item, index) => (
            <View key={index} className={'indicator ' + ((currentIndex==index)?'indicator-active':'')}></View>
          ))}
        </View>
        </>
    )
}
export default Indicator