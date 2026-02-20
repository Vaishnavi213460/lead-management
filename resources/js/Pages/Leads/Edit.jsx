import { useForm,Head,Link } from '@inertiajs/react';

export default function Edit({ lead, statuses }) {
    const { data, setData, put, processing, errors } = useForm({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        status: lead.status
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('leads.update', lead.id));
    };

    return (
        <>
            <Head title="Edit Lead" />

            <div className="max-w-xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Edit Lead</h1>
                    <Link href={route('leads.index')}className="text-gray-600 hover:underline">
                        Back
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input className="w-full border rounded px-3 py-2" value={data.name} onChange={e => setData('name', e.target.value)}/>
                        {errors.name && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input type="email" className="w-full border rounded px-3 py-2" value={data.email} onChange={e => setData('email', e.target.value)}/>
                        {errors.email && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Phone</label>
                        <input className="w-full border rounded px-3 py-2" value={data.phone} onChange={e => setData('phone', e.target.value)}/>
                        {errors.phone && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.phone}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Status</label>
                        <select className="w-full border rounded px-3 py-2" value={data.status} onChange={e => setData('status', e.target.value)}>
                            {statuses.map(status => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Update Lead
                    </button>

                </form>
            </div>
        </>
    );
}