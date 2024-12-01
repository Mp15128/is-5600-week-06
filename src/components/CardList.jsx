import Card from './Card'
import Button from './Button';
import React,{useState, useEffect} from "react";
import Search from './Search';

const CardList = ({data}) => {

  const limit = 10;
  const defaultDataset = data.slice(0, limit);
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(defaultDataset);

  const [buttonStatus, setButtonStatus] = useState(false);

  const handlePrevious = () => {
    setOffset(offset - limit);
}

  const handleNext = () => {
  setOffset(offset + limit);
}

useEffect(() => {
  setProducts(data.slice(offset, offset + limit));
}, [offset, limit, data]);

const filterTags=(tagQuery)=>{
  const filtered=data.filter(product=>{
    if(!tagQuery){
      return product
    }
    return product.tags.find(({title})=>title===tagQuery)
  })
  setOffset(0)
  setProducts(filtered)
}



  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags}/>
      <div className="mt2 mb2">
        {products && products.map((product)  => (
          <Card key = {product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">   
        <Button disabled={buttonStatus}text="Previous"handleClick={()=>(offset==0)?setButtonStatus=true:setOffset(offset-10)}/>
          <Button disabled={buttonStatus}text="Next"handleClick={()=>(offset>(Math.floor(data.length/10)*10)-1)?setButtonStatus=true:setOffset(offset+10)}/>
          }
      </div>
    </div>
  )     
}

export default CardList;