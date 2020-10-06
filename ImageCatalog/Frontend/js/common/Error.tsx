import * as React from "react";

interface IProps {
    error?: string;
}

export const Error = ({ error }: IProps) => (
    <div className="error content-center">{error || "Ошибка загрузки данных"}</div>
);