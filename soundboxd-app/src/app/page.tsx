"use client"

import Header from './components/Header/Header'
import MySwiper from './components/MySwiper/MySwiper';
import Title from './components/Title/Title';
import WhatsNew from './components/WhatsNew/WhatsNew';
import Profiles from './components/Profiles/Profiles';
import Footer from './components/footer/footer';

export default function Home() {

  return (
    <main className='bg-black'>

      <Header />
      <Title />
      <MySwiper />
      <WhatsNew />
      <Profiles />
      <Footer />

    </main>
  );
}
