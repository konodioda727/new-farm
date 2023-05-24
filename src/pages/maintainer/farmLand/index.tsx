import React, { useState } from "react";
import Taro, {useLoad} from "@tarojs/taro";
import { View, Image, Swiper, SwiperItem } from "@tarojs/components"
import Back from "../../../component/back/index";
import farmJSON from '../../../mockdata/farm.json'
import Indicator from "../../../component/indicator";
definePageConfig({
    navigationStyle:"custom",
    enableShareAppMessage: true,
    disableScroll: true
  })
export type ProductList = {
    name: string, 
    imgurl: string[],
    price: number, 
    star: number,
    details: string,
    reason: string,
}
export type LandList = {
    name: string, 
    imgurl: string,
    productList: ProductList[]
}
export interface LandListProps {LandList: LandList}
export interface ProductListProps {Product: ProductList}

const FarmLand: React.FC = () => {
    const [Index, setIndex] = useState(0)
    useLoad((props) => {
        setIndex(props.index)
    })
    const LandList: LandList[] = farmJSON
    return (
        <>
        {/* 返回 */}
        <Back></Back>
        {/* 农田图 */}
        <View style={{position:'relative'}}>
            <Swiper 
                current={Index}
                className="farmLand-farmList-wrap"
                onChange={(res) => setIndex(res.detail.current)}>
                {LandList.map((item) => <LandWrap LandList={item}/>)}
            </Swiper>
            <Indicator swiperList={LandList} currentIndex={Index}/>
        </View>
        
        {/* 产品 */}
        <View className="farmLand-productList-title">产品列表</View>
        <View className="farmLand-productList-wrap">
            {LandList[Index].productList.map(item => <ProductList Product={item}></ProductList>)}
        </View>
        </>
    )
}
export default FarmLand

export const LandWrap: React.FC<LandListProps> = (props) => {
    const {name,imgurl} = props.LandList
    return (
        <SwiperItem className="farmLand-farmList-item">
            <Image src={ imgurl} style={{width:'100%',height:'100%', borderRadius:'20px'}}></Image>
            <View className="farmLand-farmList-hover">
                <View className="farmLand-farmList-hover-text">{name}</View>
            </View>
        </SwiperItem>
    )
}

export const ProductList: React.FC<ProductListProps> = (props) => {
    const {name,reason,details,imgurl,price,star} = props.Product
    const navi = () => {
        Taro.navigateTo({url:`../product/index?details=${details}&reason=${reason}&price=${price}&star=${star}&imgurl=${imgurl}&name=${name}`})
    }
    return (
        <View className="farmLand-productList-item" onClick={()=>navi()}>
            <Image className="farmLand-productList-item-pic" src={ imgurl[0]}></Image>
            <View className="farmLand-productList-item-name">{name}</View>
        </View>
    )
}