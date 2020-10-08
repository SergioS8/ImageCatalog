import { IImageItem } from 'api/types';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { IMAGE_URL } from 'App';

interface IProps {
    item: IImageItem;
}

const CanvasCreator: React.FC<IProps> = ({ item }) => {

    const canvasRef = React.useRef(null);
    const [coordinates, setCoordinates] = React.useState([]);
    const [saving, setSaving] = React.useState(false);

    React.useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        if (coordinates.length > 0) {
            const lastCoordinate = coordinates[coordinates.length - 1];
            draw(ctx, lastCoordinate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height );
            const image = new Image();
            //небольшой хак, чтобы картинка не кэшировалась браузером и отображались все изменения
            image.src=`${IMAGE_URL}/${item.Id}?nocache=${new Date().getTime()}`;
            image.onload = function() {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
            };
        }
    }, [coordinates, item]);

    const handleCanvasClick = React.useCallback((event) => {
      const canvasObj = canvasRef.current as HTMLCanvasElement;
      const currentCoord = getMousePosition(canvasObj, event);
      setCoordinates([...coordinates, currentCoord]);
    }, [setCoordinates, coordinates]);

    const handleClearCanvas = React.useCallback(() => setCoordinates([]), [setCoordinates]);

    const handleSave = React.useCallback(() => {
        //не ждем, потому что может быть долго, пока можно взаимодействовать с UI
        uploadCanvasAsync(canvasRef.current, item.Path);
    }, [canvasRef, item]);

    const uploadCanvasAsync = async (canvas: HTMLCanvasElement, path: string) => {
        const dataURL = canvas.toDataURL();
        //привожу к blob потому что строка dataURL иногда очень большая
        const blob = dataURItoBlob(dataURL);
        const formData = new FormData();
        formData.append('Image', blob);
        formData.append('Path', path);
    
        const requestOptions = {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData
        };
        setSaving(true);
        const response = await fetch(IMAGE_URL, requestOptions);
        setSaving(false);
        const result = await response.json();
        window.console.log(result);
    };

    return (
        <div style={{ display: "inline-block" }}>
            <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
            />
            <div>
                <Button variant="warning" onClick={handleClearCanvas} >{"Очистить"}</Button>
                <Button
                    variant="success"
                    style={{ float: "right" }}
                    onClick={handleSave}
                    disabled={saving}>
                        {saving ? "Подождите, сохраняем..." : "Сохранить"}
                </Button>
            </div>
        </div>
    );
};

const dataURItoBlob = (dataURI) => {
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

const getMousePosition = (canvas, evt) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
};

const SVG_PATH = new Path2D('M100 100 H 900 V 450 H 100 Z');
const SCALE = 0.1;
const OFFSET = 400;

const draw = (ctx: CanvasRenderingContext2D, location) => {
    ctx.fillStyle = 'red';
    ctx.save();
    ctx.scale(SCALE, SCALE);
    ctx.translate(location.x/SCALE - OFFSET, location.y/SCALE - OFFSET);
    ctx.fill(SVG_PATH);

    ctx.restore();
};

export { CanvasCreator };