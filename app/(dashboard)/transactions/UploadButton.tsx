import React from 'react';
import {useCSVReader} from "react-papaparse";
import {Button} from "@/components/ui/button";
import {UploadIcon} from "lucide-react";

type Props = {
    onUpload: (results: any) => void;
}

const UploadButton = ({ onUpload }: Props) => {
    const { CSVReader } = useCSVReader();

    // TODO: Add a Paywall
    return (
        <CSVReader
            onUploadAccepted={onUpload}
            config={{ encoding: "utf-8" }}
        >
            {({ getRootProps} : any) => (
                <Button
                    size="sm"
                    className="w-full bg-sky-600 text-white hover:bg-primary-600 py-5"
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