import { FetchWithLoader } from 'common/FetchWithLoader';
import * as React from 'react';
import { CatalogDetailsLink } from 'catalogDetails/components/CatalogDetailsLink';
import { useSelector, useDispatch } from 'react-redux';
import { Accordion, Button, Card } from 'react-bootstrap';
import { ImagePreview } from './';
import { getAllCatalogs } from 'catalog/actions/catalogActions';
import { IFetchResponse, ICatalog } from 'api/types';

import "../styles/Catalog.less";

const Catalog: React.FC = () => {

    const catalogResponse = useSelector((state: any) => state.catalogs as IFetchResponse<ICatalog[]>);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getAllCatalogs());
    }, [dispatch]);

    return (
        <FetchWithLoader response={catalogResponse}>
            {catalogResponse.data?.length > 0
                ? <Accordion>
                    {catalogResponse.data.map(cat =>(
                        <Card key={cat.Id} className="catalog-item">
                            <Card.Header>
                                <div>
                                    <Accordion.Toggle as={Button} variant="outline-primary" eventKey={cat.Id.toString()}>
                                        {cat.Name}
                                    </Accordion.Toggle>
                                    {cat.Items?.length > 0 &&
                                        <CatalogDetailsLink name={cat.Id}>
                                            <Button variant="success" className="details-btn">
                                                {"Подробнее"}
                                            </Button>
                                        </CatalogDetailsLink>}
                                </div>
                            </Card.Header>
                            <Accordion.Collapse eventKey={cat.Id.toString()}>
                                <Card.Body>
                                    {cat.Items?.map((img, idx) => (
                                        <ImagePreview key={idx} item={img} />
                                    ))}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    ))}
                </Accordion>
                : <div className="content-center">{"Каталоги отсутствуют!"}</div>}
        </FetchWithLoader>
    );
};

export { Catalog };