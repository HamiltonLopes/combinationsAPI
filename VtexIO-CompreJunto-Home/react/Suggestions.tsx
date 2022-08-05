/* eslint-disable */
import React, { useEffect, useState } from 'react'
// import { useProduct } from 'vtex.product-context'
import { useQuery } from 'react-apollo'
import productsByIdentifier from './queries/productByIdentifier.graphql'
import { SliderLayout } from 'vtex.slider-layout'

import IconEqual from './icons/IconEqual'
import { IconPlusLines, Button } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedMessage, defineMessages } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'

import axios from 'axios'

const messages = defineMessages({
  title: {
    id: 'store/shelf.buy-together.title',
    defaultMessage: '',
  },
  totalProducts: {
    id: 'store/shelf.buy-together.total-products.label',
    defaultMessage: '',
  },
  changeLabel: {
    id: 'store/shelf.buy-together.change.label',
    defaultMessage: '',
  },
  removeLabel: {
    id: 'store/shelf.buy-together.remove.label',
    defaultMessage: '',
  },
  addLabel: {
    id: 'store/shelf.buy-together.add.label',
    defaultMessage: '',
  },
})

const CSS_HANDLES = [
  'buyTogetherContainer',
  'buyTogetherTitleContainer',
  'buyTogetherTitle',
  'buyTogetherProductContainer',
  'totalMessage',
  'totalValue',
]

function Suggestions() {
  const handles = useCssHandles(CSS_HANDLES)
  // const productContext: any = useProduct()
  // const melhoresCombinacoes = [54, 23, 2]

  const [ topCombinations, setTopCombinations ] = useState<any>([])
  const getData = async () => {
    await axios.get('http://localhost:3000/combinations-api/v1/store-top-combinations')
      .then(request => {
        setTopCombinations([parseInt(Object.keys(request.data.topStore['1'][0])[0]),
                            parseInt(Object.keys(request.data.topStore['1'][0])[1])])
      })
      .catch(e => console.log(`error topcombinations: ${e}`))
  }

  useEffect(() => {
    getData()
  }, [])

  const { data } = useQuery(productsByIdentifier, {
    variables: { field: 'sku', values: topCombinations }
  })
  
  // const [activeProductIndex, setActiveProductIndex] = useState<any>(0)
  // const [firstItemPrice, setFirstItemPrice] = useState<any>(
  //   productContext.product.items[0].sellers[0].commertialOffer.Price
  // )
  // const [secondItemPrice, setSecondItemPrice] = useState<any>(
  //   data?.productsByIdentifier[activeProductIndex].items[0].sellers[0]
  //     .commertialOffer.Price | 0
  // )

  // useEffect(() => {
  //   console.log('passei!!')
  //   setSecondItemPrice(
  //     data?.productsByIdentifier[activeProductIndex].items[0].sellers[0]
  //       .commertialOffer.Price
  //   )
  // }, [data])

  // useEffect(() => {
  //   setTotalPrice(firstItemPrice + secondItemPrice)
  // }, [firstItemPrice, secondItemPrice])

  // const [totalPrice, setTotalPrice] = useState<any>(
  //   firstItemPrice + secondItemPrice
  // )

  // console.log(data)
  // console.log(productContext)
  // const handleChangeProduct = () => {
  //   setActiveProductIndex((prev: any) => {
  //     if (prev < melhoresCombinacoes.length - 1) return prev + 1
  //     else return 0
  //   })
  // }

  return (
    !!data && (
      <div className={`flex-none tc ${handles.buyTogetherContainer}`}>
        <div className={`mv4 v-mid ${handles.buyTogetherTitleContainer}`}>
          <span className={`t-heading-3 ${handles.buyTogetherTitle}`}>
            <FormattedMessage {...messages.title} />
          </span>
        </div>
        <div className="tc nowrap mb3">
          
        </div>
        <SliderLayout 
        itemsPerPage={{
          desktop: 1,
          tablet: 1,
          phone: 1,
        }}
        showPaginationDots="never"
        infinite={true}
        >
        <div className={handles.buyTogetherProductContainer}>
        <img src="https://i.pinimg.com/736x/1c/92/a6/1c92a61c258957beefec7b0b42e8ef91.jpg" alt="Girl in a jacket" width="300" height="300"/>
          <div className="self-center ma5">
            <IconPlusLines size={30} />
          </div>
          <img src="https://i.pinimg.com/736x/1c/92/a6/1c92a61c258957beefec7b0b42e8ef91.jpg" alt="Girl in a jacket" width="300" height="300"/>
          <div className="self-center ma5">
            <IconEqual size={25} />
          </div>
          <div className="w-100 mh2 mh6-l w-20-l self-center">
            <div className={`mb5 ${handles.totalMessage}`}>
              <FormattedMessage {...messages.totalProducts} />
            </div>
            <div className={`mv5 ${handles.totalValue}`}>
              <FormattedCurrency value={0} />
            </div>
            <Button onClick={() => console.log(data)}>Adicionar ao Carrinho (teste)</Button>
          </div>
        </div>
        
        <div className={handles.buyTogetherProductContainer}>
        <img src="https://i.pinimg.com/736x/1c/92/a6/1c92a61c258957beefec7b0b42e8ef91.jpg" alt="Girl in a jacket" width="300" height="300"/>
          <div className="self-center ma5">
            <IconPlusLines size={30} />
          </div>
          <img src="https://i.pinimg.com/736x/1c/92/a6/1c92a61c258957beefec7b0b42e8ef91.jpg" alt="Girl in a jacket" width="300" height="300"/>
          <div className="self-center ma5">
            <IconEqual size={25} />
          </div>
          <div className="w-100 mh2 mh6-l w-20-l self-center">
            <div className={`mb5 ${handles.totalMessage}`}>
              <FormattedMessage {...messages.totalProducts} />
            </div>
            <div className={`mv5 ${handles.totalValue}`}>
              <FormattedCurrency value={0} />
            </div>
            <Button>Adicionar ao Carrinho</Button>
          </div>
        </div>

        <div className={handles.buyTogetherProductContainer}>
        <img src="https://i.pinimg.com/736x/1c/92/a6/1c92a61c258957beefec7b0b42e8ef91.jpg" alt="Girl in a jacket" width="300" height="300"/>
          <div className="self-center ma5">
            <IconPlusLines size={30} />
          </div>
          <img src="https://i.pinimg.com/736x/1c/92/a6/1c92a61c258957beefec7b0b42e8ef91.jpg" alt="Girl in a jacket" width="300" height="300"/>
          <div className="self-center ma5">
            <IconEqual size={25} />
          </div>
          <div className="w-100 mh2 mh6-l w-20-l self-center">
            <div className={`mb5 ${handles.totalMessage}`}>
              <FormattedMessage {...messages.totalProducts} />
            </div>
            <div className={`mv5 ${handles.totalValue}`}>
              <FormattedCurrency value={0} />
            </div>
            <Button>Adicionar ao Carrinho</Button>
          </div>
        </div>

        </SliderLayout>
      </div>
    )
  )
}

export default Suggestions
