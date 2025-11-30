import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const ImageDialog = ({ isOpen, onClose, item=null }) => {
    const filePath = item ;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Comprobante</DialogTitle>
                </DialogHeader>

                {filePath ? (
                    <div className="p-4 text-center">
                        <img
                            src={filePath}
                            alt="Comprobante"
                            className="max-w-full h-auto mx-auto"
                            style={{ maxHeight: '70vh' }}
                        />
                    </div>
                ) : (
                    <p className="text-center text-red-500 p-4">Archivo no disponible.</p>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ImageDialog;
