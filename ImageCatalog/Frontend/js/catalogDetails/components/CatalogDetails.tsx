import {
    RouteComponentProps
} from "react-router";
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { getCatalogDetails } from "catalogDetails/actions/catalogDetailsActions";
import { IFetchResponse, ICatalog } from "api/types";
import { ImageInfo } from './ImageInfo';
import { FetchWithLoader } from "common/FetchWithLoader";

interface IOwnProps {
    catalogId: number;
}

type IRouteProps = RouteComponentProps<{ catalogId: string }>;

type IProps = IOwnProps & IRouteProps;

const CatalogDetails: React.FC<IProps> = (props) => {

    const catalogDetailsResponse = useSelector((state: any) => state.catalogDetails as IFetchResponse<ICatalog>);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getCatalogDetails(props.match.params.catalogId));
    }, [dispatch, props.match.params.catalogId]);

    return (
        <>
            <Button variant="link" onClick={props.history.goBack}>{"<< Назад"}</Button>
            <FetchWithLoader response={catalogDetailsResponse}>
                {catalogDetailsResponse.data
                    ? <Row className="preview-items">
                        {catalogDetailsResponse.data.Items?.map((img, idx) => (
                            <Col sm={4} key={idx}>
                                <ImageInfo item={img} />
                            </Col>
                        ))}
                    </Row>
                    : <div className="content-center">{"Данного каталога не существует!"}</div>}
            </FetchWithLoader>
        </>
    );
};

export { CatalogDetails };