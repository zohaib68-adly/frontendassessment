import Image, { ImageProps } from 'next/image'
import React from 'react'

export const Icon = ({ ...props }: ImageProps) => {
    return (
        <Image {...props} alt={props.alt || 'icon'} width={props.width || 11} height={props.height || 11} unoptimized />
    )
}
