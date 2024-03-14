import React, { useEffect, useState } from 'react'
import { SortEndHandler, SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc'
import { videoData } from '../videoData'
import Image from 'next/image';

interface IVideoData {
    description: string;
    sources: string[];
    subtitle: string;
    thumb: string | any; // Adjust the type of thumb to accept either string or StaticImageData
    title: string;

}
interface IItem {
    item: IVideoData


}

interface ISortableElemtType {
    value: IVideoData

}
interface IVideoList {
    setActiveData?: (_e: any) => void
}

interface ISortableContainerType {
    children: JSX.Element[];
}
const HandleDrag = SortableHandle(({ link }: any) => (
    <span className=' p-[20px] text-[20px]'>::</span>
));



const SortableItem = SortableElement<ISortableElemtType>(({ value }: ISortableElemtType) => (
    <li className='border flex justify-start items-center gap-x-[15px] cursor-pointer '>
        <HandleDrag />
        <Image
            src={value?.thumb}
            alt="thumb"
            className="my-[20px] rounded-[5px] h-14 w-14"
        />
        <div className='flex flex-col'>

            <span className='font-semibold text-[22px]'>{value?.title}</span>

            <span className='font-semibold text-[18px] text-textGray'>{value?.subtitle}</span>
        </div>
    </li>
));

const SortableDiv = SortableContainer<ISortableContainerType>(({ children }: ISortableContainerType) => {
    return <ul>{children}
    </ul>
})

export const VideoList = ({ setActiveData }: IVideoList) => {


    const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
        const titles = videoData.map(item => item.title)
        const movedTitles = arrayMove(titles, oldIndex, newIndex)
        const updatedVideoData = movedTitles.map(title => videoData.find(item => item.title === title))
        console.log(updatedVideoData)
    }

    useEffect(() => {
        setActiveData && setActiveData(videoData[0])
    }, [])



    
    const handleItemClick = ({item}: IItem) => {
        console.log("handleItemClick", item);
        setActiveData && setActiveData(item)

    }
    return (
        <SortableDiv onSortEnd={onSortEnd} useDragHandle >
            {videoData?.map((item, index) => {
                return (
                    <div key={`item-${item?.title}`} onClick={() => handleItemClick({item})}>
                        <SortableItem index={index} value={item} />
                    </div>
                )
            }
            )}
        </SortableDiv>
    )
}

