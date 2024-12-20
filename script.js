const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const bgm = document.getElementById('bgm');
const startBtn = document.getElementById('startBtn');

// 게임 상태
let gameRunning = false;
let circleX = 100;
let circleY = canvas.height / 2;
let speed = 4;
let hit = false;

// 게임 루프
function gameLoop() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 원 그리기
  ctx.fillStyle = hit ? 'blue' : 'red';
  ctx.beginPath();
  ctx.arc(circleX, circleY, 20, 0, Math.PI * 2);
  ctx.fill();

  // 원 이동
  circleX += speed;
  if (circleX > canvas.width) circleX = 0;

  hit = false; // 초기화

  requestAnimationFrame(gameLoop);
}

// 게임 시작
startBtn.addEventListener('click', () => {
  if (!gameRunning) {
    gameRunning = true;
    bgm.play();
    gameLoop();
  }
});

// 키 입력 판정
document.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    // 타이밍이 맞았는지 판정
    if (Math.abs(circleX - canvas.width / 2) < 20) {
      hit = true;
      console.log('Perfect Hit!');
    } else {
      console.log('Miss!');
    }
  }
});
