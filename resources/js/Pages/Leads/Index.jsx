import { Head, Link, router, useForm } from '@inertiajs/react';

export default function Index({ leads, filters, statuses}) {

    const { data, setData } = useForm({search: filters.search ||'', status: filters.status ||'', sort: filters.sort || 'desc'});

    const submit = (e) => {
        e.preventDefault();
        router.post(route('leads.filter'), data, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <>
            <Head title="Leads" />

            <div className="max-w-6xl mx-auto p-6">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Lead Management</h1>
                    <Link
                        href={route('leads.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Create Lead
                    </Link>
                </div>

                <div className="bg-white shadow rounded p-4 mb-6">
                    <form onSubmit={submit} className="flex flex-wrap gap-4">

                        <input type="text" placeholder="Search by name or email" className="border rounded px-3 py-2 w-64" value={data.search} onChange={(e) => setData('search', e.target.value)}/>
                        <select className="border rounded px-3 pr-8 py-2" value={data.status} onChange={(e) =>setData('status',e.target.value)}>
                            <option value="">All Status</option>
                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>

                        <select className="border rounded px-3 pr-8 py-2" value={data.sort} onChange={(e) =>setData('sort', e.target.value)} >
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select>

                        <button
                            type="submit"
                            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
                        >
                            Apply
                        </button>
                    </form>
                </div>

                <div className="bg-white shadow rounded overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Created</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.data.map((lead) => (
                                <tr key={lead.id} className="border-t">
                                    <td className="p-3">{lead.name}</td>
                                    <td className="p-3">{lead.email}</td>
                                    <td className="p-3">{lead.phone}</td>
                                    <td className="p-3">
                                        <span className="px-2 py-1 text-sm rounded bg-blue-100 text-blue-700">
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        {new Date(lead.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 text-center space-x-3">
                                        <Link
                                            href={route('leads.edit', lead.id)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => {
                                                if (confirm('Are you sure?')) {
                                                    router.delete(route('leads.destroy', lead.id));
                                                }
                                            }}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {leads.last_page > 1 && (
                        <div className="flex justify-center mt-6 space-x-2">

                            {Array.from({ length: leads.last_page }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() =>
                                        router.post(
                                            route('leads.filter'),
                                            { ...data, page: page },
                                            { preserveState: true, replace: true }
                                        )
                                    }
                                    className={`px-3 py-1 rounded border ${
                                        leads.current_page === page
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                        </div>
                    )}

                    {leads.data.length === 0 && (
                        <div className="p-6 text-center text-gray-500">
                            No leads found.
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}