import React from 'react'
import { Container, Carousel, Image } from 'react-bootstrap';
import {virtualworld } from "../../assets/images/user" 
import '../../styles/user/slider.scss';
import { t } from 'i18next';

const Slider = () => {
  return (
    <section className="road-map-section">   
   <Container> 
      <div className='title-block'>

         <h2>{t("roadmap")}</h2>
        </div>

         {/* slider */}
         <div className='slider_container'>
          <Image className='virtualworld_img' src={virtualworld} />
         <Carousel>
      <Carousel.Item>     
        <Carousel.Caption>
          <h3>{t("step1")}</h3>
         <ul>
          <li>{t("step1point1")}</li>
          <li>{t("step1point2")}</li>
          <li>{t("step1point3")}</li>
          <li>{t("step1point4")}</li>
          <li>{t("step1point5")}</li>
         </ul>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>  
      <Carousel.Caption>
          <h3>{t("step2")}</h3>
         <ul>
         <li>{t("step1point1")}</li>
          <li>{t("step1point2")}</li>
          <li>{t("step1point3")}</li>
          <li>{t("step1point4")}</li>
          <li>{t("step1point5")}</li>
         </ul>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
     
      <Carousel.Caption>
          <h3>{t("step3")}</h3>
         <ul>
         <li>{t("step1point1")}</li>
          <li>{t("step1point2")}</li>
          <li>{t("step1point3")}</li>
          <li>{t("step1point4")}</li>
          <li>{t("step1point5")}</li>
         </ul>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
     
      <Carousel.Caption>
          <h3>{t("step4")}</h3>
         <ul>
         <li>{t("step1point1")}</li>
          <li>{t("step1point2")}</li>
          <li>{t("step1point3")}</li>
          <li>{t("step1point4")}</li>
          <li>{t("step1point5")}</li>
         </ul>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
         {/* slider */}


   </Container>
   
   </section>
  )
}

export default Slider;
