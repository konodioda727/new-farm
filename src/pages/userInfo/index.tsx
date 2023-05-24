import { View, Image } from '@tarojs/components'
import React from 'react'
// import  '../../images/userinfo/mine.png'
// import  '../../images/userinfo/store.png'
// import  '../../images/userinfo/figure.png'
// import  '../../images/userinfo/alert.png'

export type editList = {name: string, photo: string}
export interface EditInfoProps {
    editObj: editList
}

const UserInfo: React.FC = () => {
    const editList: editList[] = [
        {name:'我的认养', photo: 'mine'},
        {name:'我的收藏', photo: 'store'},
        {name:'我的形象', photo: 'figure'},
        {name:'通知设置', photo: 'alert'},
    ]
    return (<>
        <View className='info-section'>
            <Image className='info-photo' src={require('../../images/custom/logo.png')}/>
            <View className='info-nickname'>nickname</View>
            <View className='info-edit-button'>
                <Image src={require('../../images/userinfo/edit-photo.png')} className='info-edit-button-image'/>
                <View className='info-edit-button-text'>个人信息</View>
            </View>
        </View>

        <View className='info-edit-section'>
            {editList.map((item) => <InfoEdit editObj={item}></InfoEdit>)}
        </View>
    </>)
}
export default UserInfo

export const InfoEdit: React.FC<EditInfoProps> = (props) => {
    const { editObj } = props
    return (
        <View className='info-edit-wrap'>
            <View className='info-edit-text'>{editObj.name}</View>
            <Image className='info-edit-photo' src={require('../../images/userinfo/' + editObj.photo + '.png')}/>
        </View>
    )
}
