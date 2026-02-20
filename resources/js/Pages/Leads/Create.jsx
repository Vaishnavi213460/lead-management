import { useForm, Head } from '@inertiajs/react';

export default function Create({statuses}) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        status: statuses[0]
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('leads.store'));
    };

    return (
        <>
            <Head title="Create Lead" />

            <div className="max-w-xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Create Lead</h1>

                <form onSubmit={submit} className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input className="w-full border rounded px-3 py-2" value={data.name} onChange={e => setData('name', e.target.value)} />
                        {errors.name && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input className="w-full border rounded px-3 py-2" value={data.email} onChange={e => setData('email', e.target.value)}/>
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

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save
                    </button>

                </form>
            </div>
        </>
    );
}