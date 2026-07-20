document.addEventListener("DOMContentLoaded", () => {

    const imagensTopo = [
        'assets/google-reviews/ANA FLÁVIA.png',
        'assets/google-reviews/ANDERSON SILVA.png',
        'assets/google-reviews/ANNE FRANCIS.png',
        'assets/google-reviews/BUTECO DA ESQUINA.png',
        'assets/google-reviews/DIEGO SILVA.png',
        'assets/google-reviews/JUAREZ MEDEIROS.png',
        'assets/google-reviews/JUNINHO.png',
        'assets/google-reviews/KARLA CAROLINE.png',
        'assets/google-reviews/LEONARDO PRADO.png',
        'assets/google-reviews/PEDRO CICONELE.png',
        'assets/google-reviews/RODRIGO NUNES.png',
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
        'assets/clients/Pratas da Casa.png',
        'assets/clients/TM Cup.png',
        'assets/clients/URCA GEELY.png',
        'assets/clients/URCA.png',
        'assets/clients/Unipac.png',
        'assets/clients/Unopar.png',
        'assets/clients/Zezao.png',
        'assets/clients/toro.png',
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
    // 2. LÓGICA DA BASE (DESLIZE HORIZONTAL CONTÍNUO)
    // ==========================================
    
    function popularTrackBase(trackElement, listaImagens) {
        if (!trackElement || listaImagens.length === 0) return;
        trackElement.innerHTML = '';

        listaImagens.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            trackElement.appendChild(img);
        });

        // CLONE para loop
        const clone = document.createElement('img');
        clone.src = listaImagens[0];
        trackElement.appendChild(clone);
    }

    const tracksBase = document.querySelectorAll('#grid-base .slider-track');
    tracksBase.forEach(track => popularTrackBase(track, imagensBase));

    let posBase = [0, 1 % imagensBase.length, 2 % imagensBase.length];

    function aplicarPosicoesIniciaisBase() {
        tracksBase.forEach((track, i) => {
            track.style.transform = `translateX(-${posBase[i] * 100}%)`;
        });
    }
    
    aplicarPosicoesIniciaisBase();

    function moverEteleportarBase(trackElement, indexAtual, totalImagens) {
        if (!trackElement) return (indexAtual + 1) % totalImagens;

        const proximoIndex = indexAtual + 1;
        const shiftPercent = -(proximoIndex * 100);

        trackElement.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        trackElement.style.transform = `translateX(${shiftPercent}%)`;

        if (proximoIndex === totalImagens) {
            setTimeout(() => {
                trackElement.style.transition = 'none';
                trackElement.style.transform = 'translateX(0%)';
            }, 600);
            return 0;
        }
        return proximoIndex;
    }

    setInterval(() => {
        if (imagensBase.length > 0) {
            tracksBase.forEach((track, i) => {
                posBase[i] = moverEteleportarBase(track, posBase[i], imagensBase.length);
            });
        }
    }, 1800);

});