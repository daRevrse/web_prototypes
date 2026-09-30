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

  // Formulaires de réservation -> Web3Forms (envoi e-mail, sans backend)
  document.querySelectorAll('form.js-resa').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var status=f.querySelector('.form-status');
      var btn=f.querySelector('[type=submit]');
      var key=(f.querySelector('[name=access_key]')||{}).value||'';
      if(status){status.style.display='block';}
      if(key.indexOf('VOTRE_CLE')===0){
        if(status){status.className='form-status err';status.textContent='⚠ Formulaire non configuré : collez votre clé Web3Forms (voir LISEZ-MOI-formulaire.txt).';}
        return;
      }
      var data=Object.fromEntries(new FormData(f).entries());
      if(status){status.className='form-status sending';status.textContent='Envoi en cours…';}
      if(btn){btn.disabled=true;}
      fetch('https://api.web3forms.com/submit',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(data)
      }).then(function(r){return r.json();}).then(function(j){
        if(j.success){
          status&&(status.className='form-status ok',status.textContent='✓ Merci ! Redirection en cours…');
          f.reset();
          window.location.href=f.getAttribute('data-redirect')||'merci.html';
        } else {
          status&&(status.className='form-status err',status.textContent='⚠ Envoi impossible. Réessayez ou appelez le +228 91 69 84 29.');
        }
      }).catch(function(){
        status&&(status.className='form-status err',status.textContent='⚠ Connexion impossible. Réessayez ou appelez le +228 91 69 84 29.');
      }).finally(function(){ if(btn){btn.disabled=false;} });
    });
  });
})();
