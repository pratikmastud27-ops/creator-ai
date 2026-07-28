import React, { useRef, useState } from "react";

interface AutoThumbnailGeneratorProps {
  title: string;
}

const AutoThumbnailGenerator: React.FC<AutoThumbnailGeneratorProps> = ({
  title,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbnail, setThumbnail] = useState("");

  const generateThumbnail = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // YouTube Thumbnail Size
    canvas.width = 1280;
    canvas.height = 720;

    // Background
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gold Border
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

    // Title
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 60px Arial";
    ctx.textAlign = "center";

    wrapText(ctx, title, canvas.width / 2, 250, 1000, 70);

    const image = canvas.toDataURL("image/png");
    setThumbnail(image);
  };

  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = text.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }

    ctx.fillText(line, x, y);
  }

  return (
    <div>
      <button onClick={generateThumbnail}>
        Generate Thumbnail
      </button>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {thumbnail && (
        <img
          src={thumbnail}
          alt="Thumbnail"
          style={{ width: "100%", marginTop: 20 }}
        />
      )}
    </div>
  );
};

export default AutoThumbnailGenerator;
