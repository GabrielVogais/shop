const btn_cadastrar = document.getElementById('cadastro');
const btn_logar = document.getElementById('login');
const btn_teste = document.getElementById('teste');
const btn_teste1 = document.getElementById('teste1');

const setMessage = (obj1, message, obj2) => {
    const alert = document.getElementById('w1')
    const notf = document.getElementById(obj1)
    document.getElementById(obj2).innerText = message
    notf.style.display = "flex"
    alert.classList.remove('animate-reverse')
    alert.classList.add('animate-slide')
    setTimeout(() => {
        alert.classList.remove('animate-slide')
        alert.classList.add('animate-reverse')
        setTimeout(() => {
            notf.style.display = "none"
        }, 1000)
    }, 2100)
}

btn_teste.addEventListener('click', () => {
    setMessage('nof_y', "Algum campo está vazio!", 'p_msg_y')
})
btn_teste1.addEventListener('click', () => {
    let warn = document.querySelector('#w1')
    warn.classList.remove('animate-slide')
    warn.classList.add('animate-reverse')
})
btn_logar.addEventListener('click', async () => {
    const usuario = document.getElementById('l_user').value;
    const senha = document.getElementById('l_pass').value;
    axios.post('https://otaku-shop.herokuapp.com/redirect-login', new URLSearchParams({
        'usuario': `${usuario}`,
        'senha': `${senha}`
    })).then((response) => {
        WarnSwitch(response.data, '')
        if (response.data.alert == "green") {
            setTimeout(() => {
                window.location.href = "https://otaku-shop.herokuapp.com";
            }, 1000);
        }
    }).catch((error) => {
        console.log(error);
    });
})

btn_cadastrar.addEventListener('click', async () => {
    const usuario = document.getElementById('c_user').value;
    const senha = document.getElementById('c_pass').value;
    const csenha = document.getElementById('c_passc').value;
    const email = document.getElementById('c_email').value;
    if (usuario === "" || senha === "" || email === "") {
        console.log("Algum campo está vazio!")
        setMessage('nof_y', "Algum campo está vazio!", 'p_msg_y')
    }
    else if (senha.length < 8) {
        setMessage('nof_y', "Sua senha é muito curta!", 'p_msg_y')
    } else if (senha !== csenha) {
        setMessage('nof_r', "As senhas não correspondem!", 'p_msg_r')
    } else {
        axios.post('https://otaku-shop.herokuapp.com/redirect-cadastro', new URLSearchParams({
            'usuario': `${usuario}`,
            'senha': `${senha}`,
            'email': `${email}`
        })).then((response) => {
            WarnSwitch(response.data, "cadastro")
        }).catch((error) => {
            console.log(error);
        });
    }
})

const WarnSwitch = (data, type) => {
    switch (data.alert) {
        case "yellow":
            setMessage('nof_y', data.message, 'p_msg_y')
            break;
        case "red":
            setMessage('nof_r', data.message, 'p_msg_r')
            break;
        case "green":
            setMessage('nof_g', data.message, 'p_msg_g')
            if (type === "cadastro") {
                document.getElementById('c_user').value = "";
                document.getElementById('c_pass').value = "";
                document.getElementById('c_passc').value = "";
                document.getElementById('c_email').value = "";
            }
            break;
    }
}