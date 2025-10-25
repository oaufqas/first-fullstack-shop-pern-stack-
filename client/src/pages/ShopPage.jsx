import React, { useContext, useEffect } from "react";
import TypeBar from "../components/mainPage/typeBar.jsx";
import { Context } from "../main.jsx";
import { observer } from "mobx-react-lite";
import MainSection from "../components/mainPage/mainSection.jsx";
import AboutUsSection from "../components/mainPage/aboutUsSection.jsx";
import ContactsSection from "../components/mainPage/ContactsSection.jsx";
import '../components/mainPage/shopPage.css'
import { getTypes } from "../http/deviceApi.js";


const ShopPage = observer (() => {
  const {product} = useContext(Context)

  useEffect(() => {
    const gtTyps = async () => {
      try {
        const typeData = await getTypes();
        product.setTypes(typeData);
      } catch (e) {
        console.error(e);
      }
    };

    if (location.hash) {
      const anchor = location.hash.replace('#', '')
      const element = document.getElementById(anchor)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
          })
        }, 100)
      }
    }


    gtTyps();

    }, [location.hash, location.pathname])

  return (
    <div className="shop-page">
      <MainSection />
      <TypeBar />
      <AboutUsSection />
      <ContactsSection />
    </div>
  );
});

export default ShopPage