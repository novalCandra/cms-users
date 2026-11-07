import PortalModalCreate from "../../components/portal";
import { Pen, Trash } from "lucide-react";
import { useHooksDashboard } from "../../hooks/useHookDashboard";



export default function DashboardUsers() {
    const { loading, users, showModal, selectedUser, DeleteUsers, handleSave, createModal, putModal, searchUsers, inputText, closeModal } = useHooksDashboard()
    return (
        <>

            <div className="container flex flex-col px-2 md:px-6 py-4 bg-gray-200 min-h-screen max-w-full space-y-4">
                <header className="flex flex-col md:flex-row justify-between items-center space-y-2">
                    <div className="flex flex-col space-y-1">
                        <h1 className="font-nunito font-bold text-2xl md:text-4xl">Team Members & Learners</h1>
                        <p className="font-nunito font-medium text-[14px] md:text-md text-[#4b4b4b]">Manage your active cohort, boost streaks, and review deep player analytics.</p>
                    </div>
                    <button onClick={createModal} className="bg-[#1cb0f6] text-white font-bold font-nunito px-2 py-1 rounded-md w-full md:w-50 h-8 md:h-10">CREATE USERS</button>
                </header>
                <div className="flex flex-col">
                    <div className="bg-white w-full border-2 border-gray-300 h-20 md:w-full rounded-2xl px-4 py-5 md:px-8 flex flex-row items-center justify-between">
                        <input type="text" value={inputText} onChange={searchUsers} placeholder="Search Users name" className="bg-gray-100 h-8 px-2 border-2 border-gray-300 rounded-md inset-ring-gray-400 w-full md:w-200 md:h-10" />

                        <div className="hidden md:flex md:flex-row items-center gap-x-8">
                            <button className="bg-[#1cb0f6] text-white font-bold font-nunito px-2 py-1 rounded-2xl w-30 h-8">All users</button>
                            <button className="bg-white text-gray-500 ring-2 ring-gray-500 font-bold font-nunito px-2 py-1 rounded-2xl w-30 h-8">femate</button>
                            <button className="bg-white text-gray-500 ring-2 ring-gray-500   font-bold font-nunito px-2 py-1 rounded-2xl w-30 h-8">male</button>
                        </div>
                    </div>
                </div>

                {loading ? <p className="flex flex-col justify-center text-center mx-auto text-2xl">Loading...</p> : ""}
                <section className="grid grid-cols-2 md:grid-cols-4 py-2 space-y-4 gap-x-4">
                    {users?.map((item) => {
                        const firstName = item.email?.slice(0, 2)
                        return (
                            <div key={item.id} className="bg-white flex flex-col px-4 py-4 w-44 md:w-100 md:h-54 h-56 justify-between space-y-2 rounded-2xl">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="bg-[#1cb0f6] text-white w-12 h-10 flex flex-col justify-center text-center rounded-md ring-2 ring-[#3895ff]">
                                        <p className="font-nunito font-bold text-xl uppercase">{firstName}</p>
                                    </div>
                                    <div className="flex flex-row space-x-2 md:space-x-5 items-center ">
                                        <button className="border-2 bg-gray-100 border-gray-300 px-2 py-2 rounded-md cursor-pointer" disabled={loading} onClick={() => putModal(item)}><Pen className="size-4 md:size-6 text-gray-800" /></button>
                                        <button type="submit" className="border-2 bg-red-100 border-red-300 px-2 py-2 rounded-md cursor-pointer" onClick={() => DeleteUsers(item.id)}><Trash className="size-4 md:size-6 text-red-500" /></button>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <h2 className="font-nunito text-xl font-bold">{item?.firstName ?? "-"}{" "}{item.lastName ?? "-"}</h2>
                                    <p className="font-nunito text-[12px] font-semibold line-clamp-1">{item?.email ?? "-"}</p>
                                    <p className="font-nunito text-[12px] font-semibold line-clamp-1">{item?.university ?? "-"}</p>
                                </div>
                                <button className="ring-2 ring-gray-300 rounded-sm font-nunito text-sm font-bold h-8">View Profile</button>
                            </div>
                        )
                    })}
                </section>
            </div>

            <PortalModalCreate
                isOpen={showModal}
                onClose={closeModal}
                selectedUser={selectedUser}
                onSubmit={handleSave}
            />

        </>
    )
}