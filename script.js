let boxes = document.querySelectorAll('.container>.mid>.buttons>div>button')
let reset = document.querySelector('.container>.lower>button')
let newGameButton = document.querySelector('.container>.winnerCard>button');
let winnerCard = document.querySelector('.container>.winnerCard>span');
let turnX = true;
winner = '';
let click = new Audio('Click.mp3');
let win = new Audio('Win.wav');
let lose = new Audio('Lose.mp3');
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

boxes.forEach((box)=> {
    box.addEventListener('click', ()=>{
        click.play();
        console.log("clicked");
        if(turnX){
            box.style.color = '#FF6868';
            box.innerText = 'X';
            turnX = false;
        }
        else{
            box.style.color = '#597E52';
            box.innerText = 'O';
            turnX = true;
        }
        box.disabled = true;
        checkWinner();
        checkTie();
    })  
});

reset.addEventListener('click', ()=>{
    boxes.forEach((box) => {
        box.innerText = '';
        box.disabled = false;
        box.style.backgroundColor = '#AAD9BB';
    })
})

const checkTie = () =>{
    flag = true;
    boxes.forEach((box) => {
        if(box.innerHTML === ''){
            flag = false;
        }
    })
    if(flag && winner === ''){
        boxes.forEach((box) => {
            box.style.backgroundColor = '#E5E1DA';
            box.disabled = true;
            lose.play();
        })
    }
}

const checkWinner = () => {
    for (pattern of winPatterns) {
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;
        if (pos1Value !== "" && pos2Value !== "" && pos3Value !== "") {
            if (pos1Value === pos2Value && pos2Value === pos3Value) {
                console.log(pos1Value + " is Winner");
                winner = pos1Value;
                win.play();
                boxes[pattern[0]].style.backgroundColor = "#FFE382";
                boxes[pattern[1]].style.backgroundColor = "#FFE382";
                boxes[pattern[2]].style.backgroundColor = "#FFE382";
                boxes.forEach((box) => {
                    box.disabled = true;
                });
                winnerCard.innerText = `${pos1Value} is winner`
                newGameButton.style.display = 'inline';
                reset.style.display = 'none';
            }
        } 
        else {
            winner = "";
        }
    }
};

newGameButton.addEventListener('click',() =>{
    boxes.forEach((box) => {
        box.innerText = '';
        box.disabled = false;
        box.style.backgroundColor = '#AAD9BB';
        newGameButton.style.display = 'none';
        winnerCard.innerText = '';
    })
})