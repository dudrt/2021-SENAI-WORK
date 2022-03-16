// -----------------------------------------------------------------------------------------
// Variaveis globais
// -----------------------------------------------------------------------------------------
var funcionariosempresa = []
var funcionariosdisp = []

// -----------------------------------------------------------------------------------------
// Login e derivados
// -----------------------------------------------------------------------------------------
function login() {
    var emailV = document.getElementById("email").value
    var senhaV = document.getElementById("senha").value
    var encontrou = Boolean(false)
    var tipoentrada
    var cpf
    var bancoEmpresa = JSON.parse(localStorage.getItem("bancoEmpresa"))
    var bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"))
    var bancoADM=JSON.parse(localStorage.getItem("bancoADM"))
    if (bancoDeDados == null) {
        alert("Nenhum usuário cadastrado até o momento")
    } else {
        for (pessoa of bancoDeDados) {
            if (pessoa.email === emailV && pessoa.senha === senhaV) {
                encontrou = true
                cpf = pessoa.cpf
                tipoentrada = pessoa.tipo
                EnviarUser(cpf, tipoentrada)
            }
        }
        for(adm of bancoADM){
            if (adm.email === emailV && adm.senha === senhaV) {
                encontrou = true
                cpf = adm.cpf
                tipoentrada = adm.tipo
                EnviarUser(cpf, tipoentrada)
            }
        }
        if (encontrou != true) {
            if (bancoEmpresa != null) {
                var local = 0
                for (empresa of bancoEmpresa) {
                    if (empresa.emailemp === emailV && empresa.senhaemp === senhaV) {
                        localStorage.setItem("empresalogada", local)
                        document.location.href = 'T9-TelaLogadaEmpresa.html'
                    }
                    local++
                }
            } else {
                if (encontrou != true) {
                    alert("Usuário ou senha inválido")
                }
            }
        }

    }
}

function EnviarUser(cpf, tipo) {
    var primarykey = JSON.parse(localStorage.getItem("primarykey"))
    if (primarykey == null) {
        localStorage.setItem("primarykey", "")
        
    }
    localStorage.setItem("primarykey", JSON.stringify(cpf))
    if (tipo == "admin") {
        document.location.href = 'T5-TelaAdm.html'
    } else {
        document.location.href = 'T4-telauser.html'
    }
}

// -----------------------------------------------------------------------------------------
// Carregar tela
// -----------------------------------------------------------------------------------------
function RodarUser() {
    var key = JSON.parse(localStorage.getItem("primarykey"))
    var bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"))
    var local = -1
    for (pessoa of bancoDeDados) {
        local++
        if (key === pessoa.cpf) {
            var verde = bancoDeDados[local]
            mostrarinfo(verde)
            break
        } else { }
    }
}

function TelaADM() {
    var bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"))
    var mostrar = ""
    var botaomodal = "<td><button onclick='modal(this)' class='botao' id='myBtn'>Mais Info</button></td>"

    for (pessoa of bancoDeDados) {
        if (pessoa.tipo != "admin") {
            mostrar += "<tr><td>" + pessoa.nome + "</td><td>" + pessoa.sobreNome + "</td><td>" +
                pessoa.email + "</td><td>" + pessoa.telefone + "</td><td>" + pessoa.cpf + "</td><td>" +
                pessoa.datNasc + "</td><td>" + pessoa.sexo + "</td>" + botaomodal
        }
    } document.getElementById("mostrar").innerHTML += mostrar
    document.getElementById("mostrar").innerHTML += "</tr>"
}

function rodarempresa() {
    var bancoEmpresa = JSON.parse(localStorage.getItem("bancoEmpresa"))
    var mostrar = ""
    var botaomodal = "<td><button onclick='modalEmp(this)' id='myBtn'>Mais Info</button></td>"

    for (empresa of bancoEmpresa) {
        mostrar += "<tr><td>" + empresa.nome + "</td><td>" + empresa.ramo + "</td><td>" +
            empresa.cnpj + "</td><td>" + empresa.tipoempresa + "</td><td>" + empresa.cep + "</td><td>" +
            empresa.email + "</td>" + botaomodal
    }
    document.getElementById("mostrar").innerHTML += mostrar
    document.getElementById("mostrar").innerHTML += "</tr>"

}
function abrirtelaEMP() {
    var bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"))
    var bancoEmpresa = JSON.parse(localStorage.getItem("bancoEmpresa"))
    var empresalogada = JSON.parse(localStorage.getItem("empresalogada"))
    var empresadados = bancoEmpresa[empresalogada]
    document.getElementById("empresa").innerHTML = empresadados.nome
    for (pessoa of bancoDeDados) {
        if (pessoa.empresa === empresadados.nome) {
            funcionariosempresa.push(pessoa)
        } else if (pessoa.empresa === "Nenhuma" || pessoa.empresa === "Não informado" ) {
            funcionariosdisp.push(pessoa)
        }
    }
}


// -----------------------------------------------------------------------------------------
// Registro, modificar e excluir
// -----------------------------------------------------------------------------------------
function registro() {
    var nome = document.getElementById("nome").value
    var sobreNome = document.getElementById("sobrenome").value
    var email = document.getElementById("email").value
    var confEmail = document.getElementById("confEmail").value
    var telefone = document.getElementById("tel").value
    var cpf = document.getElementById("cpf").value
    var dat = document.getElementById("dtNasc").value
    var senha = document.getElementById("senha").value
    var confsenha = document.getElementById("confSenha").value
    var adm = Number(document.getElementById("adm").value)
    var tipo

    if (adm == 32420323) {
        tipo = "admin"
    } else {
        tipo = "estudante"
    }
    var sexo = ""
    if (document.getElementById("fem").checked) {
        sexo = "Feminino"
    } else if (document.getElementById("masc").checked) {
        sexo = "Masculino"
    } else { sexo = "Não informado" }

    if (confEmail != email) {
        alert("Os E-mails não coincidem!")
        return;
    } else if (cpf.length != 14) {
        alert("O CPF está incorreto")
        return;
    } else if (senha.length < 8) {
        alert('Senha fraca')
        return;
    } else if (senha != confsenha) {
        alert("As senhas não coincidem!")
        return;
    }
    var datarrumar = dat.split("-")
    var datNasc = datarrumar[2]
    for (i = 1; i >= 0; i--) {
        datNasc += "/" + datarrumar[i]
    }
    var pessoa = {
        nome, sobreNome, email, telefone, cpf, datNasc, senha, sexo, tipo,
        jovemApred: "Não informado",
        motiv: "Não informado", dtfimcurso: "Não informado", aprendCurs: "Não informado",
        turno: "Não informado",
        grauEscola: "Não informado", rg: "Não informado", sangue: "Não informado",
        rua: "Não informado", nmcasa: "",defi:"Não informado",descdefi:"Não informado",
        complemento: "Não informado", bairro: "Não informado", cidade: "Não informado",
        estado: "Não informado", pais: "Não informado", empresa: "Não informado"
    }
    inserir(pessoa)

}

function excluir() {
    var cpfV = document.getElementById("cpfre").value
    var senhaV = document.getElementById("senhare").value
    var bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"))
    var posicao = 0
    var encontrado = Boolean(false)
    for (pessoa of bancoDeDados) {
        if (cpfV === pessoa.cpf && senhaV === "32420323") {
            bancoDeDados.splice(posicao, 1)
            localStorage.setItem("bancoDeDados", JSON.stringify(bancoDeDados))
            encontrado = true
            break
        }
        posicao++
    } if (encontrado == true) {
        alert("Usuário excluido com sucesso")
        document.location.href = 'T5-TelaAdm.html'
    } else {
        alert("CPF ou Senha incorretos")
    }
}

function RecSenha() {
    var emailREC = document.getElementById("email").value
    var cpfREC = document.getElementById("cpf").value
    var bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"))
    var encontrado = Boolean(false)
    var cpf
    for (pessoa of bancoDeDados) {
        if (pessoa.email === emailREC && cpfREC === pessoa.cpf) {
            cpf = pessoa.cpf
            localStorage.setItem("primarykey", JSON.stringify(cpf))
            document.location.href = 'NovaSenha.html'
            encontrado = true
        }
        break
    } if (encontrado == false) {
        alert("Email ou Senha incorretos")
    }
}
function ConfirmaNovaSenha() {
    var senhaum = document.getElementById("primeirasenha").value
    var senhadois = document.getElementById("segundasenha").value
    var key = JSON.parse(localStorage.getItem("primarykey"))
    var posicao = -1
    var bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"))
    for (pessoa of bancoDeDados) {
        posicao++
        if (key === pessoa.cpf) {
            if (senhaum.length >= 8 && senhadois.length >= 8) {
                if (senhaum === senhadois) {
                    var pessoa = bancoDeDados[posicao]
                    bancoDeDados.splice(posicao, 1)
                    pessoa.senha = senhadois
                    bancoDeDados.push(pessoa)
                    localStorage.setItem("bancoDeDados", JSON.stringify(bancoDeDados))
                    alert("Senha trocada com sucesso, você será redirecionado a tela de login")
                    document.location.href = 'T1-login.html'
                } else {
                    document.getElementById("primeirasenha").value = null
                    document.getElementById("segundasenha").value = null
                    alert("As senhas não se coincidem")
                }
            } else {
                alert("Senha fraca")
                document.getElementById("primeirasenha").value = null
                document.getElementById("segundasenha").value = null
            }
        }
    }
}
function carregaNovaInfo() {
    var nome = document.getElementById("nome").value
    var sobreNome = document.getElementById("sobrenome").value
    var dat = document.getElementById("data").value
    if (dat != "") {
        var datarrumar = dat.split("-")
        var datNasc = datarrumar[2]
        for (i = 1; i >= 0; i--) {
            datNasc += "/" + datarrumar[i]
        }
    } else { }

    var jovemApred = document.getElementById("JA").value
    var motiv = document.getElementById("motivacao").value
    var dtfim = document.getElementById("datafim").value
    var dtfimr = dtfim.split("-")
    var dtfimcurso = dtfimr[2]
    for (i = 1; i >= 0; i--) { dtfimcurso += "/" + dtfimr[i] }

    var aprendCurs = ""
    if (document.getElementById("um").checked) {
        aprendCurs += "Aprendizagem Industrial de Assistente Administrativo - "
    } else if (document.getElementById("dois").checked) {
        aprendCurs += "Aprendizagem Industrial de Assistente de Logística - "
    } else if (document.getElementById("tres").checked) {
        aprendCurs += "Aprendizagem Industrial de Assistente de Produção - "
    } else if (document.getElementById("quatro").checked) {
        aprendCurs += "Aprendizagem Industrial de Eletricista de Manutenção - "
    } else if (document.getElementById("cinco").checked) {
        aprendCurs += "Aprendizagem Industrial de Instalador e Reparador de Equipamentos de Telecomunicações - "
    } else if (document.getElementById("seis").checked) {
        aprendCurs += "Aprendizagem Industrial de Informática - "
    } else if (document.getElementById("sete").checked) {
        aprendCurs += "Aprendizagem Industrial de Eletrônico de Manutenção Industrial - "
    } else if (document.getElementById("oito").checked) {
        aprendCurs += "Aprendizagem Industrial de Oficial de Edificações - "
    } else if (document.getElementById("nove").checked) {
        aprendCurs += "Nenhum - "
    } else if (document.getElementById("dez").checked) {
        aprendCurs += "Outro - "
    } else
    nmcasa
        var turno = document.getElementById("turno").value
    var grauEscola = document.getElementById("grauescola").value
    var rg = document.getElementById("rg").value
    var sexo = document.getElementById("sx").value
    var sangue = document.getElementById("sangue").value
    var rua = document.getElementById("rua").value
    var nmcasa = document.getElementById("numerocasa").value
    var complemento = document.getElementById("comp").value
    var bairro = document.getElementById("bairro").value
    var cidade = document.getElementById("cidade").value
    var estado = document.getElementById("estado").value
    var pais = document.getElementById("pais").value
    var empresa = document.getElementById("empresaAtual").value
    var descdefi=""
    var defi=""
    if(document.getElementById("simdefi").checked){
    defi="Sim"
    descdefi=document.getElementById("descdefi").value
    }else{
    descdefi="Não possui"
    defi="Não"
    }
    

    if (empresa.length <= 1) {
        alert("Digite o nome de uma empresa válido")
        return;
    }
    var bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"))
    var pessoaatu
    var key = JSON.parse(localStorage.getItem("primarykey"))
    for (pessoa of bancoDeDados) {
        if (key === pessoa.cpf) {
            pessoaatu = pessoa
            break
        }
    }
    
    if (jovemApred == "" || dtfimcurso == "" || aprendCurs == "" ||
        turno == "" || grauEscola == "" || rg == "" || sangue == "" ||
        rua == "" || nmcasa == "" || bairro == "" || cidade == "" ||
        estado == "" || pais == "") { alert("Campos obrigatórios não foram preenchidos"); return } else {
        if (nome == "") {
            nome = pessoaatu.nome
        } if (sobreNome == "") {
            sobreNome = pessoaatu.sobreNome
        } if (dat == "") {
            datNasc = pessoaatu.datNasc
        }
        email = pessoaatu.email
        cpf = pessoaatu.cpf
        senha = pessoaatu.senha
        telefone = pessoaatu.telefone
        tipo=pessoaatu.tipo
        if (sexo=="") {
            sexo=pessoaatu.sexo
        }
        
        var pessoanova = {
            nome, sobreNome, datNasc, jovemApred,
            motiv, dtfimcurso, aprendCurs, turno,defi,descdefi,
            grauEscola, rg, sexo, sangue, rua, nmcasa,
            complemento, bairro, cidade, estado, pais, cpf, senha, email, telefone, empresa,tipo
        }
        var posicao=0
        for (pessoa of bancoDeDados) {
            if (key === pessoa.cpf) {
                bancoDeDados[posicao]=pessoanova
                localStorage.setItem("bancoDeDados", JSON.stringify(bancoDeDados))
                document.location.href="T4-telauser.html"
                break
            }
            posicao++
        }
    }
}

function registrarEmp() {
    var nome = document.getElementById("nome").value
    var pais = document.getElementById("pais").value
    var cnpj = document.getElementById("cnpj").value
    var estado = document.getElementById("estado").value
    var ramo = document.getElementById("ramo").value
    var cidade = document.getElementById("cidade").value
    var email = document.getElementById("email").value
    var bairro = document.getElementById("bairro").value
    var telefone = document.getElementById("telefone").value
    var cep = document.getElementById("cep").value
    var rua = document.getElementById("rua").value
    var tipoempresa = ""
    var nmemp=document.getElementById("nmemp").value
    var emailemp = document.getElementById("emailemp").value
    var senhaemp = document.getElementById("senhaemp").value
    if (document.getElementById("micro").checked) {
        tipoempresa = "Micro Empresa"
    } else if (document.getElementById("pequeno").checked) {
        tipoempresa = "Pequena Empresa"
    } else if (document.getElementById("medio").checked) {
        tipoempresa = "Media Empresa"
    } else if (document.getElementById("macro").checked) {
        tipoempresa = "Grande Empresa"
    }

    if (nome == "" || pais == "" || cnpj == "" || estado == "" || ramo == "" ||
        cidade == "" || email == "" || bairro == "" || telefone == "" || cep == "" ||
        rua == "" || tipoempresa == "" || nmemp=="") {
        document.getElementById("mostrando").innerHTML = "Alguns dos campos a cima não foram preenchidos"
        return;
    }
    var bancoEmpresa = JSON.parse(localStorage.getItem("bancoEmpresa"))
    if (bancoEmpresa != null) {
        for (empresa of bancoEmpresa) {
            if (cnpj === empresa.cnpj) {
                alert("CNPJ já registrado")
                return;
            }
        }
    }

    var empresa = {
        nome: nome,
        pais: pais,
        cnpj: cnpj,
        estado: estado,
        ramo: ramo,
        cidade: cidade,
        email: email,
        bairro: bairro,
        telefone: telefone,
        cep: cep,
        rua: rua,
        tipoempresa: tipoempresa,
        emailemp: emailemp,
        senhaemp: senhaemp,
        nmemp:nmemp
    }
    InserirEmpresa(empresa)
}
// -----------------------------------------------------------------------------------------
// Inserir dados no banco de dados
// -----------------------------------------------------------------------------------------

function inserir(pessoa) {
    
    if (pessoa.tipo==="estudante") {
        var bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"))
        if (bancoDeDados == null) {
            localStorage.setItem("bancoDeDados", "[]")
            bancoDeDados = []
        }
        bancoDeDados.push(pessoa)
        localStorage.setItem("bancoDeDados", JSON.stringify(bancoDeDados))
        document.location.href = 'T1-login.html'
    }else if (pessoa.tipo==="admin") {
        var bancoADM= JSON.parse(localStorage.getItem("bancoADM"))
        if (bancoADM == null) {
            localStorage.setItem("bancoADM", "[]")
            bancoADM = []
        }
        var adm=pessoa
        bancoADM.push(adm)
        localStorage.setItem("bancoADM", JSON.stringify(bancoADM))
        document.location.href = 'T1-login.html'
    }{

    }
    
}

function InserirEmpresa(empresa) {
    var bancoEmpresa = JSON.parse(localStorage.getItem("bancoEmpresa"))
    if (bancoEmpresa == null) {
        localStorage.setItem("bancoEmpresa", "[]")
        bancoEmpresa = []
    }
    bancoEmpresa.push(empresa)
    localStorage.setItem("bancoEmpresa", JSON.stringify(bancoEmpresa))
    document.location.href = 't8-TelaEmpresa.html'
}

// -----------------------------------------------------------------------------------------
// Modais e suas funções
// -----------------------------------------------------------------------------------------

function modal(posicao) {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 


    modal.style.display = "block";


    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    var id = (posicao.parentNode.parentNode.rowIndex) - 1
    var bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"))

    var veradm = bancoDeDados[0]
    if (veradm.tipo === "admin") {
        id++
    }
    console.log(id)
    var pessoa = bancoDeDados[id]
    if (pessoa.tipo === "admin") {
        rodartipo(id)
    } else {
       
        mostrarinfo(pessoa)
    }
}

function mostrarinfo(pessoa) {
    document.getElementById("nome").innerHTML = pessoa.nome + " " + pessoa.sobreNome+"-"+pessoa.empresa
    document.getElementById("cpf").innerHTML = "CPF: " + pessoa.cpf
    document.getElementById("rg").innerHTML = "RG: " + pessoa.rg
    document.getElementById("email").innerHTML = "Email: " + pessoa.email
    document.getElementById("sexo").innerHTML = "Sexo: " + pessoa.sexo
    document.getElementById("datnasc").innerHTML = "Data de Nascimento: " + pessoa.datNasc
    document.getElementById("jovemaprend").innerHTML = "É jovem aprendiz: " + pessoa.jovemApred
    document.getElementById("dtfimcurso").innerHTML = "Finalização do curso: " + pessoa.dtfimcurso
    document.getElementById("aprendcurs").innerHTML = "Aprendizagem Cursada: " + pessoa.aprendCurs
    document.getElementById("grauEscola").innerHTML = "Grau de Escolaridade: " + pessoa.grauEscola
    document.getElementById("turno").innerHTML = "Turno que Estuda: " + pessoa.turno
    document.getElementById("motiv").innerHTML = "Motivação: " + pessoa.motiv
    document.getElementById("sangue").innerHTML = "Tipo Sanguíneo: " + pessoa.sangue
    document.getElementById("telefone").innerHTML = "Telefone: " + pessoa.telefone
    document.getElementById("pais").innerHTML = "Pais: " + pessoa.pais
    document.getElementById("estado").innerHTML = "Estado: " + pessoa.estado
    document.getElementById("cidade").innerHTML = "Cidade: " + pessoa.cidade
    document.getElementById("bairro").innerHTML = "Bairro: " + pessoa.bairro
    document.getElementById("rua").innerHTML = "Rua: " + pessoa.rua+"-"
    document.getElementById("nmcasa").innerHTML = "Número da Casa: " + pessoa.nmcasa
    document.getElementById("complemento").innerHTML = "Complemento: " + pessoa.complemento
}

function modalEmp(posicao) {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 


    modal.style.display = "block";


    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    var id = (posicao.parentNode.parentNode.rowIndex) - 1
    var bancoEmpresa = JSON.parse(localStorage.getItem("bancoEmpresa"))
    var empresaatual = bancoEmpresa[id]
    
    MostrarInfoEmpresa(empresaatual)
}

function MostrarInfoEmpresa(empresa) {
    document.getElementById("nometipotel").innerHTML = empresa.nome + "-" + empresa.tipoempresa + "-" + empresa.telefone
    document.getElementById("cnpj").innerHTML = "CNPJ: " + empresa.cnpj
    document.getElementById("ramo").innerHTML = "Ramo: " + empresa.ramo
    document.getElementById("email").innerHTML = "Email: " + empresa.email
    document.getElementById("cep").innerHTML = "CEP: " + empresa.cep
    document.getElementById("rua").innerHTML = "Rua: " + empresa.rua+"-"+empresa.nmemp
    document.getElementById("bairro").innerHTML = "Bairro: " + empresa.bairro
    document.getElementById("cidade").innerHTML = "Cidade: " + empresa.cidade
    document.getElementById("estado").innerHTML = "Estado: " + empresa.estado
    document.getElementById("pais").innerHTML = "Pais: " + empresa.pais
}


// -----------------------------------------------------------------------------------------
// Funções adjacentes 
// -----------------------------------------------------------------------------------------

function limpa() {
    document.getElementById("nome").value = null
    document.getElementById("sobrenome").value = null
    document.getElementById("email").value = null
    document.getElementById("confEmail").value = null
    document.getElementById("tel").value = null
    document.getElementById("cpf").value = null
    document.getElementById("dtNasc").value = null
    document.getElementById("senha").value = null
    document.getElementById("confSenha").value = null
    document.getElementById("fem").checked = false
    document.getElementById("masc").checked = false
    document.getElementById("nInf").checked = false
    document.getElementById("adm").value = false
}


function checardefi() {
    if (document.getElementById("simdefi").checked) {
        document.getElementById("deficheck").innerHTML = '<textarea id="descdefi"  cols="20" placeholder="Descreva seu tipo de deficiencia" rows="1" maxlength="40"></textarea>'
    } else if (document.getElementById("naodefi").checked) {
        document.getElementById("deficheck").innerHTML = ""
    }
}

function micro() {
    document.getElementById("microt").innerHTML = " - Empresa com até 9 funcionários"
    document.getElementById("mediot").innerHTML = ""
    document.getElementById("macrot").innerHTML = ""
    document.getElementById("pequenot").innerHTML = ""
}
function pequeno() {
    document.getElementById("microt").innerHTML = ""
    document.getElementById("mediot").innerHTML = ""
    document.getElementById("macrot").innerHTML = ""
    document.getElementById("pequenot").innerHTML = " - Empresa com 10 a 49 funcionários"
}
function medio() {
    document.getElementById("microt").innerHTML = ""
    document.getElementById("mediot").innerHTML = " - Empresa com 50 a 99 funcionários"
    document.getElementById("macrot").innerHTML = ""
    document.getElementById("pequenot").innerHTML = ""
}
function macro() {
    document.getElementById("microt").innerHTML = ""
    document.getElementById("mediot").innerHTML = ""
    document.getElementById("macrot").innerHTML = " - Empresa com mais de 100 funcionários"
    document.getElementById("pequenot").innerHTML = ""
}

function CepTestar() {
    var valor = document.getElementById("cep").value
    if (valor.length > 7) {
        var cep = valor.replace(/\D/g, '');
        if (cep != "") {

            var script = document.createElement('script');
            script.src = `https://viacep.com.br/ws/${cep}/json/?callback=PegarInfo`;
            document.body.appendChild(script);

        } else {
            alert("Digite um CEP")
        }
    }
}
function PegarInfo(endereco) {
    if (endereco.erro == true) {
        alert("Digite um CEP válido")
        return;
    }
    document.getElementById("cidade").value = (endereco.localidade)
    document.getElementById("rua").value = (endereco.logradouro)
    document.getElementById("bairro").value = (endereco.bairro)
    document.getElementById("estado").value = (endereco.uf)
    document.getElementById("pais").value = "Brasil"
}
function verEmpresas() {
    if (document.getElementById("exit") != null) {
        return
    }
    bancoEmpresa = JSON.parse(localStorage.getItem("bancoEmpresa"))
    if(bancoEmpresa!=null){
    for (empresa of bancoEmpresa) {
        let nome = document.createElement('option')
        nome.value = empresa.nome
        nome.id = "exit"
        document.getElementById("Empresa").appendChild(nome)
    }
    }
}

function apagar(id) {
    document.getElementById(id).value = null
}

function rodartipo(posicao) {
    var bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"))
    var pessoa = bancoDeDados[posicao]
    if (pessoa.tipo === "admin") {
        proximo(posicao)
    } else {
        mostrarinfo(pessoa)
    }
}
function proximo(posicao) {
    posicao++
    rodartipo(posicao)
}

function arrumatelefone(id){
    document.body.addEventListener('keydown', function (event) {
        const key = event.key
       if (key=="Backspace"){
           
           return
       }else{
        var telefone=document.getElementById(id).value
        var te=telefone.split("")
        var ddd=Boolean(true)
        var resto=Boolean(true)
    
        if (telefone.length>=1){
            ddd=Boolean(true)
            resto=Boolean(true)
        }
        if (telefone.length==2 && ddd===true) {
            ddd=false
            document.getElementById(id).value="("+te[0]+te[1]+")"
        }
        if (telefone.length==8) {
            document.getElementById(id).value="("+te[1]+te[2]+")"+te[4]+te[5]+te[6]+te[7]+"-"
        }
        if (telefone.length==13) {
            document.getElementById(id).value="("+te[1]+te[2]+")"+te[4]+te[5]+te[6]+te[7]+te[9]+te[8]+te[10]+te[11]+te[12]
        }
        if (telefone.length==14) {
            return
        }
       }
      });
    
}

function arrumacpf(id){
    document.body.addEventListener('keydown', function (event) {
        const key = event.key
       if (key=="Backspace"){
           
           return
       }else{
    var cpfinteiro=document.getElementById(id).value
    var cpf=cpfinteiro.split("")

    if (cpfinteiro.length==3) {
        document.getElementById(id).value=cpf[0]+cpf[1]+cpf[2]+"."
    }
    if (cpfinteiro.length==7) {
        document.getElementById(id).value=cpf[0]+cpf[1]+cpf[2]+"."+cpf[4]+cpf[5]+cpf[6]+"."
    }
    if (cpfinteiro.length==11) {
        document.getElementById(id).value=cpf[0]+cpf[1]+cpf[2]+"."+cpf[4]+cpf[5]+cpf[6]+"."+cpf[8]+cpf[9]+cpf[10]+"-"
    }
    if (cpfinteiro.length==14) {
        document.getElementById(id).value=cpf[0]+cpf[1]+cpf[2]+"."+cpf[4]+cpf[5]+cpf[6]+"."+cpf[8]+cpf[9]+cpf[10]+"-"+cpf[12]+cpf[13]
    }
    if (cpfinteiro.length==14) {
        return
    }
}
});
}

// -----------------------------------------------------------------------------------------
// Carregar opções das empresas
// -----------------------------------------------------------------------------------------
function FuncionariosEmpresa() {
    var botaomodal = "<td id='borda'><button onclick='modal(this)' class='botao' id='myBtn'>Mais Info</button></td>"
    document.getElementById("alunosLivres").style.backgroundColor = ""
    document.getElementById("AlunosDaEmpresa").style.backgroundColor = "grey"
    var mostrar = '<tr><th id="borda">Nome</th><th id="borda">CPF</th>' +
        '<th id="borda">Turno que estuda</th><th id="borda">PCD</th>' +
        '<th id="borda">Grau de Escolaridade</th><th id="borda">Data de Nascimento</th>' +
        '<th id="borda">Mais Informações</th></tr>'
    for (pessoa of funcionariosempresa) {
        mostrar += "<tr><td id='borda'>" + pessoa.nome +" "+pessoa.sobreNome +"</td><td id='borda'>" +
        pessoa.cpf+  "</td><td id='borda'>" +
        pessoa.turno + "</td><td id='borda'>" + pessoa.defi + "</td><td id='borda'>" + 
        pessoa.grauEscola + "</td><td id='borda'>" +
        pessoa.datNasc+ "</td>" +botaomodal
    }
    document.getElementById("tab").innerHTML = ""
    document.getElementById("tab").innerHTML += mostrar
    document.getElementById("tab").innerHTML +="</tr>"
}

function FuncionariosDisponiveis() {
    var botaomodal = "<td id='borda'><button onclick='modal(this)' class='botao' id='myBtn'>Mais Info</button></td>"
    document.getElementById("alunosLivres").style.backgroundColor = "grey"
    document.getElementById("AlunosDaEmpresa").style.backgroundColor = ""
    var mostrar = '<tr><th id="borda">Nome</th><th id="borda">CPF</th>' +
        '<th id="borda">Turno que estuda</th><th id="borda">PCD</th>' +
        '<th id="borda">Grau de Escolaridade</th><th id="borda">Data de Nascimento</th>' +
        '<th id="borda">Mais Informações</th></tr>'
    for (pessoa of funcionariosdisp) {
        mostrar += "<tr><td id='borda'>" + pessoa.nome +" "+pessoa.sobreNome +"</td><td id='borda'>" +
        pessoa.cpf+  "</td><td id='borda'>" +
        pessoa.turno + "</td><td id='borda'>" + pessoa.defi + "</td><td id='borda'>" + 
        pessoa.grauEscola + "</td><td id='borda'>" +
        pessoa.datNasc+ "</td>" +botaomodal
    }
    document.getElementById("tab").innerHTML = ""
    document.getElementById("tab").innerHTML += mostrar
    document.getElementById("tab").innerHTML += "</tr>"
}

