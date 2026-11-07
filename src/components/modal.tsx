import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface TypesDataUsers {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

interface TypeButtonModal {
    onClose: () => void;
    selecteedUser: TypesDataUsers | null;
    onSubmit: (data: {
        id : number;
        firstName: string;
        lastName: string;
        email: string;
    }) => Promise<void>
}

export default function ModalPage({ onClose, selecteedUser, onSubmit }: TypeButtonModal) {
    const [id, setDataId] = useState<number>(1)!;
    const [firstName, setFirstname] = useState<string>("");
    const [lastName, setLastname] = useState<string>("");
    const [email, setEmail] = useState<string>("")


    useEffect(() => {
        if (selecteedUser) {
            setDataId(selecteedUser.id)!;
            setFirstname(selecteedUser.firstName);
            setLastname(selecteedUser.lastName);
            setEmail(selecteedUser.email);
        } else {
            setDataId(0)
            setFirstname("")
            setLastname("")
            setEmail("")
        }
    }, [selecteedUser])


    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        await onSubmit({
            id,
            firstName,
            lastName,
            email
        })
    }
    return (
        <div className="flex flex-col bg-white border-2 border-gray-300 top-60 w-90 md:w-100 h-121 left-4 md:left-[40%] rounded-2xl fixed">
            <header className="flex flex-row items-center justify-between px-2 py-4 border-b-2 border-gray-200">
                <div className="flex flex-col space-y-1 text-start">
                    <h2 className="font-nunito text-2xl font-bold">✨ {selecteedUser ? "update" : "new"} users</h2>
                </div>
                <button onClick={onClose}>
                    <X />
                </button>
            </header>

            <section className="flex flex-col px-2 py-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col justify-between">
                        <label htmlFor="firstName" className="font-nunito text-lg font-bold">firstName</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstname(e.target.value)} placeholder="e.g Aulia" className="border-2 border-gray-200 px-2 rounded-md w-full h-10" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="lastName" className="font-nunito text-lg font-bold">lastname</label>
                        <input type="text" value={lastName} onChange={(e) => setLastname(e.target.value)} placeholder="e.g Aulia" className="border-2 border-gray-200 px-2 rounded-md w-full h-10" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-nunito text-lg font-bold">email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="quest@gmail.com" className="border-2 border-gray-200 px-2 rounded-md w-full h-10" />
                    </div>
                    <button type="submit" className="w-full bg-[#1cb0f6] font-nunito font-bold h-10 rounded-sm text-white cursor-pointer">{selecteedUser ? "update" : "create"} users</button>
                </form>
            </section>
        </div>
    )
}
