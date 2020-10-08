import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './home/components/Layout';
import { Catalog } from 'catalog/components';
import { CatalogDetails } from 'catalogDetails/components/CatalogDetails';
import { NotFound } from 'common/NotFound';

import 'bootstrap/dist/css/bootstrap.min.css';
import "@Styles/main.less";

export const App = () => (
    <Layout>
        <Switch>
            <Route exact path='/' component={Catalog} />
            <Route path='/:catalogId' component={CatalogDetails} />
            <Route component={NotFound} />
        </Switch>
    </Layout>
);

export const CATALOG_URL = "/base";
export const IMAGE_URL = "/image";
