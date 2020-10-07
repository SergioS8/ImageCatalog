import { IImageItem } from 'api/types';
import * as React from 'react';
import { Button } from 'react-bootstrap';

import "../styles/CatalogDetails.less";

interface IProps {
    item: IImageItem;
    onEdit: (imgName: string) => void;
}

const ImageInfo:  React.FC<IProps> = ({ item, onEdit }) => {

    return (
        <div className="item">
            <div className="img-box" onClick={() => onEdit(item.Name)}>
                <img
                    className="img-info"
                    src={item.Path}
                    alt={item.Name}
                />
            </div>
            <div className="content-center">
                {item.Name}
            </div>
            <div className="content-center">
                <Button onClick={() => onEdit(item.Name)}>{"Редактировать"}</Button>
            </div>
        </div>
    );
};

export { ImageInfo };