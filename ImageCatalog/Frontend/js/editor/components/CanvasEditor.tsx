import { IImageItem } from 'api/types';
import * as React from 'react';
import { Button } from 'react-bootstrap';

interface IProps {
    item: IImageItem;
}

const SVG_PATH = new Path2D('M100 100 H 900 V 450 H 100 Z');

const SCALE = 0.1;
const OFFSET = 400;
const canvasWidth = 500;
const canvasHeight = 500;

const CanvasCreator: React.FC<IProps> = ({ item }) => {

    const canvasRef = React.useRef(null);
    const [coordinates, setCoordinates] = React.useState([]);

    React.useEffect(() => {
        const canvasObj = canvasRef.current as HTMLCanvasElement;
        const ctx = canvasObj.getContext('2d') as CanvasRenderingContext2D;

        if (coordinates.length > 0) {
            const lastCoordinate = coordinates[coordinates.length - 1];
            draw(ctx, lastCoordinate);
        } else {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight );
            const imageObj = new Image();
            imageObj.src = item.Path;
            imageObj.onload = function() {
                ctx.drawImage(imageObj, 0, 0);
            };
        }
    }, [coordinates, item]);

    const handleCanvasClick = React.useCallback((event) => {
      const canvasObj = canvasRef.current as HTMLCanvasElement;
      const currentCoord = getMousePos(canvasObj, event);
      setCoordinates([...coordinates, currentCoord]);
    }, [setCoordinates, coordinates]);

    const handleClearCanvas = React.useCallback(() => setCoordinates([]), [setCoordinates]);

    return (
        <>
            <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                onClick={handleCanvasClick}
            />
            <div>
                <Button variant="warning" onClick={handleClearCanvas} >{"Очистить"}</Button>
            </div>
        </>
    );
};

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

const draw = (ctx: CanvasRenderingContext2D, location) => {
    ctx.fillStyle = 'red';
    ctx.save();
    ctx.scale(SCALE, SCALE);
    ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET);
    ctx.fill(SVG_PATH);

    ctx.restore();
  };

export { CanvasCreator };