import { Loader } from 'common/Loader';
import * as React from 'react';

class Home extends React.Component {

    render() {
        return (
            <div>
                <Loader />
                {"Каталог картинок"}
            </div>
        );
    }
}

export { Home };