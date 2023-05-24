import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Input, Image } from "@tarojs/components";
import { LandList } from "src/pages/maintainer/farmLand";
import { ArticleProps } from "src/pages/passage";
import farmJSON from '../../mockdata/farm.json'
import articleJSON from '../../mockdata/article.json'

export interface ProductMoreProps {
    name: string,
    star: number,
    price: number,
    reason: string,
    details: string,
    imgurl: string[],
    from?: string
}
export interface suggestItemProps {
    name: string,
    naviurl: string,
    from?: string
}
const Search: React.FC = () => {
    const [InputValue, setInputValue] = useState('')
    const [result, setresult] = useState<boolean>(false)
    const [show, setshow] = useState(false)
    const [suggestionsLand, setsuggestionsLand] = useState<LandList[]>([])
    const [suggestionsProduct, setsuggestionsProduct] = useState<ProductMoreProps[]>([])
    const [suggestionsArticle, setsuggestionsArticle] = useState<ArticleProps[]>([])
    const handleHide = () => {
        setTimeout(() => {
            setshow(false)
        }, 600);
        
    }
    function encodeURI(uri) {
        const encodedURI = encodeURIComponent(uri);
        return encodedURI;
      }
    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setshow(true)
        // 防抖
        setTimeout(() => { 
            if ( e.target.value != InputValue && value) {
                setsuggestionsLand(farmJSON.filter((item) => item.name.includes(value)))
                setsuggestionsArticle(articleJSON.filter((item) => item.name.includes(value)))
                let productlist: any[] = [];
                farmJSON.map((item) => {
                    // console.log(item);
                    productlist =  [...productlist,...item.productList.filter((item) => item.name.includes(value))]
                    if (item.productList.filter((item) => item.name.includes(value)).length)
                    productlist[productlist.length-1]?productlist[productlist.length-1].from = item.name : ''
                })
                if(!farmJSON.filter((item) => item.name.includes(value)).length &&
                    !articleJSON.filter((item) => item.name.includes(value)).length &&
                    !productlist.length)
                        setresult(true)
                else 
                        setresult(false)
                setsuggestionsProduct(productlist)
            }
            if(value == '') {
                setsuggestionsProduct([])
                setsuggestionsArticle([])
                setsuggestionsLand([])
            } 
        },800)
        
    }
    return (
        <>
        <View className="search-wrap" style={{marginTop:Taro.getMenuButtonBoundingClientRect().top}}>
            <Image className="search-location-icon" src={require('../../images/custom/locationicon.png')}></Image>
            <View className="search-input-wrap">
                <Image className="search-icon" src={require("../../images/custom/searchicon.png")}></Image>
                <Input className="search-input" value={InputValue} onInput={handleChange} onBlur={handleHide} placeholder="输入关键字"></Input>
                {show && <View className="search-cover">
                    {suggestionsLand.map((item) => <SuggestItem name={item.name}  naviurl={`../../pages/maintainer/farmLand/index?index=${farmJSON.indexOf(item)}`}></SuggestItem>)}
                    {suggestionsProduct.map((item) => <SuggestItem name={item.name} from={item.from} naviurl={`../../pages/maintainer/product/index?details=${encodeURI(item.details)}&reason=${item.reason}&price=${item.price}&star=${item.star}&imgurl=${item.imgurl}&name=${encodeURI(item.name)}`}></SuggestItem>)}
                    {suggestionsArticle.map((item) => <SuggestItem name={item.name}  naviurl={`../../pages/maintainer/farmLand/index?index=0`}></SuggestItem>)}
                    {result && <SuggestItem name="暂时没有这方面的内容哦" naviurl=""></SuggestItem>}
                </View>}
            </View>
        </View>
        </>
    )
}
export default Search

export const SuggestItem: React.FC<suggestItemProps> = (props) => {
    const {name, naviurl, from} = props
    const handleClick = () => {
        // console.log('navi',naviurl);
        Taro.navigateTo({url: naviurl})
    }
    
    return (
        <>
        <View className="suggest-item-wrap" onClick={() => {handleClick()}}>
            <View className="suggest-item-name">{name}</View>
            <View className="suggest-item-detail">{from}</View>
        </View>
        </>
    )
}