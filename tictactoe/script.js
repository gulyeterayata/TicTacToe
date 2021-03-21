const blocks = document.querySelectorAll(".block");
const playerText = document.getElementById("player");
const errorText = document.getElementById("error");
let player = "X";
let gameOver = false;
const kazanan = document.getElementById("Kazanan")
let winner;
const scorX = document.getElementById("score-X");
const scorY = document.getElementById("score-O");
var scorejson = JSON.parse(localStorage.getItem('localscore'));
let scoreX = parseInt(scorejson['x']);
let scoreY = parseInt(scorejson['o']);

/////////////////////////////////////

const playerText2 = document.getElementById("player2");
let player2 = "O";
var scorejson2 = JSON.parse(localStorage.getItem('localscore2'));
let ScoreX = parseInt(scorejson2['x']);
let ScoreY = parseInt(scorejson2['o']);




//////////////////////////////////





var btnGizle=document.getElementById("O-choose");
btnGizle.onclick=function(){
player = "O";
document.getElementById("choose").style.display="none";
document.getElementById("girissayfasi").style.display="none";

startGame();
}


var btnGizle=document.getElementById("X-choose");

btnGizle.onclick=function(){
document.getElementById("choose").style.display="none";
document.getElementById("girissayfasi").style.display="none";

startGame();
}



function startGame() {
    document.getElementById("score-X").innerHTML = scoreX;
    document.getElementById("score-O").innerHTML = scoreY;
    playerText.textContent = `${player}'in Sırası!` //ekrana X'in sırası yazar.
//bloklar clicklendiğinde chooseArea fonksiyonunu calıstır.
    blocks.forEach(block => block.addEventListener("click", () => chooseArea(block)));
}


 // Blok kontrolü;
function chooseArea(block) {
    if (block.textContent === "") { //bloğun boş olup olmadığını kontrol ediyor. Boşsa yazıyor, doluysa ve yazmaya calısıyorsa hata veriyor.
        block.textContent = player; 
        if (player === "O") {
            block.style.color = "red" // sıra O da iken renk kırmızı olsun.
        }
        turnPlayer();
    } else {
        errorText.textContent = " Dolu! "
        block.style.border = "2px solid red"
        setTimeout(() => {  //2.5 sanıye error verıp kırmızı oluyor sonra eskı haline donuyor.
            errorText.textContent = ""
            block.style.border = "1px solid black"
        }, 2500)
    }

    checkWin();
    checkTie();

    if (gameOver) {
        playerText.style.color="red";
        playerText.style.fontSize="30px";
        playerText.textContent = ` ${winner} Kazandı!`;
        konfeti();
        blocks.forEach(block => block.style.pointerEvents = 'none');
    }


}


function konfeti(){

    document.getElementById("kazanandiv").style.display="block";
    kazanan.textContent = ` ${winner} Kazandı!`;

}




   

function turnPlayer() { // X ve O yu yazdıran fonksiyon
    if (player === "X") {
        player = "O";
        playerText.textContent = `${player}'nun Sırası !`
        return;
    } else if (player === "O") {
        player = "X";
        playerText.textContent = `${player}'in Sırası!`

    }
}



function checkWin() {
    winner = checkRows()

    if(!winner){
        winner = checkColumns()
    }
    
    if(!winner)
    winner = checkDiagonals()


    if (winner === 'X'){
        scoreX += 1;
        scorX.textContent = `${scoreX}`
        var testObject = { 'x': `${scoreX}`, 'o': `${scoreY}`};
    localStorage.setItem('localscore', JSON.stringify(testObject));
    var scorejson = JSON.parse(localStorage.getItem('localscore'));
    }
    else if (winner === 'O') {
        scoreY += 1;
        scorY.textContent = `${scoreY}`
        var testObject = { 'x': `${scoreX}`, 'o': `${scoreY}`};
    localStorage.setItem('localscore', JSON.stringify(testObject));
    var scorejson = JSON.parse(localStorage.getItem('localscore'));
    }    
    



}




function checkTie() {
    // tie
    const values = [];
    blocks.forEach(block => values.push(block.textContent))
    if (!values.includes("")) {
        playerText.textContent = "Berabere!";
        blocks.forEach(block => block.style.pointerEvents = 'none');
    }
}

function checkRows() {
    // check rows
    let row1 = blocks[0].textContent == blocks[1].textContent &&
        blocks[0].textContent == blocks[2].textContent && blocks[0].textContent !== ""
    let row2 = blocks[3].textContent == blocks[4].textContent &&
        blocks[3].textContent == blocks[5].textContent && blocks[3].textContent !== ""
    let row3 = blocks[6].textContent == blocks[7].textContent &&
        blocks[6].textContent == blocks[8].textContent && blocks[6].textContent !== ""

    if (row1 || row2 || row3) {
        gameOver = true
    }
    if (row1){
        document.getElementById("top-yatay").style.display="block";
        return winner = blocks[0].textContent
    } 
    if (row2){
        document.getElementById("mid-yatay").style.display="block";
        return winner = blocks[3].textContent
    } 
    if (row3){
        document.getElementById("bottom-yatay").style.display="block";
        return winner = blocks[6].textContent
    }

    
}

function checkColumns() {
    // check cols
    let col1 = blocks[0].textContent == blocks[3].textContent &&
        blocks[0].textContent == blocks[6].textContent && blocks[0].textContent !== ""
    let col2 = blocks[1].textContent == blocks[4].textContent &&
        blocks[1].textContent == blocks[7].textContent && blocks[1].textContent !== ""
    let col3 = blocks[2].textContent == blocks[5].textContent &&
        blocks[2].textContent == blocks[8].textContent && blocks[2].textContent !== ""

    if (col1 || col2 || col3) {
        gameOver = true
    }
    if (col1){
        document.getElementById("left-dikey").style.display="block";
        return winner = blocks[0].textContent;
    } 

    if (col2){

        document.getElementById("mid-dikey").style.display="block";
        return winner = blocks[1].textContent
    } 
    if (col3){

        document.getElementById("right-dikey").style.display="block";
        return winner = blocks[2].textContent
    } 

    
}

function checkDiagonals() {
    // check diag
    let dia1 = blocks[0].textContent == blocks[4].textContent &&
        blocks[0].textContent == blocks[8].textContent && blocks[0].textContent !== ""
    let dia2 = blocks[2].textContent == blocks[4].textContent &&
        blocks[2].textContent == blocks[6].textContent && blocks[2].textContent !== ""

    if (dia1 || dia2) {
        gameOver = true
    }
    if (dia1){
        document.getElementById("ltr-capraz").style.display="block";
        return winner = blocks[0].textContent

    } 
    if (dia2){
        document.getElementById("rtl-capraz").style.display="block";
        return winner = blocks[2].textContent

    } 

   
}
     


document.getElementById("btn")
.onclick = function(){
    var testObject = { 'x': 0, 'o': 0};
    localStorage.setItem('localscore', JSON.stringify(testObject));
window.setTimeout(function(){location.href = 'index.html';}, 1000);

};


document.getElementById("newgame")
.onclick = function(){
window.setTimeout(function(){location.href = 'index.html';}, 1000);

};









