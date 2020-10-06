import { IImageItem } from 'api/types/IImageItem';
import * as React from 'react';

import "../styles/CatalogDetails.less";

interface IProps {
    item: IImageItem;
}

const ImageInfo:  React.FC<IProps> = ({ item }) => {

    return (
        <div className="item">
            <div className="img-box">
                <img
                    className="img-info"
                    src={item.Path}
                    alt={item.Name}
                />
            </div>
            <div className="content-center">{item.Name}</div>
        </div>
    );
};

export { ImageInfo };