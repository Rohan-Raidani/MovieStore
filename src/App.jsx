import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './App.css'
import gsap from 'gsap';
import Hero from './components/hero/Hero'
import Landing from './components/landing/Landing'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

function App() {
  const main = useRef();
  const sections = useRef();
  const ctx = useRef();

  useLayoutEffect(() => {
    ctx.current = gsap.context((self) => {
      sections.current = self.selector('.panel');
      const [firstSection, secondSection] = sections.current;

      // Set initial styles
      gsap.set(secondSection, { 
        autoAlpha: 0, 
        scale: 0.8, 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh'
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: firstSection,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          onLeave: () => gsap.to(window, { scrollTo: window.innerHeight, duration: 0.1 }),
          onLeaveBack: () => gsap.to(window, { scrollTo: 0, duration: 0.1 })
        }
      });

      tl.to(firstSection, {
        scale: 1.5,
        duration: 1
      })
      .to(firstSection, {
        autoAlpha: 0,
        duration: 0.5
      }, ">")
      .to(secondSection, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5
      }, "<");

    }, main);

    return () => ctx.current.revert();
  }, []);

  return (
    <main ref={main}>
      <section className="first panel"><Landing/></section>
      <section className="second panel"><Hero/></section>
    </main>
  )
}

export default App;