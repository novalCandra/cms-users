import axios from "axios";
import { useEffect, useRef, useState } from "react";
interface TypesDataUsers {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    university: string;
}
export const useHooksDashboard = () => {
    const [loading, setloading] = useState<boolean>(true);
    const [users, setUsers] = useState<TypesDataUsers[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] =
        useState<TypesDataUsers | null>(null);

    const [inputText, setInputText] = useState<string>("");
    const debounse = useRef<ReturnType<typeof setTimeout> | null>(null)

    function searchUsers(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setInputText(e.target.value)
        if (debounse.current) clearTimeout(debounse.current)
        if (value.trim() === "") {
            return getallDataUsers()
        }
        debounse.current = setTimeout(() => {
            apiQuery(value);
        }, 2000)
    }

    async function apiQuery(query: string) {
        try {
            const queryData = await queryDataUsers(query);
            setUsers(queryData)
        } catch (error) {
            return console.log(error)
        }
    }

    async function DeleteUsers(id: number) {
        try {
            await axios.delete(`https://dummyjson.com/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setUsers((prevUsers) => (
                prevUsers.filter((user) => user.id !== id)
            ))
        } catch (error) {
            return console.log(error)
        }
    }
    function createModal() {
        setSelectedUser(null)
        setShowModal(true)
    }

    function putModal(user: TypesDataUsers) {
        setSelectedUser(user)
        setShowModal(true)
    }

    function closeModal() {
        setSelectedUser(null)
        setShowModal(false)
    }


    async function handleSave(data: {
        firstName: string;
        lastName: string;
        email: string;
    }) {
        try {
            if (selectedUser) {

                const responseUpdate = await axios.put(
                    `https://dummyjson.com/users/${selectedUser.id}`,
                    data
                )

                setUsers((prevUsers) =>
                    prevUsers.map(itx => itx.id === selectedUser.id ? { ...users, ...responseUpdate.data } : itx)
                )
            } else {
                const reponseCreate = await axios.post(
                    `https://dummyjson.com/users/add`,
                    data
                )

                setUsers(preveUsers => [
                    reponseCreate.data,
                    ...preveUsers
                ])
            }
            closeModal()
        } catch (error) {
            return console.log(error)
        }
    }


    async function queryDataUsers(name: string): Promise<TypesDataUsers[]> {
        try {
            const response = await axios.get(`https://dummyjson.com/users/search?q=${name}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            return response.data.users
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }

    }

    async function getallDataUsers() {
        try {
            setloading(true)
            const response = await axios.get(`https://dummyjson.com/users`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            setUsers(response.data.users)
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }

    }


    useEffect(() => {
        getallDataUsers()

        return () => {
            if (debounse.current) {
                clearTimeout(debounse.current)
            }
        }
    }, [])

    return {loading, users, showModal, selectedUser,DeleteUsers, handleSave, createModal, putModal,searchUsers, inputText, closeModal }
}