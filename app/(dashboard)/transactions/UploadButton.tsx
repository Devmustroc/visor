import React from 'react';
import {useCSVReader} from "react-papaparse";
import {Button} from "@/components/ui/button";

type Props = {
    onUpload: () => void;
}

const UploadButton = ({ onUpload }: Props) => {
    const { CSVReader } = useCSVReader();

    // TODO: Add a Paywall
    return (
        <CSVReader>
            {({ getRootProps} : any) => (
                <Button></Button>
            )}
        </CSVReader>
    );
};

export default UploadButton;