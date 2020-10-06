import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './home/components/Layout';
import { Home } from './home/components/Home';
import { NotFound } from './common/NotFound';

import 'bootstrap/dist/css/bootstrap.min.css';
import "@Styles/main.less";

export const App = () => (
    <Layout>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route component={NotFound} />
        </Switch>
    </Layout>
);

export const ADMIN_URL = "/secure/admin";
export const CART_URL = "/cart";
