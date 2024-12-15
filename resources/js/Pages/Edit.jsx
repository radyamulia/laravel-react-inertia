import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Edit({ student }) {
    const {
        data,
        setData,
        put,
        errors,
        processing,
        delete: destroy,
    } = useForm({
        name: "",
        nim: "",
    });

    useEffect(() => {
        setData({ name: student.name, nim: student.nim });
    }, []);

    function onSubmit(e) {
        e.preventDefault();
        setData({ name: "", nim: "" });
        put(`/student/${student.id}`);
    }

    function onDelete(e) {
        e.preventDefault();
        destroy(`/student/${student.id}`);
    }

    return (
        <main className="grid py-32 font-sans place-items-center">
            <section className="flex flex-col w-1/2 gap-20">
                {/* Form Input */}
                <div className="flex flex-col items-center w-full px-16 py-10 bg-red-500 shadow-md rounded-xl bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10">
                    <h1 className="text-xl font-bold text-white">
                        Edit Student
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
                        <div className="flex justify-center w-full gap-4">
                            <input
                                disabled={processing}
                                type="button"
                                value="Delete"
                                onClick={onDelete}
                                className="self-center px-10 py-2 mt-8 text-red-500 bg-red-300 border border-red-500 rounded-md cursor-pointer w-fit hover:bg-red-500 hover:text-white"
                            />
                            <input
                                disabled={processing}
                                type="submit"
                                className="self-center px-10 py-2 mt-8 text-black bg-white rounded-md cursor-pointer w-fit hover:bg-gray-100"
                            />
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
