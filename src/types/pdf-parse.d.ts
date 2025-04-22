declare module 'pdf-parse' {
    interface PDFData {
        numpages: number;
        numrender: number;
        info: {
            PDFFormatVersion: string;
            IsAcroFormPresent: boolean;
            IsXFAPresent: boolean;
            [key: string]: string | boolean;
        };
        metadata: {
            [key: string]: string;
        };
        text: string;
        version: string;
    }

    function PDFParse(dataBuffer: Buffer | ArrayBuffer): Promise<PDFData>;
    export = PDFParse;
} 