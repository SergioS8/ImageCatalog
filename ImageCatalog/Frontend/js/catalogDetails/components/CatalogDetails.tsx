import {
    RouteComponentProps
} from "react-router";
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { getCatalogDetails } from "catalogDetails/actions/catalogDetailsActions";
import { IFetchResponse, ICatalog, IImageItem } from "api/types";
import { ImageInfo } from './ImageInfo';
import { FetchWithLoader } from "common/FetchWithLoader";
import { ImageEditor } from "editor/components/ImageEditor";

interface IOwnProps {
    catalogId: number;
}

type IRouteProps = RouteComponentProps<{ catalogId: string }>;

type IProps = IOwnProps & IRouteProps;

const CatalogDetails: React.FC<IProps> = (props) => {

    const [editedImage, setEditedImage] = React.useState<IImageItem>(null);

    const catalogDetailsResponse = useSelector((state: any) => state.catalogDetails as IFetchResponse<ICatalog>);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getCatalogDetails(props.match.params.catalogId));
    }, [dispatch, props.match.params.catalogId]);

    const onEditOpen = React.useCallback((imgName: string) => {
        const foundImage = catalogDetailsResponse.data.Items.find(x => x.Name === imgName);
        if (foundImage) {
            setEditedImage(foundImage);
        }
    }, [setEditedImage, catalogDetailsResponse.data]);

    const onEditBack = React.useCallback(() => setEditedImage(null), [setEditedImage]);

    if (editedImage) {
        return <ImageEditor item={editedImage} onBack={onEditBack} />;
    }

    return (
        <>
            <Button variant="link" onClick={props.history.goBack}>{"<< Назад"}</Button>
            <FetchWithLoader response={catalogDetailsResponse}>
                {catalogDetailsResponse.data
                    ? <Row className="preview-items">
                        {catalogDetailsResponse.data.Items?.map((img, idx) => (
                            <Col sm={4} key={idx}>
                                <ImageInfo item={img} onEdit={onEditOpen} />
                            </Col>
                        ))}
                    </Row>
                    : <div className="content-center">{"Данного каталога не существует!"}</div>}
            </FetchWithLoader>
        </>
    );
};

export { CatalogDetails };