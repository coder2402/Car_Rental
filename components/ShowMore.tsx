"use client"
import React from 'react'
import { useRouter } from "next/navigation";
import { ShowMoreProps } from '@/types';
import { updateSearchParams } from '@/utils';
import { CustomButton } from '.';

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
    const router = useRouter();
    const handleNavigation = () => {
        const newLimit = (pageNumber + 1) * 10;
        const newPathname = updateSearchParams("limit", `${newLimit}`);
        
        // Optimization: prevent layout shift and unnecessary top-scroll when fetching new pages
        router.push(newPathname, { scroll: false });
      };

  return (
    <div className="w-full flex-center gap-5 mt-10">
        {!isNext && (
        <CustomButton
          btnType="button"
          title="Show More"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  )
}

export default ShowMore