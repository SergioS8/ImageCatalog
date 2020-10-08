import { IImageItem } from 'api/types';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { IMAGE_URL } from 'App';

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
                    //небольшой хак, чтобы картинка не кэшировалась браузером и отображались все изменения
                    src={`${IMAGE_URL}/${item.Id}?nocache=${new Date().getTime()}`}
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