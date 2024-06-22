import React from 'react';
import {useCSVReader} from "react-papaparse";
import {Button} from "@/components/ui/button";
import {UploadIcon} from "lucide-react";

type Props = {
    onUpload: () => void;
}

const UploadButton = ({ onUpload }: Props) => {
    const { CSVReader } = useCSVReader();

    // TODO: Add a Paywall
    return (
        <CSVReader
            onUploadAccepted={onUpload}
        >
            {({ getRootProps} : any) => (
                <Button
                    size="sm"
                    className="w-full lg:w-auto"
                    {...getRootProps()}
                >
                    <UploadIcon
                        className="mr-2"
                    />
                    Import
                </Button>
            )}
        </CSVReader>
    );
};

export default UploadButton;