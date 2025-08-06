import { createPortal } from "react-dom";

export default function Modal({children , onClose}){
     return createPortal(
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg">
                {children}
                <button onClick={onClose} className="mt-2 text-red-500">Close</button>
            </div>
        </div>,document.getElementById("modal-root")
     );   
}
