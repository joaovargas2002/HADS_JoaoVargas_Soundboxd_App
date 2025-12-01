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
      <Title titleh1 ="Descubra música ao redor do mundo." subtitle="Há muita música para ser descoberta. Confira as listas abaixo." link=""/>
      <MySwiper />
      <WhatsNew />
      <Profiles />
      <Footer />

    </main>
  );
}
