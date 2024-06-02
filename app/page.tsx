"use client";

import { useDraw } from "../hooks/useDraw";
import { FC, useState } from "react";
import { ChromePicker } from "react-color";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  const [color, setColor] = useState<string>("#000");

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    const lineWidth = 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <div className="w-screen h-screen  bg-white flex justify-center gap-10 items-center">
      <div className="flex flex-col items-center gap-5">
        <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        <button
          type="button"
          className="p-2 rounded-md border border-black text-black"
          onClick={clear}
        >
          Clear Canvas
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={550}
        height={550}
        className="border border-black rounded-md"
      />
    </div>
  );
};

export default page;
