import * as React from "react";

class Footer extends React.Component {

    public render() {
        return (
            <footer>
                <div className="footer">
                    <div>@2020 <strong>Каталог картинок</strong></div>
                    <div>designed by<a target="_blank" href="https://github.com/SergioS8/ImageCatalog"> Сергей Симонов </a></div>
                </div>
            </footer>
        );
    }
}

export { Footer };