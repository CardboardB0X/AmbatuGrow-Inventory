<?php

namespace App\Http\Controllers;

use App\Models\PoItem;
use Illuminate\Http\Request;

class PoItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = PoItem::all();
        return response()->json($items);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            // Add validation rules
        ]);

        $item = PoItem::create($request->all());
        return response()->json($item, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $item = PoItem::findOrFail($id);
        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $item = PoItem::findOrFail($id);
        $item->update($request->all());
        return response()->json($item);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $item = PoItem::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}
