document.addEventListener("DOMContentLoaded", () => {

    const imagensTopo = [
        'assets/google-reviews/Prints/Ana Flávia.jpeg',
        'assets/google-reviews/Prints/Andersson Silva.jpeg',
        'assets/google-reviews/Prints/Anne Francis da Costa.jpeg',
        'assets/google-reviews/Prints/Buteco da Esquina.jpeg',
        'assets/google-reviews/Prints/Diego Silva.jpeg',
        'assets/google-reviews/Prints/Juarez Medeiros.jpeg',
        'assets/google-reviews/Prints/Juninho.jpeg',
        'assets/google-reviews/Prints/Karla Caroline.jpeg',
        'assets/google-reviews/Prints/Leonardo Prado.jpeg',
        'assets/google-reviews/Prints/Pedro Ferreira.jpeg',
        'assets/google-reviews/Prints/Rodrigo Nunes.jpeg',
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

    // 2. FUNÇÃO PARA POPULAR A ESTEIRA (Com suporte a Clone para Loop Infinito)
    function popularTrack(trackElement, listaImagens) {
        if (!trackElement || listaImagens.length === 0) return;
        trackElement.innerHTML = '';

        // Adiciona as imagens originais
        listaImagens.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            trackElement.appendChild(img);
        });

        // CLONE: Duplica a PRIMEIRA imagem no FINAL da esteira
        const clone = document.createElement('img');
        clone.src = listaImagens[0];
        trackElement.appendChild(clone);
    }

    // Popula o Topo
    const tEsq = document.getElementById('track-esq');
    const tCentro = document.getElementById('track-centro');
    const tDir = document.getElementById('track-dir');

    popularTrack(tEsq, imagensTopo);
    popularTrack(tCentro, imagensTopo);
    popularTrack(tDir, imagensTopo);

    // Popula a Base (Quadrados Brancos)
    const tracksBase = document.querySelectorAll('#grid-base .slider-track');
    tracksBase.forEach(track => popularTrack(track, imagensBase));


    // 3. ESTADOS E PONTEIROS INDEPENDENTES (Para nascerem com fotos diferentes)

    // O topo começa desfasado: Esquerda (0), Centro (1), Direita (2)
    let posEsq = 0;
    let posCentro = 1 % imagensTopo.length;
    let posDir = 2 % imagensTopo.length;

    // A base também começa desfasada entre os 3 quadradinhos
    let posBase = [0, 1 % imagensBase.length, 2 % imagensBase.length];


    // 4. FUNÇÃO AUXILIAR DE DESLOCAMENTO SEM REBOBINAR (Teleporte)
    function moverEteleportar(trackElement, indexAtual, totalImagens) {
        if (!trackElement) return (indexAtual + 1) % totalImagens;

        const proximoIndex = indexAtual + 1;
        const shiftPercent = -(proximoIndex * 100);

        // Ativa a animação e move para o próximo item (ou para o clone)
        trackElement.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        trackElement.style.transform = `translateX(${shiftPercent}%)`;

        // Se moveu para o CLONE (que fica na posição = totalImagens)
        if (proximoIndex === totalImagens) {
            setTimeout(() => {
                // Desliga a transição instantaneamente e "teleporta" de volta para a foto 0
                trackElement.style.transition = 'none';
                trackElement.style.transform = 'translateX(0%)';
            }, 600); // Aguarda terminar a animação de 0.6s

            return 0; // Reseta o ponteiro pra 0
        }

        return proximoIndex;
    }


    // 5. APLICAÇÃO DAS POSIÇÕES INICIAIS (Para as imagens não nascerem iguais)
    function aplicarPosicoesIniciais() {
        if (tEsq) tEsq.style.transform = `translateX(-${posEsq * 100}%)`;
        if (tCentro) tCentro.style.transform = `translateX(-${posCentro * 100}%)`;
        if (tDir) tDir.style.transform = `translateX(-${posDir * 100}%)`;

        tracksBase.forEach((track, i) => {
            track.style.transform = `translateX(-${posBase[i] * 100}%)`;
        });
    }

    aplicarPosicoesIniciais();


    // 6. LOOP AUTOMÁTICO A CADA 2 SEGUNDOS
    setInterval(() => {
        // Move o Topo
        if (imagensTopo.length > 0) {
            posEsq = moverEteleportar(tEsq, posEsq, imagensTopo.length);
            posCentro = moverEteleportar(tCentro, posCentro, imagensTopo.length);
            posDir = moverEteleportar(tDir, posDir, imagensTopo.length);
        }
    }, 3000);

        setInterval(() => {
        // Move a Base
        if (imagensBase.length > 0) {
            tracksBase.forEach((track, i) => {
                posBase[i] = moverEteleportar(track, posBase[i], imagensBase.length);
            });
        }
    }, 1800);
});