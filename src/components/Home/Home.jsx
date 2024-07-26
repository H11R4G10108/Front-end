import Navbar from "../../components/Navbar/Navbar";
import Productpage from "../../components/ProductPage/Productpage";
import Footer from "../../components/Footer/Footer";
import React, { useState, useEffect } from "react";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import pic4 from "../../assets/pic4.png";
import pic3 from "../../assets/pic3.png";
import pic1 from "../../assets/pic1.png";

function Home() {
  return (
    <div className="App">
      <Navbar />
      <div className="sm:h-44 md:h-1/2">
      <Carousel autoplay="true" loop="true">
        <div className="relative h-full w-full">
          <img
            src={pic1}
            alt="image 1"
            className="h-1/2 w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full">
            <div className="w-2/4 md:w-2/4 md:pl-20 lg:pl-20 mt-60">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl text-white font-bold">ONLINE SHOPPING</h1> 
                <a
                  href="#productpage"
                  className="px-4 py-2 w-2/4 text-white bg-transparent border text-center border-white"
                >
                  SHOP NOW
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
          <img
            src={pic3}
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full">
            <div className="w-2/4 md:w-2/4 md:pl-20 lg:pl-20 mt-60">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl text-white font-bold">ONLINE SHOPPING</h1> 
                <a
                  href="#productpage"
                  className="px-4 py-2 w-2/4 text-white bg-transparent border text-center border-white"
                >
                  SHOP NOW
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
          <img
            src={pic4}
            alt="image 3"
            className="h-full w-full object-cover"
          />
        </div>
      </Carousel>
      </div>

      <div id="productpage" className="mt-10">
        <Productpage/>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
