import React, { useState, useEffect } from 'react';
import CarruselItem from './CarruselItem';



let Swiper = window.Swiper;

const CarruselItems = (props) => {

  const [ items, setItems ] = useState(props.items);

  useEffect(() => {
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 4,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }, [])

      const itemsList = items.map((item) =>
      <div className="swiper-slide" key={item.id}>
        <CarruselItem agregarProductoAlCarrito={props.agregarProductoAlCarrito} producto={item}/>
      </div>
      );


    return(
      <div className="swiper-container">
      <div className="swiper-wrapper">
        {
          itemsList
        }
      </div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
    );
}

export default CarruselItems;