// Dorikko — Le Brasier · comportements partagés
(function(){
  // Header : état compact au scroll
  var header=document.getElementById('header');
  if(header){
    var onScroll=function(){header.classList.toggle('solid',window.scrollY>40);};
    addEventListener('scroll',onScroll,{passive:true}); onScroll();
  }
  // Apparition au défilement
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el,i){
    el.style.transitionDelay=((i%3)*90)+'ms'; io.observe(el);
  });
  // Menu mobile
  var mob=document.getElementById('mobile'),
      burger=document.getElementById('burger'),
      mx=document.getElementById('mx');
  if(burger&&mob){burger.onclick=function(){mob.classList.add('open');};}
  if(mx&&mob){mx.onclick=function(){mob.classList.remove('open');};}
  if(mob){mob.querySelectorAll('a').forEach(function(a){a.onclick=function(){mob.classList.remove('open');};});}
})();
