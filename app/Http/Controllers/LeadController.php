<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lead;
use Inertia\Inertia;
use App\Http\Requests\ValidateLeadRequest;
use App\Enums\LeadStatus;

class LeadController extends Controller
{
    public function index(Request $request)
    {
        $search =$request->search;
        $status= $request->status;
        $sort=$request->sort ?? 'desc';

        $leads= Lead::query()->when($search,function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name','like',"%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($status, function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->orderBy('created_at', $sort)->paginate(10);

        return Inertia::render('Leads/Index', [
            'leads' => $leads,
            'filters' => ['search' => $search,'status' => $status,'sort'   => $sort],
             'statuses'=>LeadStatus::values()
        ]);
    }

    public function create()
    {
        return Inertia::render('Leads/Create', [
            'statuses'=>LeadStatus::values(),
        ]);
    }

    public function store(ValidateLeadRequest $request)
    {
        Lead::create($request->validated());

        return redirect()->route('leads.index')->with('success', 'Lead created successfully.');
    }

    public function edit(Lead $lead)
    {
        return Inertia::render('Leads/Edit',
        [
            'lead'=>$lead,
         'statuses'=>LeadStatus::values()
         ]);
    }

    public function update(ValidateLeadRequest $request, Lead $lead)
    {
        $lead->update($request->validated());
        return redirect()->route('leads.index')->with('success', 'Lead updated successfully.');
    }

    public function destroy(Lead $lead)
    {
        $lead->delete(); 
        return redirect()->route('leads.index')
            ->with('success', 'Lead deleted successfully.');
    }
}
