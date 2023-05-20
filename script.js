function primerLetraMayuscula(palabra) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}

//inicio

let startGame = document.getElementById("start-game")

startGame.addEventListener("click", () => {
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
    if (playerInput.value != "" && isNaN(playerInput.value)) {
        addPlayerList()
        hiddenInputs()
        showPoints()
    } else {
        alertsError("error", "Todos los jugadores deben tener nombre", "Vuelva a intentarlo")
    }
})

//agrego jugadores a la lista

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
        sessionStorage.setItem("ListPlayers", JSON.stringify(listPlayers))
    }
}  

//limite de puntos
let textPoints = document.getElementById("text-points")
let inputPoints = document.getElementById("input-max-points")
let buttonPoints = document.getElementById("button-points")
let numberLimit

buttonPoints.addEventListener("click", () => {
    if (inputPoints.value > 0) {
        numberLimit = inputPoints.value
        hiddenLimitPoint()
        startRounds()
        alerts("Comenzamos","¿Estás listo? \nCuando termines de jugar tu primer ronda continua")
    } else {
        alertsError("error", "El número debe ser mayor a 0")
    }
})

//rondas

let round = 1
let buttonRound = document.getElementById("next-round")
let roundNumberElement = document.getElementById("round-number")
let playerDataContainer = document.getElementById("player-data-container")
let elementInputs = playerDataContainer.getElementsByClassName("input-player-edit")

function startRounds() {
    document.getElementById("container-round").classList.remove("hidden")
    roundNumberElement.textContent = round;
    
    playerDataContainer.innerHTML = "";

    for (let i = 0; i < listPlayers.length; i++) {
        let data = listPlayers[i]
        let elementDiv = document.createElement("div")
        let elementInput = document.createElement("input")

        elementInput.classList = "input-player-edit"
        elementDiv.innerHTML = `<div><strong>Nombre: ${data.name} - </strong><strong>Puntos: ${data.points}</strong></div>`
        elementDiv.appendChild(elementInput)
        playerDataContainer.appendChild(elementDiv)
        elementInputs[i].placeholder = `Puntaje del jugador ${data.name}`
    }
}

//sumar puntos y dar ganador

let containerRound = document.getElementById("container-round")
let winnerEnd = document.getElementById("winner-end")
let winnerResults = document.getElementById("winner-results")
let winner
let points

buttonRound.addEventListener("click", () => {
    if (elementInputs.length > 0) {
        round++;
        roundNumberElement.textContent = round

        let j = 0
        winner = null

        for (let i = 0; i < elementInputs.length; i++) {
            let data = listPlayers[j]
            if (data) {
                let inputValue = parseInt(elementInputs[i].value)
                if (!isNaN(inputValue)) {
                    data.points += parseInt(elementInputs[i].value)
                    elementInputs[i].value = ""
                    console.log(listPlayers)
                    if (data.points > numberLimit) {
                        alertsDelete(`Jugador ${data.name} eliminado`, `Se pasó del limite de ${numberLimit} puntos`)
                        listPlayers.splice(j, 1)
                        $(elementInputs[i].closest(".input-player-edit")).hide("slow")
                        $(elementInputs[i].closest(".input-player-edit")).prev().remove()
                    } else {
                        j++
                    }
                }
            }
        } 

        if (listPlayers.length < 2) {
            winner = listPlayers[0]
        }

        if (winner) {
            alertsWin("success", "¡GANADOR!", `Ganó el jugador ${winner.name}`)
            winner = listPlayers[0].name
            points = listPlayers[0].points
            hiddenRound()
            showWinner()
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
        background: '#fff',
        backdrop: `
        rgba(0,0,123,0.4)
        `
    })
}

function alertsWin(icon, title, text) {
    Swal.fire({
        icon: icon,
        title: title,
        width: 500,
        padding: '2rem',
        color: '#5',
        text: text,
        confirmButtonText: 'Continuar',
        background: '#fff',
        backdrop: `
        rgba(0,0,123,0.4)
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
        background: '#fff',
        backdrop: `
        rgba(0,0,123,0.4)
        `
    })
}

function alertsDelete(title, text) {
    Swal.fire({
        position: "bottom",
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 1300
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

function showPoints() {
    inputPoints.classList.toggle("hidden")
    buttonPoints.classList.toggle("hidden")
    textPoints.classList.toggle("hidden")
}

function hiddenLimitPoint() {
    inputPoints.classList.add("hidden")
    buttonPoints.classList.add("hidden")
    textPoints.classList.add("hidden")
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

function hiddenRound() {
    containerRound.classList.add("hidden")
}

function showWinner() {
    winnerEnd.classList.remove("hidden")
    winnerResults.innerHTML = `<p>El jugador ${winner} ha ganado con ${points} puntos</p>`
}

let restart = document.getElementById("restart")
restart.addEventListener("click", () => {
    winnerEnd.classList.add("hidden")
    round = 1
    
    storedPlayers = sessionStorage.getItem("ListPlayers")
    if (storedPlayers) {
        listPlayers = JSON.parse(storedPlayers)
    }

    for (let i = 0; i < listPlayers.length; i++) {
        listPlayers[i].points = 0
    }

    playerDataContainer.innerHTML = ""
    startRounds()

    document.getElementById("container-round").classList.remove("hidden")
})
