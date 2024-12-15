<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $students = Student::latest()->paginate(5);

        // dd(request()->get('page'));
        $page = request()->get('page', 1);
        $students = Cache::remember('students' . $page, now()->addMinutes(10), function () {
            return Student::latest()->paginate(5);
        });

        return inertia('Home', [
            'students' => $students
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'nim' => ['required', 'string', 'max:16', 'unique:students,nim']
        ]);

        Student::create($fields);

        Cache::flush();
        return redirect('/');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        return inertia('Edit', ['student' => $student]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        $fields = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'nim' => ['required', 'string', 'max:16', 'unique:students,nim']
        ]);

        $student = Student::findOrFail($student->id);

        $student->update([
            'name'     => $request->name,
            'nim'   => $request->nim
        ]);

        Cache::flush();
        return redirect('/');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();

        Cache::flush();
        return redirect('/');
    }
}
