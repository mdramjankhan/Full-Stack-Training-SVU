import { type PropsWithChildren } from 'react'
import Header from './header'

export const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <div className='bg-gradient-to-br from-background to-muted'>
                <Header/>
                <main className='min-h-screen container mx-auto px-4 py-8'>
                    {children}
                </main>


                <footer className='border-t backdrop-blur-lg py-12 supports-[backdrop-filter]:bg-background/60:'>
                    <div className='container mx-auto px-4 text-center text-stone-700'>
                        <p className='text-sm'>
                            © 2025 - All rights reserved - Climate-App
                        </p>

                    </div>

                </footer>
            </div>
        </>
    )
}
