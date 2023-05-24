import React, {useState} from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import { LandList } from '../maintainer/farmLand'
import farmJSON from '../../mockdata/farm.json'
import articleJSON from '../../mockdata/article.json'
import VRJSON from '../../mockdata/VR.json'
import Search from '../../component/search/index'
import Indicator from '../../component/indicator'
definePageConfig({
  navigationStyle:"custom",
  enableShareAppMessage: true,
})
export type renderlist = {name: string, naviurl: string, imgurl: string}
export interface VRProps {
  name: string,
  naviurl: string,
  imgurl: string
}
export interface HotProps {
  hotlist: LandList[]
}
export interface HotItemProps {
  hotitem: LandList,
  index: number
}
const Index: React.FC = () => {
  const articlelist: renderlist[] = articleJSON
  const LandList: LandList[] = farmJSON
  const hotlist:LandList[] = LandList
  const [currentIndex, setcurrentIndex] = useState(0)
  const onChange = (e) => {
    setcurrentIndex(e.detail.current)
    // console.log(e.detail.current);
    
  };
  
  return (
    <>
      <Search></Search>
      {/* VR */}
      <View className='VR-swiper-wrap'>

        {/* swiper */}
        <Swiper className='index-swiper-wrap'  onChange={onChange}>
          {VRJSON.map((item) => <SwiperItem className='index-swiper-item'><VR name={item.name} imgurl={item.imgurl} naviurl={item.naviurl}></VR></SwiperItem>)}
        </Swiper>

        {/* 导航点 */}
        <Indicator swiperList={VRJSON} currentIndex={currentIndex} style={{bottom:'10px !important'}}/>
      </View>

      {/* 热门 */}
      <View className='index-text' >今日热门</View>
      <Hot hotlist={hotlist}></Hot>

      {/* 有机知识 */}
      <View className='index-text'>有机知识</View>
    </>
  )
}
export default Index

export const Hot: React.FC<HotProps> = (props) => {
  const {hotlist} = props
  return (
    <>
    <View className='index-hot-wrap'>
      {hotlist.map((item, index) => <HotListItem hotitem={item} key={item.imgurl} index={index}></HotListItem>)}
    </View>
    </>
  )
}

export const HotListItem:React.FC<HotItemProps> = (props) => {
  const {hotitem,index} = props
  const {name,imgurl} = hotitem
  const navi = () => {
      Taro.navigateTo({
          url: `../maintainer/farmLand/index?index=${index}`
      })
  }
  return (
    <>
    <View className='index-hot-item' onClick={() => navi()}>
      <Image className='index-hot-pic' src={imgurl}></Image>
      <View className='index-hot-hover'>{name}</View>
    </View>
    </>
  )
}
export const VR: React.FC<VRProps> = (props) => {
  const {name, imgurl, naviurl} = props
  return (
    <>
      <View className='index-VR-wrap' onClick={() => {Taro.navigateTo({url:naviurl})}}>
        <View className='index-VR'>
          <Image src={imgurl} className='VR-img'/>
          <View className='index-VR-text'>{name}</View>
        </View>
      </View>
    </>
  )
}
export const Article: React.FC = () => {

  return (
    <>
    </>
  )
}