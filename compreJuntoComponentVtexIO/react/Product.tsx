/* eslint-disable */

import React, { useState } from 'react'
import { Button } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

interface teste {
  product: any
  setPrice: (params: any) => any
}

interface sku {
  productId: number
  btnId: any
  image: string
  price: any
  info: string
}

const CSS_HANDLES = [
  'productName',
  'productPrice',
  'productImage',
  'productImageContainer',
  'productInfo',
  'productButtonUnavailable',
  'productButtonAvailable',
  'productButtonContainer',
]

function Product({ product, setPrice }: teste) {
  const handles = useCssHandles(CSS_HANDLES)

  const createMask = (num: any) => {
    let value = 'R$ ' + num
    if (value.split('.')[1]) {
      if (value.split('.')[1].length === 1) value += '0'
      value = value.replace('.', ',')
    } else {
      value += ',00'
      value = value.replace('.', '')
    }
    return value
  }

  const skuMount = (index: number, btnId: any) => {
    return {
      btnId,
      productId: product.productId,
      price: createMask(product.items[index].sellers[0].commertialOffer.Price),
      image: product.items[index].images[0].imageUrl,
      info: `Em até ${product.items[index].sellers[0].commertialOffer.Installments[2]
          .NumberOfInstallments
        }x ${createMask(
          product.items[index].sellers[0].commertialOffer.Installments[2].Value
        )}, ${product.items[index].sellers[0].commertialOffer.Installments[2]
          .InterestRate
        }% de juros.`,
    }
  }

  const [activeSku, setActiveSku] = useState<sku>(skuMount(0, null))

  if (activeSku.productId !== product.productId) {
    setActiveSku(skuMount(0, null))
    setPrice(product.items[0].sellers[0].commertialOffer.Price)
  }

  const handleChangeSku = (index: number, e: any) => {
    e.preventDefault()
    setActiveSku(skuMount(index, e.currentTarget.id))
    setPrice(product.items[index].sellers[0].commertialOffer.Price)
  }

  return (
    <div className="w-100 w-20-l">
      <div className={`${handles.productImageContainer}`}>
        <img className={`${handles.productImage}`} src={activeSku.image} />
      </div>
      <div className={`${handles.productName}`}>{product.productName}</div>
      <div className={`${handles.productPrice}`}>{`${activeSku.price}`}</div>
      <div className={`${handles.productButtonContainer}`}>
        {product.items.length > 1 &&
          product.items.map((sku: any, index: number) => (

            <Button
              variation="primary"
              size="small"
              id={`button${index}`}
              type="button"
              key={index}
              onClick={
                sku.sellers[0].commertialOffer.AvailableQuantity > 0
                  ? (e: any) => handleChangeSku(index, e)
                  : (e: any) => e.preventDefault()
              }
              disabled={
                sku.sellers[0].commertialOffer.AvailableQuantity > 0
                  ? false
                  : true
              }
            >
              {sku.name}
            </Button>
          ))}
      </div>
    </div>
  )
}

export default Product
