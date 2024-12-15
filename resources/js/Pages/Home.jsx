import { Link, useForm } from "@inertiajs/react";
import { FaEdit } from "react-icons/fa";

export default function Home({ students }) {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        nim: "",
    });

    function onSubmit(e) {
        e.preventDefault();
        post("/student");
        setData({ name: "", nim: "" });
    }

    // students.data = [];

    return (
        <main className="grid py-32 font-sans place-items-center">
            <section className="flex flex-col w-1/2 gap-20">
                {/* Form Input */}
                <div className="flex flex-col items-center w-full px-16 py-10 bg-red-500 shadow-md rounded-xl bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10">
                    <h1 className="text-xl font-bold text-white">
                        Input a New Student
                    </h1>

                    {errors.body && (
                        <p className="w-full text-red-500 bg-red-300 border border-red-500">
                            {errors.body}
                        </p>
                    )}

                    <form
                        onSubmit={onSubmit}
                        className="flex flex-col gap-8 mt-10 w-[80%] text-white"
                    >
                        <div className="relative w-full">
                            <label htmlFor="name">Student's Name</label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full px-3 py-2 bg-transparent border-b border-white peer outline-0"
                            />
                        </div>
                        <div className="relative w-full">
                            <label htmlFor="nim">Student's NIM (ID)</label>
                            <input
                                id="nim"
                                type="text"
                                value={data.nim}
                                onChange={(e) => setData("nim", e.target.value)}
                                className="w-full px-3 py-2 bg-transparent border-b border-white outline-0"
                            />
                        </div>
                        <input
                            disabled={processing}
                            type="submit"
                            className="self-center px-10 py-2 mt-8 text-black bg-white rounded-md cursor-pointer w-fit hover:bg-gray-100"
                        />
                    </form>
                </div>

                <section className="flex flex-col items-center w-full px-16 py-10 bg-red-500 shadow-md rounded-xl bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10">
                    <h1 className="text-xl font-bold text-white">
                        Students List
                    </h1>
                    <table className="w-full mt-10 text-white divide-y-2 divide-white divide-solid">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-4">Student's Name</th>
                                <th className="py-4">Student's NIM (ID)</th>
                                <th className="py-4">Created At</th>
                                <th className="py-4">Actions</th>
                            </tr>
                        </thead>

                        {/* student's data */}
                        <tbody>
                            {!students.data.length ? (
                                <tr>
                                    <td
                                        className="py-10 text-center"
                                        colSpan={4}
                                    >
                                        <p>Belum ada data mahasiswa.</p>
                                    </td>
                                </tr>
                            ) : (
                                students.data.map(
                                    ({ id, name, nim, created_at }) => (
                                        <tr key={id}>
                                            <td className="py-3 text-center">
                                                {name}
                                            </td>
                                            <td className="py-3 text-center">
                                                {nim}
                                            </td>
                                            <td className="py-3 text-center">
                                                {new Date(
                                                    created_at
                                                ).toLocaleDateString("id-ID", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <td className="flex items-center justify-center gap-2 p-2">
                                                <Link
                                                    href={`/student/${id}/edit`}
                                                    className="grid p-2 bg-blue-400 rounded place-items-center"
                                                >
                                                    <FaEdit />
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                )
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {!!students.data.length && (
                        <div className="px-4 py-12 text-white">
                            {students.links.map(({ label, url, active }) =>
                                url ? (
                                    <Link
                                        key={label}
                                        href={url}
                                        dangerouslySetInnerHTML={{
                                            __html: label,
                                        }}
                                        preserveScroll="true"
                                        className={`px-1 mx-1 ${
                                            active ? "font-bold" : ""
                                        }`}
                                    />
                                ) : (
                                    <span
                                        key={label}
                                        dangerouslySetInnerHTML={{
                                            __html: label,
                                        }}
                                        className="px-1 mx-1 opacity-50 text-slate-100"
                                    ></span>
                                )
                            )}
                        </div>
                    )}
                </section>
            </section>
        </main>
    );
}
