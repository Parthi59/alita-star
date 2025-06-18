import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient'; // adjust path if needed

export async function GET() {
  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}

