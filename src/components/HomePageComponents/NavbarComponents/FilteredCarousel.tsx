'use client'

import { useEffect, useState } from 'react'
import FilterBar from './FilterBar'
import CardCarousel from './CardCarousel'
import jsonData from '../../../data/Navbar.json'

interface ImageData {
  name?: string
  src: string
}

export default function FilteredCarousel() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredImages, setFilteredImages] = useState<ImageData[]>([])

  useEffect(() => {
    const allImages: ImageData[] = []

    jsonData.forEach((section) => {
      section.Details.forEach((detail) => {
        detail.images.forEach((img) => {
          if (
            selectedCategory === 'All' ||
            img.name?.toLowerCase().includes(selectedCategory.toLowerCase())
          ) {
            allImages.push(img)
          }
        })
      })
    })

    setFilteredImages(allImages)
  }, [selectedCategory])

  return (
    <div className='px-4 max-w-7xl mx-auto'>
      <FilterBar selected={selectedCategory} onSelect={setSelectedCategory} />
      <CardCarousel images={filteredImages} imageSize='contain' />
    </div>
  )
}