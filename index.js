let player1=false;
let player2=false;
let gameEnd=false;
let p1Wins=0,p2Wins=0,draws=0;
function randomAssign(){
    let r=Math.floor(Math.random()*2);
    if(r) player1=true;
    else player2=true;
    document.getElementById("message").innerHTML="-PLAYER "+(r+1)+"-";
}
let arr=[[" "," "," "],[" "," "," "],[" "," "," "]];
function swap(){
    if(player1) {
        player1=false;
        player2=true;        
    }
    else{
        player1=true;
        player2=false;
    }
}
randomAssign();
function checkStatus(){
    if(player1) {
        document.getElementById("message").innerHTML="-PLAYER 1-";
        let p1= document.getElementsByClassName("player1")[0];
        p1.innerHTML="PLAYER1<br><hr> WON:"+p1Wins; 
    }
    if(player2) {
        document.getElementById("message").innerHTML="-PLAYER 2-";
        let p2= document.getElementsByClassName("player2")[0];
        p2.innerHTML="PLAYER2<br><hr> WON:"+p2Wins; 
    }
    //for rows
    for(let i=0;i<3;i++){
        if(arr[i][0]!=" "&&arr[i][0]==arr[i][1]&&arr[i][1]==arr[i][2]){
            return arr[i][0];
        }
    }
    //for cols
    for(let i=0;i<3;i++){
        if(arr[0][i]!=" "&&arr[0][i]==arr[1][i]&&arr[1][i]==arr[2][i]){
            return arr[0][i];
        }
    }
    //for lr diagonal
    if(arr[0][0]!=" "&&arr[0][0]==arr[1][1]&&arr[1][1]==arr[2][2]){
        return arr[0][0];
    }
    //for rl diagonal
    if(arr[0][2]!=" "&&arr[0][2]==arr[1][1]&&arr[1][1]==arr[2][0]){
        return arr[0][2];
    }
    //to check draw
    let ct=0;
    for(let i=0;i<3;i++) for(let j=0;j<3;j++) if(arr[i][j]!=" ") ct++;
    if(ct==9) return "D";
    return " ";
}
function getSign(){
    if(player1) return "X";
    else return "O";
}
function changeMatrix(id){
    switch(id){
        case "b1":arr[0][0]=getSign();
        break;
        case "b2":arr[0][1]=getSign();
        break;
        case "b3":arr[0][2]=getSign();
        break;
        case "b4":arr[1][0]=getSign();
        break;
        case "b5":arr[1][1]=getSign();
        break;
        case "b6":arr[1][2]=getSign();
        break;
        case "b7":arr[2][0]=getSign();
        break;
        case "b8":arr[2][1]=getSign();
        break;
        case "b9":arr[2][2]=getSign();
        break;        
    }
}
for(let i=0;i<9;i++){    
    let ct=0;
    document.getElementById("b"+(i+1)).addEventListener("click",function(){
        
        if(player1){
            let audio= new Audio("sounds/ting.wav");
            audio.play();
        }else {
            let audio= new Audio("sounds/tong.wav");
            audio.play();
        }
        if(this.innerHTML==" ") {
            let btnName= this.id; 
            this.innerHTML=getSign();
            changeMatrix(btnName);
            swap(player1,player2);
            let currStatus=checkStatus();
            if(currStatus=="X") {
                p1Wins++;
                document.getElementsByClassName("player1")[0].innerHTML="PLAYER1<br><hr> WON:"+p1Wins;
                setTimeout(() => {
                    document.getElementById("message").innerHTML="🎌🥳PLAYER 1 WINS";   
                    let audio= new Audio("sounds/p1win.wav");
                    audio.play();               
                }, 100);
                gameEnd=true;
            }
            else if(currStatus=="O"){
                p2Wins++;
                document.getElementsByClassName("player2")[0].innerHTML="PLAYER2<br><hr> WON:"+p2Wins;
                setTimeout(() => {
                    document.getElementById("message").innerHTML="PLAYER 2 WINS🎌🥳";
                    let audio= new Audio("sounds/p2win.wav");
                    audio.play();                   
                }, 100);
                gameEnd=true;
            }
            else if(currStatus=="D"){
                draws++;
                document.getElementsByClassName("draw")[0].innerHTML="DRAW<br><hr>"+draws;
                setTimeout(() => {
                    document.getElementById("message").innerHTML="🤖IT'S A DR-AWW🤖";   
                    let audio= new Audio("sounds/draw.wav");
                    audio.play();                 
                }, 100);
                gameEnd=true;
            }

        }        
        else{
            console.log(this.innerHTML);
            if(ct>2) alert("please click on empty cells!");
            else ct++;
        }
        
        setTimeout(() => {
            if(gameEnd){
                arr=[[" "," "," "],[" "," "," "],[" "," "," "]];
                for(let i=0;i<9;i++){
                    document.getElementById("b"+(i+1)).innerHTML=" ";
                }
                randomAssign();                
                gameEnd=false;
            }
            
        }, 6200);
        
        
    })
}
