import { View, Input,  Image, Button } from '@tarojs/components'
import React, {useState, useRef} from 'react'
import Taro from '@tarojs/taro'
import Search from '../../component/search/index'
import farmStatJSON from '../../mockdata/farm-stat.json'
import commentJSON from '../../mockdata/comment.json'

export type chatList = {user: {name: string, imgurl: string}, value: string}
export type renderList = {address: string, stat: string, url: string} 
export interface chatProps {
    chats: chatList[]
}
export interface FarmListProps {
    renderList: renderList[]
}
export interface FarmItemProps {
    renderList: renderList,
    index: number
}
const Maintainer: React.FC = () => {
    const chatList: chatList[] = commentJSON
    const renderList: renderList[] = farmStatJSON
    return (<>
    <Search></Search>
    <View className='farm-wrap'>
        <View className='title' >农田</View>
        <FarmList renderList={renderList}></FarmList>
        <Chat chats={chatList}></Chat>
    </View>
    </>)
}
export default Maintainer

export const Chat: React.FC<chatProps> = (props) => {
    const [temp, settemp] = useState<chatList>({user:{name:"kbkbb",imgurl:"/images/custom/logo.png"},value:''})
    const {chats} = props
    const [chat, setchat] = useState<chatList[]>(chats)
    const handleClick = () => {
        setchat([...chat, temp])
    }
    const handleInput = (e) => {
        settemp({user:{name:"kbkbb",imgurl:"/images/custom/logo.png"},value:e.detail.value})
        // console.log('set');
    }
    return (<>
    <View className='title chat-top'>交流区</View>
    <View className='chatbox'>
        <View className='chat-comment'>
        {chat.map((item) => {
            return (
                <View className='chat-single'>
                    <View className='chat-photo'>
                        <Image className='chat-pic' src={item.user.imgurl}></Image>
                        {item.user.name}
                    </View>
                    <View className='chat-container'>{item.value}</View>
                </View>
            )
        })}
        </View>
        <View className='chat-text'>
            <Input className='chat-input' placeholder='快来发言吧' onInput={handleInput}></Input>
            <View className='chat-confirm' onClick={handleClick}>发送</View>
        </View>
    </View></>
    )
}
export const FarmList: React.FC<FarmListProps> = (props) => {
    const {renderList} = props
    return (<>
    <View className='farmclass'>
        <View className='farmbox'>
            {renderList.map((item,index) => {
                return <FarmItem renderList={item} index={index}></FarmItem>
            })}
        </View>
    </View></>
    )
}
export const FarmItem: React.FC<FarmItemProps> = (props) => {
    const {renderList,index} = props
    const {stat,address,url} = renderList
    let renderstat: string;
    stat.length > 19 ? renderstat = stat.slice(0,19) + ' ...' : renderstat = stat;
    const navi = () => {
        Taro.navigateTo({
            url: `./farmLand/index?index=${index}`
        })
    }
    return (
        <View className='farm-item' onClick={() => {navi()}}>
            <Image className='farm-photo' src={url}></Image>
            <View className='statbox'>
                <View className='stat-pos'>{address}</View>
                <View className='stat'>{renderstat}</View>
                <Image className='stat-pic' src='/images/custom/logo.png'></Image>
            </View>
        </View>
    )
}
