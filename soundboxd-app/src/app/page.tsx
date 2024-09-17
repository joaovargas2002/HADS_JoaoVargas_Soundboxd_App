"use client"

import Header from './components/Header/Header'
import MySwiper from './components/MySwiper/MySwiper';
import Title from './components/Title/Title';
import WhatsNew from './components/WhatsNew/WhatsNew';
import Profiles from './components/Profiles/Profiles';
import Footer from './components/Footer/Footer';

export default function Home() {

  return (
    <main className='bg-black'>

      <Header />
      <Title titleh1 ="Discover music around the world." subtitle="Theres a lot of music to be found. Checkout the lists down below."/>
      <MySwiper />
      <WhatsNew />
      <Profiles />
      <Footer />

    </main>
  );
}
