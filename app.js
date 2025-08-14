const realCount = 600;   // 0-599
const fakeCount = 200;   // 0-199

let score = 0;
let total = 0;
let pair = [];           // [{src,label}, {src,label}]

const img0   = document.getElementById('img0');
const img1   = document.getElementById('img1');
const msgBox = document.getElementById('message');
const scoreEl= document.getElementById('score');

const SHARE_URL = "https://dinablachman.github.io/realorfake/";

function formatShareText(correct, total) {
  const pct = total ? Math.round((correct / total) * 100) : 0;
  return `i scored ${correct}/${total} (${pct}%) on "does this person exist?" — can you beat me?\n${SHARE_URL}`;
}

async function shareScore(correct, total) {
  const text = formatShareText(correct, total);

  // 1) native share if available
  if (navigator.share) {
    const shareData = { 
      title: "does this person exist?", 
      text: text, 
      url: SHARE_URL 
    };
    
    try {
      console.log('Attempting Web Share API...');
      await navigator.share(shareData);
      console.log('Web Share API successful');
      return;
    } catch (e) {
      console.log('Web Share API failed:', e.name, e.message);
      // Continue to fallback
    }
  } else {
    console.log('Web Share API not available');
  }

  // 2) copy to clipboard
  try {
    console.log('Attempting clipboard copy...');
    await navigator.clipboard.writeText(text);
    showToast("copied!");
    console.log('Clipboard copy successful');
    return;
  } catch (e) {
    console.log('Clipboard copy failed:', e.name, e.message);
    // 3) last resort: prefilled twitter link
    const tw = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text);
    window.open(tw, "_blank", "noopener,noreferrer");
  }
}

function showToast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.style.display = "inline";
  setTimeout(() => (el.style.display = "none"), 1500);
}

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
  const percentage = total > 0 ? ((score / total) * 100).toFixed(1) : '0.0';
  scoreEl.textContent=`score: ${score} / ${total} (${percentage}%)`;

  setTimeout(newPair,1200);
}

img0.addEventListener('click',()=>handle(0));
img1.addEventListener('click',()=>handle(1));

// Wire up share functionality
document.getElementById("share").addEventListener("click", (e) => {
  e.preventDefault();
  shareScore(score, total);
});

newPair();
