"use client";
import React from 'react'
import Image from 'next/image'
import { CustomButton } from '.'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
                Find, book or rent a car quickly and easily!
            </h1>

            <p className="hero__subtitle">
                Drive Your Adventure: Rent Your Perfect Ride Today!
            </p>

            <CustomButton 
                title="Explore Cars"
                containerStyles="bg-primary-blue text-white rounded-full mt-10"
            />
        </div>

        <div className="hero__image-container">
            <div className="hero__image">
                <Image
                    src="/hero.png"
                    alt='hero'
                    fill
                    priority // Optimize LCP: Hints browser to preload this image
                    sizes="(max-width: 1280px) 90vw, (max-width: 1440px) 60vw, 864px" // Optimize LCP: Helps browser select correct image size based on layout
                    className='object-contain'
                />
            </div>
            <div className='hero__image-overlay' />
        </div>
    </div>
  )
}

export default Hero