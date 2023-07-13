import React from "react";
import {Carousel} from 'react-bootstrap'
import CustomNav from "./CustomNav";



    function HomePage (){
        return (
            <>
            <CustomNav />
           
                <Carousel>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src="https://cdn.contexttravel.com/image/upload/c_fill,h_840,q_60/v1556306955/production/interest/image__1556306955.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Discover the world of foods in short time!</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src="https://static.trip101.com/main_pics/206047/medium.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>short time but a big foodie?</h3>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src="https://boutiquejapan.com/wp-content/uploads/2018/08/takoyaki-food-osaka-japan.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>See our posts!, you can foodie for 2 hours in one city!</h3>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src="https://pipandthecity.com/wp-content/uploads/2020/07/Bodelwyddan-Castle-20.jpg"
          alt="Fourth slide"
        />
        <Carousel.Caption>
          <h3>Foodie around the world!</h3>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
              
            </>

        )


    }


    export {HomePage}