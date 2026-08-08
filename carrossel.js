document.addEventListener("DOMContentLoaded", () => {

    const imagensTopo = [
        'assets/feedbackGoogle/ANA FLÁVIA.png',
        'assets/feedbackGoogle/ANDERSON SILVA.png',
        'assets/feedbackGoogle/ANNE FRANCIS.png',
        'assets/feedbackGoogle/BUTECO DA ESQUINA.png',
        'assets/feedbackGoogle/DIEGO SILVA.png',
        'assets/feedbackGoogle/JUAREZ MEDEIROS.png',
        'assets/feedbackGoogle/JUNINHO.png',
        'assets/feedbackGoogle/KARLA CAROLINE.png',
        'assets/feedbackGoogle/LEONARDO PRADO.png',
        'assets/feedbackGoogle/PEDRO CICONELE.png',
        'assets/feedbackGoogle/RODRIGO NUNES.png',
    ];

    const imagensBase = [
        'assets/clients/BRASAL CHESS.png',
        'assets/clients/BUTECO.png',
        'assets/clients/Base.png',
        'assets/clients/COCO DA BAHIA.png',
        'assets/clients/CasaGrande.png',
        'assets/clients/DONNA FESTA.png',
        'assets/clients/DonJose.png',
        'assets/clients/Fiel.png',
        'assets/clients/Play.png',
        'assets/clients/Pratas da Casa.png',
        'assets/clients/TM Cup.png',
        'assets/clients/URCA GEELY.png',
        'assets/clients/URCA.png',
        'assets/clients/Unipac.png',
        'assets/clients/Unopar.png',
        'assets/clients/Zezao.png',
        'assets/clients/urca prime.png',
    ];

    // ==========================================
    // 1. LÓGICA DO TOPO (ROLETA 3D HORIZONTAL)
    // ==========================================

    const containerTopo = document.querySelector('.carrossel-container');
    if(containerTopo) containerTopo.innerHTML = ''; 

    // Cria as cartas no DOM
    const slidesTopo = imagensTopo.map(src => {
        const div = document.createElement('div');
        div.className = 'slide-item slide-hidden'; // Nascem escondidas
        div.style.backgroundImage = `url('${src}')`;
        div.style.backgroundSize = 'cover';
        div.style.backgroundPosition = 'left center';
        containerTopo.appendChild(div);
        return div;
    });

    let indexAtualTopo = 0;
    const totalTopo = slidesTopo.length;

    // A FUNÇÃO CORRIGIDA: Aplica uma classe exclusiva por vez
    function atualizarRoletaTopo() {
        slidesTopo.forEach((slide, i) => {
            if (i === indexAtualTopo) {
                slide.className = 'slide-item slide-centro'; // Vem pra frente
            } else if (i === (indexAtualTopo + 1) % totalTopo) {
                slide.className = 'slide-item slide-dir'; // Fica na direita aguardando
            } else if (i === (indexAtualTopo - 1 + totalTopo) % totalTopo) {
                slide.className = 'slide-item slide-esq'; // Vai pra esquerda depois de passar
            } else {
                slide.className = 'slide-item slide-hidden'; // Some no fundo
            }
        });
    }

    // Inicializa a primeira visão
    atualizarRoletaTopo();

    // Roda a roleta a cada 3 segundos
    setInterval(() => {
        if (totalTopo > 0) {
            indexAtualTopo = (indexAtualTopo + 1) % totalTopo;
            atualizarRoletaTopo();
        }
    }, 3000);


// ==========================================
    // 2. LÓGICA DA BASE (ESTEIRA AVANÇADA 4.0 - BULLETPROOF)
    // ==========================================
    
    const trackBase = document.getElementById('grid-base');
    trackBase.innerHTML = ''; 

    function criarCaixasBase(listaImagens) {
        listaImagens.forEach(src => {
            const box = document.createElement('div');
            box.className = 'box-branco';
            box.style.backgroundImage = `url('${src}')`;
            box.style.backgroundSize = '80%'; 
            box.style.backgroundRepeat = 'no-repeat';
            box.style.backgroundPosition = 'center';
            trackBase.appendChild(box);
        });
    }

    // PONTO 1: Criamos 5 clones da lista! (Blocos 0, 1, 2, 3 e 4)
    // Isso cria uma "pista" gigante pros dois lados, impossível bater na parede.
    criarCaixasBase(imagensBase);
    criarCaixasBase(imagensBase);
    criarCaixasBase(imagensBase);
    criarCaixasBase(imagensBase);
    criarCaixasBase(imagensBase);

    // Começa com a barra de rolagem cravada exatamente no Bloco 2 (o do meio)
    setTimeout(() => {
        const larguraUmBloco = trackBase.scrollWidth / 5;
        trackBase.scrollLeft = larguraUmBloco * 2;
    }, 100);

    // PONTO 4: Variáveis de controle super simplificadas (sem drag no mouse)
    let isInteragindo = false;
    let velocidadeScroll = 1; 
    let timeoutInteracao;

    // CELULAR: Pausa a animação apenas quando o dedo toca a tela
    trackBase.addEventListener('touchstart', () => {
        isInteragindo = true;
        clearTimeout(timeoutInteracao);
    }, { passive: true });

    // CELULAR: Volta a rodar sozinho 1.5s após soltar o dedo
    trackBase.addEventListener('touchend', () => {
        timeoutInteracao = setTimeout(() => isInteragindo = false, 1500);
    });

    // COMPUTADOR E CELULAR: Clique para centralizar a logo escolhida
    trackBase.addEventListener('click', (e) => {
        const box = e.target.closest('.box-branco');
        if (!box) return;
        
        isInteragindo = true;
        clearTimeout(timeoutInteracao);
        
        // Calcula o centro e rola suavemente até a logo
        const centroDaCaixa = box.offsetLeft + (box.offsetWidth / 2);
        const meioDaTela = trackBase.offsetWidth / 2;
        
        trackBase.scrollTo({
            left: centroDaCaixa - meioDaTela,
            behavior: 'smooth'
        });
        
        // Mantém pausado por 2 segundos para o cara ver a logo
        timeoutInteracao = setTimeout(() => isInteragindo = false, 2000);
    });


    // --- MOTOR DO SCROLL CONTÍNUO ---
    function autoScrollBase() {
        if (!isInteragindo) {
            trackBase.scrollLeft += velocidadeScroll;
        }

        const larguraUmBloco = trackBase.scrollWidth / 5;

        // SE ROLAR PRA DIREITA: Entrou no Bloco 4? Joga invisivelmente pro Bloco 3.
        if (trackBase.scrollLeft >= larguraUmBloco * 3) {
            trackBase.scrollLeft -= larguraUmBloco;
        } 
        // SE ROLAR PRA ESQUERDA: Invadiu o Bloco 1? Joga invisivelmente pro Bloco 2.
        else if (trackBase.scrollLeft <= larguraUmBloco) {
            trackBase.scrollLeft += larguraUmBloco;
        }
        
        requestAnimationFrame(autoScrollBase);
    }

    autoScrollBase();

    setInterval(() => {
        if (imagensBase.length > 0) {
            tracksBase.forEach((track, i) => {
                posBase[i] = moverEteleportarBase(track, posBase[i], imagensBase.length);
            });
        }
    }, 1800);

});