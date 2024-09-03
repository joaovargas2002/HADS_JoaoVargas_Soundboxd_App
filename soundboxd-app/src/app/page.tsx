import Header from './components/Header/Header'
import MySwiper from './components/MySwiper/MySwiper';
import Title from './components/Title/Title';
import WhatsNew from './components/WhatsNew/WhatsNew';

export default function Home() {
  return (
    <main className="">
      <Header />

      <Title />

      <MySwiper />
      
      <WhatsNew />
    </main>
  );
}
