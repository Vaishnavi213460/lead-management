<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ValidateLeadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $leadId = $this->route('lead')?->id;
        return [
            'name'=>'required',
            'email'=>'required|email|unique:leads,email'.($leadId ? ",$leadId" : ''),
            'phone'=> 'required',
            'status'=>'required|in:New,Contacted,Converted',

        ];
    }
}
