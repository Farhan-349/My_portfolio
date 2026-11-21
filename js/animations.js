function initAnimations(){
 if(matchMedia('(prefers-reduced-motion:reduce)').matches||typeof gsap==='undefined')return;
 gsap.registerPlugin(ScrollTrigger);
 gsap.from('.hero-copy > *',{y:40,opacity:0,stagger:.12,duration:.9,delay:.5,ease:'power3.out'});
 document.querySelectorAll('.reveal').forEach(e=>gsap.from(e,{y:40,opacity:0,duration:.8,ease:'power3.out',scrollTrigger:{trigger:e,start:'top 88%',once:true}}));
}
