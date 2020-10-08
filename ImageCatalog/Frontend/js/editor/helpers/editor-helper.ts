export const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
};

export const getMousePosition = (canvas, evt) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
};

const SCALE = 0.1;
const OFFSET = 400;

export const draw = (ctx: CanvasRenderingContext2D, location, rect: Path2D) => {
    ctx.fillStyle = 'red';
    ctx.save();
    ctx.scale(SCALE, SCALE);
    ctx.translate(location.x/SCALE - OFFSET, location.y/SCALE - OFFSET);
    ctx.fill(rect);

    ctx.restore();
};