let targetDate = new Date("Feb 6, 2026 00:00:00").getTime();
let pages = ["page1","page2","page3","page4","page5"];
let currentPage = 0;

/* Countdown */
setInterval(() => {
  let now = new Date().getTime();
  let distance = targetDate - now;

  if(distance > 0){
    let days = Math.floor(distance / (1000*60*60*24));
    let hrs = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
    let mins = Math.floor((distance % (1000*60*60))/(1000*60));
    let secs = Math.floor((distance % (1000*60))/1000);
    document.getElementById("countdown").innerHTML = `⏳ ${days}d ${hrs}h ${mins}m ${secs}s`;
  } else {
    document.getElementById("countdown").innerHTML = "🎉 Gift Unlocked!";
  }
}, 1000);

/* Tap Gift Early - Activity */
function tapGiftEarly(){
  let now = new Date().getTime();
  if(now < targetDate){
    document.getElementById("earlyMsg").classList.remove("hidden");
    document.getElementById("options").classList.remove("hidden");
  } else unlockSurprise();
}

/* Option choice */
function chooseOption(answer){
  if(!answer){
    document.getElementById("stopMsg").classList.remove("hidden");
    document.getElementById("options").classList.add("hidden");
  } else unlockSurprise();
}

/* Unlock surprise pages */
function unlockSurprise(){
  document.getElementById("activityScreen").classList.remove("active");
  document.getElementById(pages[currentPage]).classList.add("active");
  startConfetti();
}

/* Next page */
function nextPage(){
  document.getElementById(pages[currentPage]).classList.remove("active");
  currentPage++;
  if(currentPage < pages.length){
    document.getElementById(pages[currentPage]).classList.add("active");
  }
}

/* Restart */
function restart(){
  document.getElementById(pages[currentPage]).classList.remove("active");
  currentPage=0;
  document.getElementById("activityScreen").classList.add("active");
}

/* 🎉 Confetti Animation */
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = [];
  for(let i=0;i<150;i++){
    confetti.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height- canvas.height,
      r: Math.random()*6+4,
      d: Math.random()*20+10,
      color: `hsl(${Math.random()*360},100%,50%)`,
      tilt: Math.random()*10-10
    });
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach(c=>{
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt, c.y);
      ctx.lineTo(c.x + c.tilt + c.r/2, c.y + c.tilt + c.r/2);
      ctx.stroke();
    });
    update();
  }

  function update(){
    confetti.forEach(c=>{
      c.y += Math.cos(0.01 + c.d/2) +1 + c.r/2;
      c.x += Math.sin(0.01) *2;
      if(c.y > canvas.height){
        c.y = -10;
        c.x = Math.random()*canvas.width;
      }
    });
  }

  setInterval(draw,20);
}
