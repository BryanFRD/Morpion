const choiceButtonDiv = document.querySelector("#choice-button");
const turnTextDiv = document.querySelector("#turn-text");
const morpionContainer = document.querySelector("#morpion-container");
const cases = morpionContainer.querySelectorAll(".case");
const gameFinishedDiv = document.querySelector("#game-finished");

let turn = undefined, tour = 0;

for(let button of choiceButtonDiv.querySelectorAll("button")){
  button.addEventListener('click', () => {
    choiceButtonDiv.hidden = true;
    turnTextDiv.hidden = false;
    turnTextDiv.innerText = `C'est au tour de ${turn = button.innerText}`;
  });
}

for(let button of cases){
  button.addEventListener('click', (e) => {
    if(!turn || e.currentTarget.innerText){
      return;
    }
    
    tour++;
    e.currentTarget.innerText = turn;
    
    let winner = checkWinner();
    if(winner){
      stopGame(`Le vainqueur est le joueur ${turn} :]`, winner);
    } else if(tour >= 9) {
      stopGame("Personne n'a gagné :{");
    }
    
    if(turn){
      turnTextDiv.innerText = `C'est au tour de ${turn = turn == 'X' ? 'O' : 'X'}`;
    }
  });
}

function checkWinner(){
  for(let i = 0; i < 3; i++){
    for(let col = 1; col <= 3; col += 2){
      let offset = i * (col == 1 ? 3 : 1);
      if(cases[0 * col + offset].innerText == turn && cases[1 * col + offset].innerText == turn && cases[2 * col + offset].innerText == turn){
        return [0 * col + offset, 1 * col + offset, 2 * col + offset];
      }
    }
  }
  
  if(cases[4].innerText == turn){
    if(cases[0].innerText == turn && cases[8].innerText == turn){
      return [0, 4, 8];
    } else if (cases[2].innerText == turn && cases[6].innerText == turn){
      return [2, 4, 6];
    }
  }
}

function stopGame(message, winner){
  turnTextDiv.hidden = true;
  gameFinishedDiv.hidden = false;
  turn = undefined;
  
  gameFinishedDiv.querySelector("button").addEventListener("click", () => {document.location.reload(true)});
  gameFinishedDiv.querySelector("h1").innerText = message;
  
  for(let cs in cases){
    if(winner){
      if(winner.includes(+cs)){
        cases[cs].classList.add("bg-success", "text-white");
      }
    } else {
      cases[cs].classList.add("bg-danger", "text-white");
    }
  }
}