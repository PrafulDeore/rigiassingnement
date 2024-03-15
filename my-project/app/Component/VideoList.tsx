import React, { useEffect, useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import { videoData } from '../videoData';
import Image from 'next/image';

interface IVideoData {
    description: string;
    sources: string[];
    subtitle: string;
    thumb: string | any;
    title: string;
}

interface IItem {
    item: IVideoData;
    index: number;
}

interface ISortableElementType {
    value: IVideoData;
    isActive: boolean;
    onclick: () => void
}

interface IVideoList {
    setActiveData?: (_e: IVideoData | any) => void;
}

const HandleDrag = SortableHandle(() => (
    <span className='p-[20px] text-[20px]'>::</span>
));

const SortableItem = SortableElement<ISortableElementType>(({ value, isActive, onclick }: ISortableElementType) => (
    <li className={`border border-darkBlue flex justify-start items-center gap-x-[15px] cursor-pointer ${isActive ? 'bg-darkBlue' : ''}`} onClick={() => onclick()}>
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

const SortableList :any  = SortableContainer(({ children }: { children: JSX.Element[] }) => (
    <ul>{children}</ul>
));

export const VideoList = ({ setActiveData }: IVideoList) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [sortedData, setSortedData] = useState<IVideoData[]>(videoData);

    const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
        const updatedData = arrayMove(sortedData, oldIndex, newIndex);
        setSortedData(updatedData);
    };

    useEffect(() => {
        setActiveData && setActiveData(sortedData[0]);
        setActiveIndex(0);
    }, [sortedData]);

    const handleItemClick = ({ item, index }: IItem) => {
        setActiveData && setActiveData(item);
        setActiveIndex(index);
    };

    return (
        <div className='h-[700px] overflow-scroll'>
            <SortableList onSortEnd={onSortEnd} useDragHandle>
                {sortedData.map((item, index) =>
                (
                    // <div key={`item-${item?.title}` } onClick={() => handleItemClick({ item, index })} >

                    <SortableItem key={`item-${item?.title}`} index={index} value={item} isActive={index === activeIndex} onclick={() => handleItemClick({ item, index })} />
                    // </div>
                ))}
            </SortableList>
        </div>
    );
};
