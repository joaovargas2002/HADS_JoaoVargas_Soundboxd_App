import Header from './components/Header/Header'

import MySwiper from './components/MySwiper/MySwiper';

export default function Home() {
  return (
    <main className="bg-brand-primary flex flex-col items-center justify-between">
      <Header />

      <MySwiper />
    </main>
  );
}
