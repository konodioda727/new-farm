import React, { useState } from "react";
import {useLoad} from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import Back from "../../../component/back/index";

definePageConfig({
    navigationStyle:"custom",
    enableShareAppMessage: true,
    disableScroll: true
  })
export interface productInfo {
    name: string,
    star: number,
    price: number,
    reason: string,
    details: string,
    imgurl: string[],
    [key: string]: any;
}
export interface ProductInfoList {
    productInfo: productInfo
}
export interface ContainerProps {
    name?: string,
    style?: React.CSSProperties,
    children?: React.ReactNode,
    className?: string
}
const Product: React.FC = () => {
    const [productInfo , setproductInfo] = useState<productInfo>({
        name: '',
        star: 0,
        price: 0,
        reason: '',
        details: '',
        imgurl: ['']
    })
    useLoad((props) => {
        const {name,star,price,reason,details,imgurl} = props
        // console.log(imgurl.split(','));
        
        setproductInfo({
            name: name,
            star: star,
            price: price,
            reason: reason,
            details: details,
            imgurl: imgurl.split(',')
        })
    })
    return (
        <>
        {/* 返回 */}
        <Back></Back>
        {/* 图片部分 */}
        <ProductSwiperWrap productInfo={productInfo}/>
        {/* 信息部分 */}
        <ProductInfoWrap productInfo={productInfo}/>
        </>
    )
}
export default Product

export const ProductSwiperWrap: React.FC<ProductInfoList> = (props) => {
    const {productInfo} = props
    const {imgurl} = productInfo
    const [currentIndex, setcurrentIndex] = useState(0)
    const [previousTouchX, setPreviousTouchX] = useState(0);
    const handleClick = (e: number) => {setcurrentIndex(e)}
    const handleChange = (e) => {
        // setPreviousTouchX(e.touches[0].clientX);
        setcurrentIndex(e.detail.current)
        // console.log(e);
        
      };
      
      
    return (
        <>
        <View className="product-img-wrap">
            {/* 图片swiper */}
            <Swiper className="product-swiper-wrap" current={currentIndex} onChange={(e) => handleChange(e)} >
                {imgurl.map((item) => 
                <SwiperItem style={{marginRight: '3vw'}}>
                    <Image className="product-swiper-item" src={item}/>
                </SwiperItem>)}
            </Swiper>
            {/* 图片tabbar */}
            <View className="product-swiper-switch">
                {imgurl.map((item,index) => 
                <View className="product-swiper-wrap"  onClick={() => handleClick(index)}>
                    <View className={currentIndex == index ?"product-swiper-cover": 'product-swiper-cover-custom'}></View>
                    <Image 
                        src={item} 
                        className="product-swiper-switchcard">
                    </Image>
                </View>)}
            </View>
        </View>
        </>
    )
}

export const ProductInfoWrap: React.FC<ProductInfoList> = (props) => {
    const {productInfo} = props
    const {name,star, price, reason, details} = productInfo
    function decodeURI(encodedURI) {
        const decodedURI = decodeURIComponent(encodedURI);
        return decodedURI;
      }
    return (
        <>
        <ProductInfoContainer className="product-info-wrap">
            <View className="product-name">{decodeURI(name)}</View>
            <View className="product-info-wrap-top">
                <ProductInfoContainer className="product-price"><View className="price">${price}</View></ProductInfoContainer>
                <View className="product-star-wrap">
                    <View className="product-star-text">推荐</View>
                    <View className="product-star">
                        <View className="product-star-cover" style={`width:${star * 5.84}vw`}></View>
                        <Image src={require('../../../images/product/stars.png')} className="product-star-inner"></Image>
                    </View>
                </View>
                
            </View>
            <ProductInfoContainer name="产品细节" className="product-details">{decodeURI(details)}</ProductInfoContainer>
        </ProductInfoContainer>
        </>
    )
}

export const ProductInfoContainer: React.FC<ContainerProps> = (props) => {
    const {name, className, style, children} = props
    return (
        <View className={className + ' product-container'} style={style}>
            {name && <View className="container-title">{name}</View>}
            <View className="container-context">{children}</View>
        </View>
    )
}