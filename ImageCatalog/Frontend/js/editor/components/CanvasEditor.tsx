import { IImageItem } from 'api/types';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { IMAGE_URL } from 'App';
import { usePrevious } from 'hooks/use-previous';
import { dataURItoBlob, draw, getMousePosition } from 'editor/helpers/editor-helper';

interface IProps {
    item: IImageItem;
}

interface ISize {
    Width: number;
    Height: number;
}

const CanvasCreator: React.FC<IProps> = ({ item }) => {

    const canvasRef = React.useRef(null);
    
    const [coordinates, setCoordinates] = React.useState([]);
    const [saving, setSaving] = React.useState(false);
    const [size, setSize] = React.useState<ISize>({ Width: 900, Height: 450 });

    const prevSize = usePrevious(size);

    const handleChange = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.currentTarget.value;
        const stateName = evt.currentTarget.name;
        setSize({ ...size, [stateName]: value });
    }, [size, setSize]);

    React.useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        if (prevSize && prevSize !== size) {
            return;
        }

        if (coordinates.length > 0) {
            const lastCoordinate = coordinates[coordinates.length - 1];
            const rect = new Path2D(`M0 100 H ${size.Width} V ${size.Height} H 0 Z`);
            draw(ctx, lastCoordinate, rect);
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
    }, [coordinates, item, size, prevSize]);

    const handleCanvasClick = React.useCallback((event) => {
        if (size.Height && size.Width) {
            const canvasObj = canvasRef.current as HTMLCanvasElement;
            const currentCoord = getMousePosition(canvasObj, event);
            setCoordinates([...coordinates, currentCoord]);
        }
    }, [setCoordinates, coordinates, size]);

    const handleClearCanvas = React.useCallback(() => setCoordinates([]), [setCoordinates]);

    const handleSaveAsync = React.useCallback(async () => {
        const dataURL = canvasRef.current.toDataURL();
        //привожу к blob потому что строка dataURL иногда очень большая
        const blob = dataURItoBlob(dataURL);
        const formData = new FormData();
        formData.append('Image', blob);
        formData.append('Path', item.Path);
    
        const requestOptions = {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData
        };
        setSaving(true);
        const response = await fetch(IMAGE_URL, requestOptions);
        setSaving(false);
        const result = await response.json();
        if (result) {
            handleClearCanvas();
        }
        window.console.log(result);
    }, [canvasRef, item, handleClearCanvas]);

    return (
        <>
            <div className="panel-editor">
                <span>{"Ширина прямоугольника: "}</span>
                <input
                    onChange={handleChange}
                    name="Width"
                    type="number"
                    min={0}
                    max={9999999}
                    value={size.Width}
                    step={1}
                />
                <span>{" Длина прямоугольника: "}</span>
                <input
                    onChange={handleChange}
                    name="Height"
                    type="number"
                    min={0}
                    max={9999999}
                    value={size.Height}
                    step={1}
                />
            </div>
            <div style={{ display: "inline-block" }}>
                <canvas
                    ref={canvasRef}
                    onClick={handleCanvasClick}
                />
                <div>
                    <Button variant="warning" onClick={handleClearCanvas} disabled={coordinates.length === 0} >{"Очистить"}</Button>
                    <Button
                        variant="success"
                        style={{ float: "right" }}
                        onClick={handleSaveAsync}
                        disabled={saving || coordinates.length === 0}>
                            {saving ? "Подождите, сохраняем..." : "Сохранить"}
                    </Button>
                </div>
            </div>
        </>
    );
};

export { CanvasCreator };