import React from 'react';
import {useCSVReader} from "react-papaparse";

type Props = {
    onUpload: () => void;
}

const UploadButton = () => {
    const { CSVReader } = useCSVReader();

    // TODO: Add a Paywall
    return (
        <div>

        </div>
    );
};

export default UploadButton;