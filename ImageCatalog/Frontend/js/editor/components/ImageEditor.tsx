import { IImageItem } from 'api/types';
import * as React from 'react';
import { CanvasCreator } from './CanvasEditor';
import { Button } from 'react-bootstrap';
import "../styles/Editor.less";

interface IProps {
    item: IImageItem;
    onBack: () => void;
}

const ImageEditor: React.FC<IProps> = ({ item, onBack }) => {
    return (
        <>
            <Button variant="link" onClick={onBack}>{"<< Назад"}</Button>
            <div className="content-center edit-title">{`Редактирование ${item.Name}`}</div>
            <CanvasCreator item={item} />
        </>
        
    );
};

export { ImageEditor };