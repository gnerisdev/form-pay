// Validação de campos formulário
const campos = [
    {
        id: 'nome',
        regex: /^[a-zA-ZÀ-ÿ\s]+$/,
        mensagem: 'Nome deve conter apenas letras e espaços.',
    },
    {
        id: 'sobrenome',
        regex: /^[a-zA-ZÀ-ÿ\s]+$/,
        mensagem: 'Sobrenome deve conter apenas letras e espaços.',
    },
    {
        id: 'email',
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        mensagem: 'Email inválido.',
    },
    {
        id: 'cpf-cnpj',
        regex: /^(?:\d{11}|\d{14})$/,
        mensagem: 'CPF/CNPJ inválido. O CPF deve ter 11 dígitos e o CNPJ 14 dígitos.',
    },
    {
        id: 'telefone',
        regex: /^\d+$/,
        mensagem: 'Telefone inválido. Deve conter apenas números.',
    },
    {
        id: 'cpf-cnpj',
        regex: /^(?:\d{11}|\d{14})$/,
        mensagem: 'CPF/CNPJ inválido. Deve conter exatamente 11 ou 14 dígitos.',
    },    
    {
        id: 'cep',
        regex: /^\d{8}$/,
        mensagem: 'CEP inválido. Deve conter apenas números.',
    },
    {
        id: 'endereco',
        regex: /^[a-zA-ZÀ-ÿ0-9\s,.'-]{3,}$/,
        mensagem: 'Endereço inválido. Deve conter pelo menos 3 caracteres.',
    },
    {
        id: 'numero',
        regex: /^\d+[a-zA-Z0-9\s-]*$/,
        mensagem: 'Número inválido. Deve ser numérico e pode conter letras (Ex.: 123A).',
    },
    {
        id: 'cidade',
        regex: /^[a-zA-ZÀ-ÿ\s]{3,}$/,
        mensagem: 'Cidade inválida. Deve conter apenas letras e pelo menos 3 caracteres.',
    },
    {
        id: 'estado',
        regex: /^[a-zA-Z\s]{2,}$/,
        mensagem: 'Estado inválido. Deve conter apenas letras e pelo menos 2 caracteres.',
    },
    {
        id: 'titular',
        regex: /^[a-zA-Z\s]+$/,
        mensagem: 'O nome do titular deve ser preenchido e conter apenas letras e espaços.',
    },
    {
        id: 'ccv',
        regex: /^\d{3}$/,
        mensagem: 'O CCV deve conter 3 dígitos numéricos.',
    },
    {
        id: 'mes',
        regex: /^\S.*$/,
        mensagem: 'Selecione o mês de validade do cartão.',
    },
    {
        id: 'ano',
        regex: /^\S.*$/,
        mensagem: 'Selecione o ano de validade do cartão.',
    }
];

campos.forEach(campo => {
    const input = document.getElementById(campo.id);
    const errorDiv = document.getElementById(`${campo.id}-error`);

    input.addEventListener('focusout', () => {
        const value = input.value.trim();

        if (!campo.regex.test(value)) {
            console.log(errorDiv, campo, input)
            errorDiv.textContent = campo.mensagem;
            return;
        }

        errorDiv.textContent = '';
    });
});


// Preencher o select de ano dinamicamente
const anoInpur = document.getElementById(`ano`);
const currentYear = new Date().getFullYear();

for (let i = 0; i < 10; i++) {
    const option = document.createElement('option');
    option.value = currentYear + i;
    option.textContent = currentYear + i;
    anoInpur.appendChild(option);
}

// Enviar form
const form = document.getElementById('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const inputFields = document.querySelectorAll('.input-cartao-number');
    const cardNumber = Array.from(inputFields).map(input => input.value).join('');
    const errorCartaoNumeroDiv = document.getElementById('cartao-number-error');
    const dados = {};
    let isValid = true;

    campos.forEach(campo => {
        const input = document.getElementById(campo.id);
        const errorDiv = document.getElementById(`${campo.id}-error`);
        const value = input.value.trim();

        if (!campo.regex.test(value)) {
            errorDiv.innerText = campo.mensagem;
            isValid = false;
            return;
        } 
          
        errorDiv.textContent = '';
        dados[campo.id] = value; 
    });

    errorCartaoNumeroDiv.innerText = '';

    if (cardNumber.length !== 16) {
        errorCartaoNumeroDiv.innerText = 'Por favor, preencha todos os campos com 4 dígitos cada.';
        isValid = false;
    }

    if (!isValid) {
        alert('Por favor, corrija os campos inválidos.');
        return;
    }

    try {
        // ação
        console.log(dados)
    } catch (error) {
        console.error('Erro de conexão:', error);
    }
});
