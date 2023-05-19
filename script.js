function primerLetraMayuscula(palabra) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}

//inicio

let startGame = document.getElementById("start-game")

startGame.addEventListener("click", () => {
    alerts("Comenzamos","¿Estás listo?")
    showPlayers()
    hiddenStartGame()
})

let listPlayers = []

//variables cantidad jugadores

let textPlayers = document.getElementById("text-players")
let inputPlayers = document.getElementById("input-players")
let buttonPlayers = document.getElementById("button-players")

let playerInput
let inputList

function createPlayerInput() {
    inputList = document.getElementById("input-list")
    inputList.innerHTML = ""

    for (let i = 1; i <= inputPlayers.value; i++) {
        let numberPlayer = i
        playerInput = document.createElement("input")
        playerInput.id = `player-name-${numberPlayer}`
        playerInput.classList = "input-player-edit"
        playerInput.placeholder = `Nombre del jugador ${numberPlayer}`
        inputList.appendChild(playerInput)
    }
}

buttonPlayers.addEventListener("click", () => {
    if (inputPlayers.value > 0 && inputPlayers.value <= 10) {
        createPlayerInput()
        hiddenPlayers()
        showInputs()
    } else {
        alertsError("error", "El numero de jugadores debe ser mayor a 0 y menor que 11", "Vuelva a intentarlo")
    }
})

let buttonInputs = document.getElementById("button-inputs")
let textInputs = document.getElementById("text-inputs")

buttonInputs.addEventListener("click", () => {
    if (playerInput.value != "") {
        addPlayerList()
        hiddenInputs()
        startRounds()
    } else {
        alertsError("error", "Todos los jugadores deben tener nombre", "Vuelva a intentarlo")
    }
})

function addPlayerList() {
    for (let i = 0; i < inputList.children.length; i++) {
        let playerInput = inputList.children[i]
        let numberPlayer = i + 1
        let playerName = playerInput.value
      
        listPlayers.push({
            "id": numberPlayer,
            "name": primerLetraMayuscula(playerName),
            "points": 0
        })
    }
}  

let round = 1
let buttonRound = document.getElementById("next-round")
let roundNumberElement = document.getElementById("round-number")
let playerDataContainer = document.getElementById("player-data-container")
let elementInput

function startRounds() {
    document.getElementById("container-round").classList.remove("hidden")
    roundNumberElement.textContent = round;
    
    
    playerDataContainer.innerHTML = "";

    for (let i = 0; i < listPlayers.length; i++) {
        
        let data = listPlayers[i]
        let elementDiv = document.createElement("div")
        elementInput = document.createElement("input")

        elementInput.classList = "input-player-edit"
        elementDiv.innerHTML = `<strong>Nombre:</strong> ${data.name} - <strong>Puntos:</strong> ${data.points}`;
        elementDiv.appendChild(elementInput)
        playerDataContainer.appendChild(elementDiv)
    }
}

buttonRound.addEventListener("click", () => {
    let elementInputs = playerDataContainer.getElementsByClassName("input-player-edit");

    if (elementInputs.length > 0 && elementInput.value) {
        round++;
        roundNumberElement.textContent = round

        let j = 0

        for (let i = 0; i < elementInputs.length; i++) {
            let data = listPlayers[j]
            data.points += parseInt(elementInputs[i].value)
            elementInputs[i].value = 0;
            if (data.points > 100) {
                listPlayers.splice(j, 1)
            } else {
                j++
            }
    
            let winner
            if (listPlayers.length < 2) {
                winner = listPlayers[0]
            }
    
            if (winner) {
                alerts("¡GANADOR!", `El jugador ${winner.name} ha ganado con ${winner.points} puntos.`)
            }
        }
    } else {
        alertsError("error", "Ingresa un puntaje en cada jugador")
    }
})

//funciones alert

function alerts(title, text) {
    Swal.fire({
        title: title,
        width: 500,
        padding: '2rem',
        color: '#5',
        text: text,
        confirmButtonText: 'Jugar',
        background: '#fff url(/images/trees.png)',
        backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
        `
    })
}

function alertsError(icon, title, text) {
    Swal.fire({
        icon: icon,
        title: title,
        width: 500,
        padding: '2rem',
        color: '#5',
        text: text,
        confirmButtonText: 'Jugar',
        background: '#fff url(/images/trees.png)',
        backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
        `
    })
}

//funciones mostrar y ocultar

function hiddenStartGame() {
    startGame.classList.add("hidden")
}

function showPlayers() {
    inputPlayers.classList.toggle("hidden")
    buttonPlayers.classList.toggle("hidden")
    textPlayers.classList.toggle("hidden")
}

function hiddenPlayers() {
    inputPlayers.classList.add("hidden")
    buttonPlayers.classList.add("hidden")
    textPlayers.classList.add("hidden")
}

function showInputs() {
    buttonInputs.classList.toggle("hidden")
    textInputs.classList.toggle("hidden")
}

function hiddenInputs() {
    buttonInputs.classList.add("hidden")
    textInputs.classList.add("hidden")
    inputList.classList.add("hidden")
}
