import React from 'react'
import { LazyLoadImage as Image } from 'react-lazy-load-image-component'


export default function LazyLoadImage({ onClick, Alt, height, src, width, className }) {
    return (
        <div>
            <Image
                onClick={onClick}
                alt={Alt}
                height={height}
                src={src}
                width={width}
                className={className}
            />
        </div>
    )
}
