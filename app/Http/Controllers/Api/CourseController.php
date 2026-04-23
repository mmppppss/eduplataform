<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        return response()->json(Course::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
        ]);

        $course = Course::create($validated);

        return response()->json(['success' => true, 'course' => $course], 201);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
        ]);

        $course->update($validated);

        return response()->json(['success' => true, 'course' => $course]);
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return response()->json(['success' => true]);
    }
}