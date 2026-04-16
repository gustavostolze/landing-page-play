document.addEventListener("DOMContentLoaded", () => {
    // 1. Elementos do Modal
    const modal = document.getElementById("modalDiagnostico");
    const closeBtn = document.getElementById("closeModal");

    /* O :not() exclui os botões de dentro do modal que usam a mesma classe visual */
    const openBtns = document.querySelectorAll(".cta-button, .btn-black:not(#btnNext):not(#btnFinish)");

    // 2. Elementos do Formulário (Multi-step)
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const btnNext = document.getElementById("btnNext");
    const btnPrev = document.getElementById("btnPrev");

    const form = document.getElementById("formDiagnostico");
    const formSuccess = document.getElementById("formSuccess");
    const btnFinish = document.getElementById("btnFinish");

    // --- LÓGICA DE ABRIR E FECHAR ---

    function openModal(e) {
        e.preventDefault(); // Evita recarregar a página se for uma tag <a>
        modal.classList.add("open");
        // A MÁGICA DO SCROLL: Trava o fundo!
        document.body.classList.add("no-scroll");

        // Reseta o form toda vez que abrir
        step1.classList.add("active");
        step2.classList.remove("active");
        formSuccess.classList.remove("active");
        form.reset();
    }

    function closeModal() {
        modal.classList.remove("open");

        // A MÁGICA DO SCROLL: Destrava o fundo!
        document.body.classList.remove("no-scroll");
    }

    // Aplica o evento em todos os botões CTA da página
    openBtns.forEach(btn => btn.addEventListener("click", openModal));

    // Fecha no X
    closeBtn.addEventListener("click", closeModal);

    // Fecha clicando FORA da caixa do modal
    modal.addEventListener("click", (e) => {
        if (e.target === modal) { // Se o alvo do clique for o fundo preto e não a caixa
            closeModal();
        }
    });


    // --- LÓGICA DE AVANÇAR E VOLTAR PASSOS ---

    // --- LÓGICA DE AVANÇAR E VOLTAR PASSOS (Corrigida) ---
    btnNext.addEventListener("click", () => {
        const inputsStep1 = step1.querySelectorAll('input[required]');
        let allValid = true;

        // O SEGREDO DA VALIDAÇÃO: Usar for...of com break
        for (let input of inputsStep1) {
            if (!input.checkValidity()) {
                input.reportValidity(); // Mostra o balão do Chrome
                allValid = false;
                break; // PARA o loop no primeiro erro, sem bugar os outros campos!
            }
        }

        if (allValid) {
            step1.classList.remove("active");
            step2.classList.add("active");
        }
    });

    btnPrev.addEventListener("click", () => {
        step2.classList.remove("active");
        step1.classList.add("active");
    });


    // --- LÓGICA DE ENVIO DO FORMULÁRIO ---

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Impede o recarregamento padrão da página

        // Pega todos os dados preenchidos
        const formData = new FormData(form);
        const dados = Object.fromEntries(formData.entries());

        console.log("Dados prontos para envio:", dados);

        // AQUI ENTRA A INTEGRAÇÃO (Exemplo com fetch para Formspree/Make)
        /*
        fetch("SUA_URL_DO_FORMSPREE_OU_WEBHOOK_AQUI", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            // Sucesso!
        })
        .catch(error => console.error("Erro:", error));
        */

        // Simulando o sucesso visualmente
        step2.classList.remove("active");
        formSuccess.classList.add("active");
    });

    // Botão de fechar na tela de sucesso
    btnFinish.addEventListener("click", closeModal);
});

// --- LÓGICA DO CUSTOM SELECT ---
    const customSelectWrappers = document.querySelectorAll('.custom-select-wrapper');

    customSelectWrappers.forEach(wrapper => {
        const select = wrapper.querySelector('select'); // O select invisível
        const trigger = wrapper.querySelector('.custom-select-trigger'); // O botão laranja
        const options = wrapper.querySelectorAll('.custom-option'); // A lista

        // Abrir/Fechar o menu
        trigger.addEventListener('click', function(e) {
            // Fecha todos os outros selects abertos antes de abrir este
            customSelectWrappers.forEach(w => {
                if (w !== wrapper) w.classList.remove('open');
            });
            wrapper.classList.toggle('open');
        });

        // Quando clicar em uma opção
        options.forEach(option => {
            option.addEventListener('click', function() {
                // 1. Atualiza o texto do botão visual
                trigger.textContent = this.textContent;
                
                // 2. Passa o valor para o select nativo (IMPORTANTE pro form enviar!)
                select.value = this.getAttribute('data-value');
                
                // 3. Fecha o menu
                wrapper.classList.remove('open');
            });
        });
    });

    // Fecha o menu se o cara clicar fora dele (em qualquer lugar da tela)
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.custom-select-wrapper')) {
            customSelectWrappers.forEach(w => {
                w.classList.remove('open');
            });
        }
    });