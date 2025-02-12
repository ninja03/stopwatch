import { useEffect, useState, useRef } from "preact/hooks";
import * as THREE from "three";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]); // ラップタイムを格納する配列
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const clockRef = useRef<THREE.Mesh | null>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number>();
  const displayMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);

  // ラップタイム記録関数
  const recordLap = () => {
    setLaps([...laps, time]);
  };

  // ストップウォッチのロジック
  useEffect(() => {
    let intervalId: number | undefined;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  // 3Dシーンのセットアップ
  useEffect(() => {
    if (!canvasRef.current) return;

    // シーンのセットアップ
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      1, // アスペクト比を1:1に固定
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });

    renderer.setSize(600, 600);
    renderer.setClearColor(0x000000, 0);
    camera.position.z = 4;
    camera.position.y = 0.5;

    // 時計の3Dオブジェクトを作成
    const geometry = new THREE.BoxGeometry(4.5, 1.3, 0.1);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffcc00,
      transparent: true,
      opacity: 0.95,
      shininess: 100
    });
    const clock = new THREE.Mesh(geometry, material);
    scene.add(clock);

    // 光源を追加
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 時計の表示面を作成
    const displayGeometry = new THREE.PlaneGeometry(4.3, 1.1);
    const displayMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 1
    });
    displayMaterialRef.current = displayMaterial;
    const displayPlane = new THREE.Mesh(displayGeometry, displayMaterial);
    displayPlane.position.z = 0.06;
    clock.add(displayPlane);

    // ディスプレイキャンバスの作成
    const displayCanvas = document.createElement("canvas");
    displayCanvas.width = 1024;
    displayCanvas.height = 256;
    displayCanvasRef.current = displayCanvas;
    displayMaterial.map = new THREE.CanvasTexture(displayCanvas);

    // 参照を保存
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    clockRef.current = clock;

    // アニメーションループ
    let frame = 0;
    const animate = () => {
      if (!clockRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      frame += 0.01;
      
      // なめらかな浮遊アニメーション
      clockRef.current.position.y = Math.sin(frame) * 0.1;
      clockRef.current.rotation.y = Math.sin(frame * 0.5) * 0.1;

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    updateClockTexture();

    // リサイズハンドラ
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      const width = 600;
      const height = 600;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      renderer.dispose();
    };
  }, []);
  
  // マウスのスクロールホイールによる拡大縮小操作
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (cameraRef.current) {
        const zoomSpeed = 0.001;
        cameraRef.current.zoom -= event.deltaY * zoomSpeed;
        cameraRef.current.zoom = Math.max(0.5, Math.min(cameraRef.current.zoom, 5));
        cameraRef.current.updateProjectionMatrix();
      }
    };
    canvas.addEventListener("wheel", handleWheel);
    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, []);
  
  // マウスのドラッグによる時計回転
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    const rotationSpeed = 0.005;
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        isDragging = true;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && clockRef.current) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
        clockRef.current.rotation.y -= deltaX * rotationSpeed;
        clockRef.current.rotation.x -= deltaY * rotationSpeed;
      }
    };
    const handleMouseUp = () => {
      isDragging = false;
    };
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseUp);
    };
  }, []);

  // timeが変更されたときにテクスチャを更新
  useEffect(() => {
    updateClockTexture();
  }, [time]);

  // セグメント表示用の数字を描画
  const drawSegmentNumber = (ctx: CanvasRenderingContext2D, num: string, x: number) => {
    const segmentWidth = 60;
    const segmentHeight = 20;
    const spacing = 15;
    const color = "#00ff00"; // より鮮やかな緑色

    // 数字の各セグメントを描画
    const segments = {
      '0': [1,1,1,1,1,1,0],
      '1': [0,1,1,0,0,0,0],
      '2': [1,1,0,1,1,0,1],
      '3': [1,1,1,1,0,0,1],
      '4': [0,1,1,0,0,1,1],
      '5': [1,0,1,1,0,1,1],
      '6': [1,0,1,1,1,1,1],
      '7': [1,1,1,0,0,0,0],
      '8': [1,1,1,1,1,1,1],
      '9': [1,1,1,1,0,1,1],
      ':': [],
      '.': []
    };

    if (num === ':') {
      ctx.fillStyle = color;
      ctx.fillRect(x - 12, 50, 24, 24);
      ctx.fillRect(x - 12, 110, 24, 24);
      return;
    }

    if (num === '.') {
      ctx.fillStyle = color;
      ctx.fillRect(x - 12, 140, 24, 24);
      return;
    }

    const segs = segments[num as keyof typeof segments];
    if (!segs) return;

    ctx.fillStyle = color;
    
    // 上
    if (segs[0]) ctx.fillRect(x, 20, segmentWidth, segmentHeight);
    // 右上
    if (segs[1]) ctx.fillRect(x + segmentWidth - segmentHeight, 20 + spacing, segmentHeight, segmentWidth/2);
    // 右下
    if (segs[2]) ctx.fillRect(x + segmentWidth - segmentHeight, 20 + spacing + segmentWidth/2, segmentHeight, segmentWidth/2);
    // 下
    if (segs[3]) ctx.fillRect(x, 20 + spacing + segmentWidth, segmentWidth, segmentHeight);
    // 左下
    if (segs[4]) ctx.fillRect(x, 20 + spacing + segmentWidth/2, segmentHeight, segmentWidth/2);
    // 左上
    if (segs[5]) ctx.fillRect(x, 20 + spacing, segmentHeight, segmentWidth/2);
    // 中央
    if (segs[6]) ctx.fillRect(x, 20 + spacing + segmentWidth/2, segmentWidth, segmentHeight);
  };

  // 時計のテクスチャを更新
  const updateClockTexture = () => {
    if (!displayCanvasRef.current || !displayMaterialRef.current?.map) return;

    const ctx = displayCanvasRef.current.getContext("2d");
    if (!ctx) return;

    // キャンバスをクリア
    ctx.clearRect(0, 0, 1024, 256);

    // 黒背景
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 1024, 256);

    // 時間の計算
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    // 数字を描画
    const timeStr = `${formatNumber(hours, 2)}:${formatNumber(minutes, 2)}:${formatNumber(seconds, 2)}.${formatNumber(milliseconds, 2)}`;

    let xPos = 120;
    const spacing = 140;

    for (let i = 0; i < timeStr.length; i++) {
      drawSegmentNumber(ctx, timeStr[i], xPos);
      if (timeStr[i] === ':' || timeStr[i] === '.') {
        xPos += spacing * 0.5;
      } else {
        xPos += spacing;
      }
    }

    // テクスチャの更新
    displayMaterialRef.current.map.needsUpdate = true;
  };

  return (
    <div class="text-center">
      <canvas
        ref={canvasRef}
        class="mx-auto mb-4 rounded-lg shadow-lg bg-transparent"
      />
      <div class="space-x-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          class={`w-16 h-16 rounded-full font-bold text-white shadow-lg transform transition-all duration-200 ${isRunning ? "bg-red-600 hover:bg-red-700 active:scale-95" : "bg-green-600 hover:bg-green-700 active:scale-95"}`}
        >
          {isRunning ? "停止" : "開始"}
        </button>
        <button
          onClick={() => {
            setTime(0);
            setIsRunning(false);
            setLaps([]);
          }}
          class="w-16 h-16 rounded-full bg-gray-600 hover:bg-gray-700 text-white font-bold shadow-lg transform transition-all duration-200 active:scale-95"
        >
          リセット
        </button>
        <button
          onClick={recordLap}
          class="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transform transition-all duration-200 active:scale-95"
          disabled={!isRunning}
        >
          ラップ
        </button>
      </div>
      {/* ラップタイム表示領域 */}
      <div class="mt-4">
        {laps.map((lap, index) => (
          <div key={index} class="text-lg text-gray-300">
            ラップ {index + 1}: {formatTime(lap)}
          </div>
        ))}
      </div>
    </div>
  );
}

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return `${formatNumber(hours, 2)}:${formatNumber(minutes, 2)}:${formatNumber(seconds, 2)}.${formatNumber(milliseconds, 2)}`;
};

const formatNumber = (num: number, digits: number) => {
  return num.toString().padStart(digits, "0");
};
