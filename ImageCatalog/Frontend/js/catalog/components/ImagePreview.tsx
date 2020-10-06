import { IImageItem } from 'api/types/IImageItem';
import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import "../styles/Catalog.less";

interface IProps {
    item: IImageItem;
}

const ImagePreview: React.FC<IProps> = ({ item }) => {

    return (
        <Row className="img-row">
            <Col sm={3}>
                <div className="img-box">
                    <img
                        className="img-preview"
                        src={item.Path}
                        alt={item.Name}
                    />
                </div>
            </Col>
            <Col sm={9}>
                <div style={{ position: "absolute", top: "25%" }}>{item.Name}</div>
            </Col>
        </Row>
    );
};

export { ImagePreview };