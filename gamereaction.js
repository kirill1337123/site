
document.getElementById('button-start-game').onclick = startGame;
document.getElementById('button-restart-game').onclick = restartGame;

let td_id_now, count = 0, howmanytryes = 10, gamego = false, timego = false;
let rowcount = 10, end = "GAMEOVER", bestscore = 0;
let seconds = new Array(howmanytryes);
var base = 60;
var clocktimer, dateObj, dh, dm, ds, ms;
var readout = '';
var h = 1,
  m = 1,
  tm = 1,
  s = 0,
  ts = 0,
  ms = 0,
  init = 0;

//функция для очистки поля
function ClearСlock() {
  clearTimeout(clocktimer);
  h = 1;
  m = 1;
  tm = 1;
  s = 0;
  ts = 0;
  ms = 0;
  init = 0;
  readout = '00:00:00';
  document.MyForm.stopwatch.value = readout;
}

//функция для старта секундомера
function StartTIME() {
  var cdateObj = new Date();
  var t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
  if (t > 999) {
    s++;
  }
  if (s >= (m * base)) {
    ts = 0;
    m++;
  } else {
    ts = parseInt((ms / 100) + s);
    if (ts >= base) {
      ts = ts - ((m - 1) * base);
    }
  }
  if (m > (h * base)) {
    tm = 1;
    h++;
  } else {
    tm = parseInt((ms / 100) + m);
    if (tm >= base) {
      tm = tm - ((h - 1) * base);
    }
  }
  ms = Math.round(t / 10);
  if (ms > 99) {
    ms = 0;
  }
  if (ms == 0) {
    ms = '00';
  }
  if (ms > 0 && ms <= 9) {
    ms = '0' + ms;
  }
  if (ts > 0) {
    ds = ts;
    if (ts < 10) {
      ds = '0' + ts;
    }
  } else {
    ds = '00';
  }
  dm = tm - 1;
  if (dm > 0) {
    if (dm < 10) {
      dm = '0' + dm;
    }
  } else {
    dm = '00';
  }
  dh = h - 1;
  if (dh > 0) {
    if (dh < 10) {
      dh = '0' + dh;
    }
  } else {
    dh = '00';
  }
  readout = dh + '' + dm + '' + ds + '' + ms;
  document.MyForm.stopwatch.value = readout;
  clocktimer = setTimeout("StartTIME()", 1);
}

//Функция запуска и остановки
function StartStop() {
  if (init == 0) {
    ClearСlock();
    dateObj = new Date();
    StartTIME();
    init = 1;
  } else {
    clearTimeout(clocktimer);
    init = 0;
  }
}


createTable()

function createTable(){
    let table_obj = document.getElementById('table-game-id'); 
    table_obj.innerHTML = ""; // удаление таблицы
    for (let i = 0; i < rowcount; i++) {
        let tr_obj = document.createElement('tr');
        for (let j = 0; j < rowcount; j++) {
            let td_obj = document.createElement('td');
            tr_obj.append(td_obj);
        }
        table_obj.append(tr_obj);
    }
    fillTable();
}

function fillTable(){
    let tds_collection = document.getElementsByTagName('td');
    let arr = new Array(tds_collection.length);
    //alert(tds_collection.length);
    
    for(let i = 0; i < arr.length; i++){
        arr[i] = i + 1;
        
    }
    //alert(arr);
    for (let i = 0; i < tds_collection.length; i++) {
        let td_obj = tds_collection[i];
        //td_obj.innerHTML = arr[i];
        td_obj._id = arr[i];
       td_obj.onclick = tdClick;

    } 
    
    //alert(tds_collection[50]);
}

function startGame(){
    //createTable();
   // alert(127/100)
    if(gamego == false)
    {
        clearCells();
        count = 0;
        clearMas(seconds);
        gamego = true;
        document.getElementById('button-restart-game').disabled = false;
        //alert(Math.floor((Math.random() * 100) + 1));
        setTimeout(() => {
            StartStop();
            //timego = true;
            GenerateCell();
            
        }, 1000)
    }
    
    

}

function clearCells(){
    let tds_collection = document.getElementsByTagName('td');
    for (let i = 0; i < tds_collection.length; i++) {
        let td_obj = tds_collection[i];
        td_obj.innerHTML = "";
        td_obj.style.backgroundColor = "#7fffd4";
            //alert(td_id_now + "+" + i + "+" + td_obj._id);
    
       //td_obj.onclick = tdClick; 
        }
}

function restartGame(){
    gamego = false;
    startGame();

}

function clickonbuttonStart(){
    const result = confirm('Вы уже играете. Начать заново?');
    if (result) {
    gamego = false;
    startGame();
    } else {
    
    }
}


function tdClick(event){
    let td_obj = event.target;
    let conint = JSON.stringify(document.MyForm.stopwatch.value); // в строку
    conint = conint.replace(/"/g, ''); // без ""
    //td_obj.innerHTML = td_obj._id;
    //modalWindow()
    if(Number(conint) >= 180000)
        {
            alert("Превышен лимит времени! Игра начнется заново.");
            startGame();
        }
    //alert(td_obj._id);
    //alert(td_id_now);
    //alert(td_obj._id + "+" + td_id_now);
    if(td_obj._id == td_id_now){
        
        td_obj.style.backgroundColor = "#7fffd4";
        seconds[count] = Number(conint); // запись в массив числом
        count++;
        GenerateCell();
      //alert(Number("12"));
        //alert(JSON.stringify(seconds[i]));
        if(count >= howmanytryes){
            let j = 0, startext = 33, continuetext = 63;
            count = 0;
            
            document.getElementById('button-restart-game').disabled = true;
            let tds_collection = document.getElementsByTagName('td');
            for(let i = 0; i < tds_collection.length; i++){
                let td_ob = tds_collection[i];
                td_ob.style.backgroundColor = "#333391";
                td_ob.disabled = true;
                if(startext == i){
                    td_ob.style.color = "#7fffd4";
                    td_ob.style.fontSize = "1.5em";
                    td_ob.innerHTML = end[j]; 
                    j++;
                    if(startext != 36) startext++;
                }
                if(continuetext == i){
                    td_ob.style.color = "#7fffd4";
                    td_ob.style.fontSize = "1.5em";
                    td_ob.innerHTML = end[j]; 
                    j++;
                    if(continuetext != 66) continuetext++;
                }
            }
            //let score = generateScore(seconds);
            document.getElementById('result-account-count').innerHTML = generateScore(seconds)+ " sec";
            document.getElementById('your-results-score').innerHTML = bestscore + " sec";
            StartStop();
            gamego = false;

        } 
        
    }
        //alert("DA");
   // else td_obj.style.backgroundColor = "#333391";
   // td_obj.innerHTML = td_obj._id;
    //alert(td_obj);
}

function generateScore(arr){
    let score = 0.0;
    for(let i = 0; i < arr.length; i++)
        if(i!=arr.length-1)
       score += (arr[i+1] - arr[i])/(howmanytryes-1); 
       score /= 100;
       score = score.toFixed(3);
      if(bestscore != 0){
        if(score < bestscore) bestscore = score
      }
      else bestscore = score;
    return score;
}

function randomInt() {
    // случайное число от min до (max+1)
    let rand = (Math.random() * 100)+1;
    return Math.floor(rand);
  }

function GenerateCell(){
    td_id_now = randomInt();
    //alert(ri);
    let tds_collection = document.getElementsByTagName('td');
    for (let i = 0; i < tds_collection.length; i++) {
        let td_obj = tds_collection[i-1];
        
        if(td_id_now == i)
            td_obj.style.backgroundColor = "#333391";
            //alert(td_id_now + "+" + i + "+" + td_obj._id);
    
       //td_obj.onclick = tdClick; 
        }
}

function clearMas(array){
    for(let i = 0; i < array.length; i++)
        array[i] = 0;
}