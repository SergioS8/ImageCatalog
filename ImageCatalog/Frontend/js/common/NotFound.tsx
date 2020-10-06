import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
    render() {
        return <div>
            <p style={{ textAlign: "center" }}>
                <div>{"Страница не найдена"}</div>
                <Link to="/">{"Перейти на главную"}</Link>
            </p>
        </div>;
    }
}
export { NotFound };