import Hero from '../components/hero';

export const metadata = {
  title: "DuDu - Portfolio",
  description: "Welcome to my portfolio website",
};

export default function Home() {
  return (
    <section className="flex flex-col min-h-screen text-gray-600 body-font">
      <div className="container flex flex-col items-center px-5 py-24 mx-auto md:flex-row">
        <Hero />
      </div>
    </section>
  );
}
