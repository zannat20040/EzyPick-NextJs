import ProductDetails from '@/_ClientSideComponents/Shared/ProductDetails'
import { BreadCrumbsComp } from '@/_components/shared/BreadCrumbsComp'
import React from 'react'

export default function page({params}) {
    const {title, pid} = params
    const id = pid.replace('pid-','')
    
    
  return (
    <div>
      <BreadCrumbsComp />
      <ProductDetails id={id} />
    </div>
  )
}
