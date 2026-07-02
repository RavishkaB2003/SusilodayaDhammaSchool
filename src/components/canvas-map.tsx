"use client";

import { useEffect, useRef, useState } from "react";

export default function CanvasMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [pulseRadius, setPulseRadius] = useState(15);
  const [pulseGrowing, setPulseGrowing] = useState(true);

  // Animate the marker pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseRadius((prev) => {
        if (pulseGrowing) {
          if (prev >= 25) {
            setPulseGrowing(false);
            return prev - 0.5;
          }
          return prev + 0.5;
        } else {
          if (prev <= 12) {
            setPulseGrowing(true);
            return prev + 0.5;
          }
          return prev - 0.5;
        }
      });
    }, 30);
    return () => clearInterval(interval);
  }, [pulseGrowing]);

  // Redraw map on state changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    // Center of canvas is default map focal point
    ctx.translate(canvas.width / 2 + offset.x, canvas.height / 2 + offset.y);
    ctx.scale(scale, scale);

    // 1. Draw Map Background
    ctx.fillStyle = "#FFF8F0"; // Warm cream background
    ctx.fillRect(-800, -800, 1600, 1600);

    // 2. Draw Grid Pattern
    ctx.strokeStyle = "#F6EDE0";
    ctx.lineWidth = 1;
    for (let x = -800; x <= 800; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, -800);
      ctx.lineTo(x, 800);
      ctx.stroke();
    }
    for (let y = -800; y <= 800; y += 80) {
      ctx.beginPath();
      ctx.moveTo(-800, y);
      ctx.lineTo(800, y);
      ctx.stroke();
    }

    // 3. Draw Water Body (River)
    ctx.strokeStyle = "#D2E5E8";
    ctx.lineWidth = 45;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(-600, -400);
    ctx.bezierCurveTo(-200, -350, -300, 100, 100, 200);
    ctx.bezierCurveTo(300, 250, 400, 500, 600, 600);
    ctx.stroke();

    // 4. Draw Secondary Roads (Sand color)
    ctx.strokeStyle = "#F0E6D6";
    ctx.lineWidth = 16;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Road 1 (Vertical)
    ctx.beginPath();
    ctx.moveTo(-150, -600);
    ctx.lineTo(-150, 600);
    ctx.stroke();

    // Road 2 (Horizontal)
    ctx.beginPath();
    ctx.moveTo(-600, -100);
    ctx.lineTo(600, -100);
    ctx.stroke();

    // Road 3 (Temple Road - Curved access road)
    ctx.strokeStyle = "#E8DFD0";
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(-150, -100);
    ctx.quadraticCurveTo(150, -100, 150, 200);
    ctx.lineTo(400, 200);
    ctx.stroke();

    // 5. Draw Buildings Outline
    ctx.fillStyle = "#EAE2D5";
    ctx.fillRect(-300, -250, 60, 80);
    ctx.fillRect(200, -280, 80, 50);
    ctx.fillRect(-350, 150, 70, 70);

    // 6. Draw Temple Compound Area (Saffron tint)
    ctx.fillStyle = "#E89E5F";
    ctx.globalAlpha = 0.25;
    ctx.beginPath();
    ctx.roundRect(50, -40, 200, 180, 12);
    ctx.fill();
    ctx.globalAlpha = 1.0;

    ctx.strokeStyle = "#E89E5F";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(50, -40, 200, 180, 12);
    ctx.stroke();

    // Temple Labels
    ctx.fillStyle = "#8B5A2B";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("Temple Compound", 80, -10);

    // 7. Draw Landmarks Labels
    ctx.fillStyle = "#9C8A87";
    ctx.font = "italic 11px sans-serif";
    ctx.fillText("Dharmapala Road", -140, 500);
    ctx.fillText("Temple Junction", -250, -70);
    ctx.fillText("Kelani River", 200, 320);

    // 8. Draw Temple Pin location (Focal point: 150, 50)
    const pinX = 150;
    const pinY = 50;

    // Pulsing marker shadow
    ctx.fillStyle = "rgba(122, 31, 29, 0.2)";
    ctx.beginPath();
    ctx.arc(pinX, pinY, pulseRadius, 0, Math.PI * 2);
    ctx.fill();

    // Outer Pin Drop Teardrop
    ctx.fillStyle = "#7A1F1D"; // Deep Maroon
    ctx.beginPath();
    ctx.moveTo(pinX, pinY);
    ctx.bezierCurveTo(pinX - 12, pinY - 12, pinX - 12, pinY - 30, pinX, pinY - 32);
    ctx.bezierCurveTo(pinX + 12, pinY - 30, pinX + 12, pinY - 12, pinX, pinY);
    ctx.fill();

    // Inner gold dot
    ctx.fillStyle = "#E89E5F"; // Golden Saffron
    ctx.beginPath();
    ctx.arc(pinX, pinY - 20, 5, 0, Math.PI * 2);
    ctx.fill();

    // Title label card above Pin
    ctx.fillStyle = "#2C1B18";
    ctx.font = "bold 15px Georgia, serif";
    ctx.fillText("Susilodaya Viharaya", pinX - 65, pinY - 45);

    ctx.restore();
  }, [offset, scale, pulseRadius]);

  // Drag listeners
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = 0.08;
    const newScale = e.deltaY < 0 ? scale + zoomFactor : scale - zoomFactor;
    setScale(Math.max(0.6, Math.min(2.5, newScale)));
  };

  const resetMap = () => {
    setOffset({ x: -120, y: -50 });
    setScale(1.2);
  };

  useEffect(() => {
    // Initial centering offsets
    resetMap();
  }, []);

  return (
    <div className="relative w-full h-[450px] bg-[#FFF8F0] border border-[#E6DDD0] rounded-none overflow-hidden shadow-none group">
      {/* Title Overlay Info Box */}
      <div className="absolute top-4 left-4 z-10 max-w-[280px] bg-white/95 backdrop-blur border border-[#E6DDD0] p-4 rounded-none shadow-none">
        <h4 className="text-sm font-normal font-serif text-[#6B1D3A] italic">Susilodaya Temple Compound</h4>
        <p className="text-xs text-[#1C1C1E]/80 mt-1 leading-relaxed">
          Drag to explore nearby access roads. Use your mouse wheel to zoom in or out.
        </p>
        <button
          onClick={resetMap}
          className="mt-3 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-none border border-[#E6DDD0] hover:text-[#1C1C1E] text-[#6B1D3A] transition-all btn-wipe"
        >
          Recenter
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={750}
        height={450}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onWheel={handleWheel}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />
    </div>
  );
}
