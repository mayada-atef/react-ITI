import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Model = ({ children }) => {
    const elRef = useRef(null);
    if (!elRef.current) {
        elRef.current = document.createElement("div");
    }
    useEffect(() => {
        const modelRoot = document.getElementById("modal");
        modelRoot.appendChild(elRef.current);
        return () => { modelRoot.removeChild(elRef.current); }
    }, []);
    return createPortal(children, elRef.current);
};
export default Model;