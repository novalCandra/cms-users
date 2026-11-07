import { Link, Outlet } from 'react-router-dom'
import Header from './header'
export default function AsideBar() {
    return (
        <>
            <Header />
            <aside className='flex flex-row flex-1'>
                <div className='hidden md:flex md:flex-col h-screen border-r-2 border-gray-300 py-4 w-48 px-2 space-y-6'>
                    <ul className='flex flex-col px-2 py-2 space-y-6'>
                        <li>
                            <Link to={"/"} className='font-nunito text-2xl'>Dashboard</Link>
                        </li>
                    </ul>
                </div>
                <Outlet />
            </aside>
        </>
    )
}
