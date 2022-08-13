// resizeCanvas :: canvas -> IO ()
const resizeCanvas = (canvas) => {
  const width = 256;
  const height = 240;

  // I use whole number instead of fractional scaling because I'm not
  // entirely sure fractional scaling can be handled reliably, especially
  // when the code draw out each pixel instead of whole shape.
  let scale = 1;

  if (window.innerWidth <= window.innerHeight) {
    scale = Math.floor(window.innerWidth / width);
  } else {
    scale = Math.floor(window.innerHeight / height);
  }

  canvas.width = width * scale;
  canvas.height = height * scale;
};

// resizeText :: canvas -> IO ()
const resizeText = (canvas) => {
  const ctx = canvas.getContext("2d");
  ctx.font = "bold 5vmin Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(`Drop ROM file here`, canvas.width / 2, canvas.height / 2);
};

export { resizeCanvas, resizeText };
