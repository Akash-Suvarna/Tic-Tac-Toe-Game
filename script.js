let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#newGame");
let winMsg = document.querySelector(".winMsg");
let msg = document.querySelector("#msg");

let turnO = true;

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);

function resetGame() {
    turnO = true;
    enableButtons();
    winMsg.classList.add("hide");
    msg.innerText = "Tic-Tac-Toe";
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnO) {
                box.innerText = "O";
                box.style.color = "blue";
            } else {
                box.innerText = "X";
                box.style.color = "red";
            }
            box.disabled = true;
            turnO = !turnO;
            checkWinner();
        }
    });
});

function disableButtons() {
    for (let box of boxes) {
        box.disabled = true;
    }
}

function enableButtons() {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "";
    }
}

function showWinner(winner) {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    winMsg.classList.remove("hide");
    disableButtons();
}

function checkWinner() {
    for (let pattern of winPatterns) {
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        if (position1 !== "" && position2 !== "" && position3 !== "") {
            if (position1 === position2 && position2 === position3) {
                showWinner(position1);
                return;
            }
        }
    }

    if ([...boxes].every(box => box.innerText !== "")) {
        msg.innerText = "It's a Draw!";
        winMsg.classList.remove("hide");
    }
}
