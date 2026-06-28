/* ==========================================================================
   MENU RESPONSIVO
   ========================================================================== */
   const btnMobile = document.getElementById('btn-mobile');

   function toggleMenu(event) {
       if (event.type === 'touchstart') event.preventDefault();
       const nav = document.getElementById('nav');
       nav.classList.toggle('active');
       const active = nav.classList.contains('active');
       event.currentTarget.setAttribute('aria-expanded', active);
       if (active) {
           event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
       } else {
           event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
       }
   }
   
   btnMobile.addEventListener('click', toggleMenu);
   btnMobile.addEventListener('touchstart', toggleMenu);
   
   // Fechar menu ao clicar em um link
   const menuLinks = document.querySelectorAll('#menu a');
   menuLinks.forEach(link => {
       link.addEventListener('click', () => {
           document.getElementById('nav').classList.remove('active');
           btnMobile.setAttribute('aria-expanded', false);
       });
   });
   
   /* ==========================================================================
      HEADER SCROLL (Muda de cor ao rolar)
      ========================================================================== */
   const header = document.getElementById('header');
   
   window.addEventListener('scroll', () => {
       if (window.scrollY > 50) {
           header.classList.add('scrolled');
       } else {
           header.classList.remove('scrolled');
       }
   });
   
   /* ==========================================================================
      INTERSECTION OBSERVER (Animações ao rolar a página)
      ========================================================================== */
   // Timeline e Cards
   const observerOptions = {
       root: null,
       rootMargin: '0px',
       threshold: 0.1
   };
   
   const observer = new IntersectionObserver((entries, observer) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               entry.target.classList.add('show');
               observer.unobserve(entry.target);
           }
       });
   }, observerOptions);
   
   document.querySelectorAll('.timeline-item').forEach(item => {
       observer.observe(item);
   });
   
   /* ==========================================================================
      CONTADORES ANIMADOS
      ========================================================================== */
   const statsObserver = new IntersectionObserver((entries, observer) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               const target = +entry.target.getAttribute('data-target');
               const duration = 2000; // ms
               const increment = target / (duration / 16); // 60fps
               
               let current = 0;
               const updateCounter = () => {
                   current += increment;
                   if (current < target) {
                       entry.target.innerText = Math.ceil(current);
                       requestAnimationFrame(updateCounter);
                   } else {
                       entry.target.innerText = target;
                   }
               };
               
               updateCounter();
               observer.unobserve(entry.target);
           }
       });
   }, observerOptions);
   
   document.querySelectorAll('.stat-number').forEach(stat => {
       statsObserver.observe(stat);
   });
   
   /* ==========================================================================
      CARROSSEL AUTOMÁTICO
      ========================================================================== */
   const carouselInner = document.getElementById('carousel-inner');
   const items = document.querySelectorAll('.carousel-item');
   let currentIndex = 0;
   
   function nextSlide() {
       currentIndex = (currentIndex + 1) % items.length;
       carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
   }
   
   setInterval(nextSlide, 4000);
   
   /* ==========================================================================
      SIMULADOR FUNCIONAL
      ========================================================================== */
   const btnSimular = document.getElementById('btn-simular');
   
   btnSimular.addEventListener('click', () => {
       const tipo = document.getElementById('sim-tipo').value;
       const consumoStr = document.getElementById('sim-consumo').value;
       
       if (!consumoStr || isNaN(consumoStr) || consumoStr <= 0) {
           alert('Por favor, insira um consumo mensal válido.');
           return;
       }
       
       const consumoMensal = parseFloat(consumoStr);
       const consumoAnual = consumoMensal * 12;
       
       let geracaoPorTurbina = 0;
       
       // Valores fictícios para cálculo
       if (tipo === 'residencial') {
           geracaoPorTurbina = 1200; // kWh / ano
       } else {
           geracaoPorTurbina = 15000; // kWh / ano
       }
       
       const qtdTurbinas = Math.ceil(consumoAnual / geracaoPorTurbina);
       const geracaoAnualEstimada = qtdTurbinas * geracaoPorTurbina;
       
       // Tarifa fictícia média de R$ 0,90 por kWh
       const economia = consumoAnual * 0.90;
       
       document.getElementById('res-turbinas').innerText = qtdTurbinas;
       document.getElementById('res-geracao').innerText = geracaoAnualEstimada.toLocaleString('pt-BR');
       document.getElementById('res-economia').innerText = economia.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
       
       document.getElementById('sim-resultados').style.display = 'block';
   });
   
   /* ==========================================================================
      FORMULÁRIO DE CONTATO (WhatsApp)
      ========================================================================== */
   document.getElementById('contact-form').addEventListener('submit', function(e) {
       e.preventDefault();
   });

   function sendWhatsApp(destinatario) {
       const nome = document.getElementById('nome').value;
       const whatsapp = document.getElementById('whatsapp').value;
       const cidade = document.getElementById('cidade').value;
       const tipoProjeto = document.getElementById('tipo-projeto').value;
       const mensagem = document.getElementById('mensagem').value;
       
       if(!nome || !whatsapp || !cidade) {
           alert("Por favor, preencha todos os campos obrigatórios (Nome, WhatsApp, Cidade).");
           return;
       }
       
       let msgWhatsApp = `Olá! Gostaria de falar com um ${destinatario} da Wind Peace.%0A%0A`;
       msgWhatsApp += `*Nome:* ${nome}%0A`;
       msgWhatsApp += `*WhatsApp:* ${whatsapp}%0A`;
       msgWhatsApp += `*Cidade:* ${cidade}%0A`;
       msgWhatsApp += `*Tipo de Projeto:* ${tipoProjeto}%0A`;
       
       if (mensagem.trim() !== '') {
           msgWhatsApp += `*Mensagem:* ${mensagem}`;
       }
       
       const numero = '5543996159550';
       const url = `https://wa.me/${numero}?text=${msgWhatsApp}`;
       
       window.open(url, '_blank');
   }

   document.getElementById('btn-engenheiro').addEventListener('click', () => sendWhatsApp('Engenheiro Especialista'));
   document.getElementById('btn-vendedor').addEventListener('click', () => sendWhatsApp('Consultor de Vendas'));
