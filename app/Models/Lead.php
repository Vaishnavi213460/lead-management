<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\LeadStatus;

class Lead extends Model
{
    use softDeletes;
    protected $fillable = ['name','email','phone','status'];

    protected $casts = [
        'status' => LeadStatus::class,
    ];
}
