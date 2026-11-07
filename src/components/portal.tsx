import { createPortal } from "react-dom";
import ModalPage from "./modal";


interface TypesDataUsers {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}
interface TypeModal {
    isOpen: boolean;
    onClose: () => void;
    selectedUser: TypesDataUsers | null;
    onSubmit: (data: {
        id : number
        firstName: string;
        lastName: string;
        email: string;
    }) => Promise<void>;
}

export default function PortalModalCreate({ isOpen,
    onClose,
    selectedUser,
    onSubmit }: TypeModal) {
    if (!isOpen) return null

    return createPortal(
        <ModalPage
            onClose={onClose}
            selecteedUser={selectedUser}
            onSubmit={onSubmit}
        />, document.body
    )
}
