"use client"
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

const Generate = () => {
    const searchParams = useSearchParams()
    const [links, setLinks] = useState([{ link: "", linktext: "" }])
    const [handle, sethandle] = useState(searchParams.get('handle'))
    const [pic, setpic] = useState("")
    const [desc, setdesc] = useState("")
    const router = useRouter();

    const handleChange = (index, link, linktext) => {
        setLinks((initialLinks) => {
            return initialLinks.map((item, i) => {
                if (i === index) return { link, linktext }
                else return item
            })
        })
    }

    const addLink = () => {
        setLinks([...links, { link: "", linktext: "" }])
    }

    const submitLinks = async () => {
        if (!handle.trim() || !pic.trim() || !desc.trim() || !links[0].linktext.trim()) {
            toast.error("Please fill all required fields!");
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "links": links,
            "handle": handle,
            "pic": pic,
            "desc": desc
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
           const r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/add`, requestOptions);
            const result = await r.json()
            if (result.success) {
                toast.success(result.message)
                router.push(`/${handle}`);

                setLinks([{ link: "", linktext: "" }])
                setpic("")
                sethandle("")
                setdesc("")
            }
            else {
                toast.error(result.message)
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again!")
        }
    }

    return (
        <div className='bg-[#E9C0E9] w-full min-h-screen'>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 sm:px-12 py-12 lg:py-16 max-w-7xl mx-auto'>

                {/* Left Column */}
                <div className='flex flex-col justify-start lg:justify-center text-gray-900 gap-6 pt-24 lg:pt-0 [@media(min-width:1024px)_and_(max-width:1400px)]:pt-24'>

                    <h1 className='font-bold text-3xl sm:text-4xl lg:text-5xl'>Create your Bittree</h1>

                    {/* Step 1 */}
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step 1: Claim your Handle</h2>
                        <input
                            value={handle || ""}
                            onChange={e => sethandle(e.target.value)}
                            className='px-4 py-2 my-2 w-full focus:outline-pink-500 rounded-full'
                            type="text"
                            placeholder='Choose a Handle'
                        />
                    </div>

                    {/* Step 2 */}
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step 2: Add Links</h2>
                        {links.map((item, index) => (
                            <div key={index} className='flex flex-col sm:flex-row gap-2 my-2 w-full'>
                                <input
                                    value={item.linktext || ""}
                                    onChange={e => handleChange(index, item.link, e.target.value)}
                                    className='px-4 py-2 w-full sm:w-1/2 focus:outline-pink-500 rounded-full'
                                    type="text"
                                    placeholder='Enter link text'
                                />
                                <input
                                    value={item.link || ""}
                                    onChange={e => handleChange(index, e.target.value, item.linktext)}
                                    className='px-4 py-2 w-full sm:w-1/2 focus:outline-pink-500 rounded-full'
                                    type="text"
                                    placeholder='Enter link'
                                />
                            </div>
                        ))}
                        <button
                            onClick={addLink}
                            className='p-3 my-2 bg-slate-900 text-white font-bold rounded-3xl w-full sm:w-auto'
                        >
                            + Add Link
                        </button>
                    </div>

                    {/* Step 3 */}
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step 3: Add Picture and Description</h2>
                        <div className='flex flex-col gap-2 my-2'>
                            <input
                                value={pic || ""}
                                onChange={e => setpic(e.target.value)}
                                className='px-4 py-2 w-full focus:outline-pink-500 rounded-full'
                                type="text"
                                placeholder='Enter link to your Picture'
                            />
                            <input
                                value={desc || ""}
                                onChange={e => setdesc(e.target.value)}
                                className='px-4 py-2 w-full focus:outline-pink-500 rounded-full'
                                type="text"
                                placeholder='Enter description'
                            />
                            <button
                                disabled={!pic || !handle || !desc || !links[0].linktext}
                                onClick={submitLinks}
                                className='disabled:bg-slate-500 disabled:cursor-not-allowed p-3 my-5 bg-slate-900 text-white font-bold rounded-3xl w-full sm:w-auto'
                            >
                                Create your BitTree
                            </button>
                        </div>
                    </div>

                </div>

                {/* Right Column */}
                <div className='flex justify-center items-start lg:items-center'>
                    <img
                        className='w-3/4 sm:w-1/2 lg:w-8/12  object-contain'
                        src="/generate.png"
                        alt="Generate your links"
                    />
                    <ToastContainer />
                </div>

            </div>
        </div>
    )
}

export default Generate
