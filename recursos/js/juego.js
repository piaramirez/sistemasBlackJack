//alert("Estamos dentro");
//let dec = ['red_back.','2C.png','2D.png','2H.png', '2S.png', '3C.png', '3D.png', '3H.png', '3S.png', '4C.png', '4D.png', '4H.png', '4S.png', '5C.png', '5D.png', '5H.png', '5S.png', '6C.png', '6D.png', '6H.png', '6S.png', '7C.png', '7D.png', '7H.png', '7S.png', '8C.png', '8D.png', '8H.png', '8S.png', '9C.png', '9D.png', '9H.png', '9S.png', '10C.png', '10D.png', '10H.png', '10S.png', 'AC.png', 'AD.png', 'AH.png', 'AS.png', 'grey_back.png', 'JC.png', 'JD.png', 'JH.png', 'JS.png', 'KC.png', 'KD.png', 'KH.png', 'KS.png', 'QC.png', 'QD.png', 'QH.png', 'QS.png'];
let dec = [];
const tipos  = ['C', 'D', 'H', 'S'];
const especiales  = ['A', 'J', 'Q', 'K'];
const btnpedir = document.querySelector('#btnpedir');
const btndetener = document.querySelector('#btndetener');
const btnnuevo = document.querySelector('#btnnuevo');
let puntosJugador = 0, 
    puntoscompu = 0;
const puntosHTML = document.querySelectorAll('small');
const divCartajugador =  document.querySelector('#jugadorCartas');
const divCartasComputadora = document.querySelector('#jugadorPC');

// Esta función crea un nuevo desk
const creardes = () => {
    for(let i = 2; i<=10; i++){
        for(let tipo of tipos){
            dec.push(i + tipo);
        }
    }
    for(let tipo of tipos){
        for(let esp of especiales){
            dec.push(esp + tipo);
        }
    }
    //console.log(dec);
    dec = _.shuffle(dec);
    console.log(dec);
    return dec;
}
creardes();
//Esta función me permite tomar una carta
const pedirCarta = ()=>{
    if(dec.length === 0){
        throw 'No hay más cartas en el deck';
    }
    const carta = dec.pop();
    //console.log(carta);
    //console.log(dec);
    return carta;
}
// pedir carta
const valorCarta = (carta) =>{
    const valor  =  carta.substring(0, carta.length-1);
    return (isNaN(valor)) ? 
            (valor  == 'A') ? 11:10
            :valor *1;
}   
const valor = valorCarta(pedirCarta());
//console.log({valor});
btnpedir.addEventListener('click', function(){
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;
    const imgCarta = document.createElement('img');
    imgCarta.src= `recursos/img/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartajugador.append(imgCarta);
    if(puntosJugador > 21){
        console.warn('Lo siento, perdiste');
        alert('perdedor');
        btnpedir.disabled = true;
        btndetener.disabled =true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador === 21){
        alert('siuuu');
        console.warn('Siuuu, ganaste');
        turnoComputadora(puntosJugador);
        btndetener.disabled =true;
    }
});
const turnoComputadora = (puntosminimos) => {
    do{
        const carta = pedirCarta();
        puntoscompu = puntoscompu + valorCarta(carta);
        puntosHTML[1].innerText = puntoscompu;
        const imgCarta = document.createElement('img');
        imgCarta.src= `recursos/img/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        if(puntosminimos > 21){
            break;
        }
    }while((puntoscompu < puntosminimos) && (puntoscompu <= 21));
    setTimeout(()=>{
        if(puntoscompu  === puntosminimos){
            alert('nadie gana :(');
        }else if(puntosminimos > 21){
            alert('gano la pc, manco');
        }else if(puntoscompu > 21){
            alert('gana el manco');
        }else{
            alert('gano la pc, manco');
        }
    },10);

}
btndetener.addEventListener('click', ()=>{
    btnpedir.disabled  = true;
    btndetener.disabled =true;
    turnoComputadora(puntosJugador);
});
btnnuevo.addEventListener('click',  () => {
    dec = creardes();
    puntosJugador = 0;
    puntoscompu =0;
    puntosHTML[0].innerHTML=0;
    puntosHTML[1].innerHTML=0;
    divCartasComputadora.innerHTML = '';
    divCartajugador.innerHTML = '';
    btndetener.disabled = false;
    btnpedir.disabled=false;
});