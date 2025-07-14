const realCount = 600;   // 0-599
const fakeCount = 200;   // 0-199

let score = 0;
let total = 0;
let pair = [];           // [{src,label}, {src,label}]

const img0   = document.getElementById('img0');
const img1   = document.getElementById('img1');
const msgBox = document.getElementById('message');
const scoreEl= document.getElementById('score');

function rand(n){return Math.floor(Math.random()*n);}

function newPair(){
  const real = {src:`data/real/${rand(realCount)}.jpg`, label:'real'};
  const fake = {src:`data/fake/fake_${rand(fakeCount)}.jpg`, label:'fake'};
  pair = Math.random()<.5 ? [real,fake] : [fake,real];

  // reset borders & load
  [img0,img1].forEach(img=>{
    img.className='face';
  });
  img0.src = pair[0].src;
  img1.src = pair[1].src;
}

function flash(msg,isSuccess){
  msgBox.textContent = msg;
  msgBox.className = isSuccess ? 'success' : 'error';
  msgBox.style.display='block';
  setTimeout(()=>msgBox.style.display='none',1000);
}

function handle(index){
  const correct = pair[index].label==='real';
  if(correct){
    (index===0?img0:img1).classList.add('correct');
  }else{
    (index===0?img0:img1).classList.add('incorrect');
  }

  flash(correct?'correct!':'incorrect! this face is AI-generated.',correct);
  total++; if(correct) score++;
  scoreEl.textContent=`score: ${score} / ${total}`;

  setTimeout(newPair,1200);
}

img0.addEventListener('click',()=>handle(0));
img1.addEventListener('click',()=>handle(1));

newPair();
