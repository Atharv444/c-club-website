import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";

export const runtime = "nodejs";

const PHONE_REGEX = /^\+?[0-9\s\-()]{7,15}$/;

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "gcc: error: malformed payload stream (invalid JSON packet)",
        },
        { status: 400 }
      );
    }

    const { team_name, team_size, member_names, phone_number } = body || {};

    // 1. Team Name validation
    if (typeof team_name !== "string" || team_name.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "gcc: error: team_name must be at least 2 characters (NULL pointer dereference)",
        },
        { status: 400 }
      );
    }

    if (team_name.trim().length > 80) {
      return NextResponse.json(
        {
          success: false,
          error: "gcc: error: team_name buffer overflow (exceeds 80 characters)",
        },
        { status: 400 }
      );
    }

    // 2. Team Size validation
    const parsedSize = Number(team_size);
    if (!Number.isInteger(parsedSize) || parsedSize < 1 || parsedSize > 6) {
      return NextResponse.json(
        {
          success: false,
          error: "gcc: error: team_size must be an integer between 1 and 6",
        },
        { status: 400 }
      );
    }

    // 3. Team Members validation
    if (!Array.isArray(member_names)) {
      return NextResponse.json(
        {
          success: false,
          error: "gcc: error: member_names must be an array (char** pointer required)",
        },
        { status: 400 }
      );
    }

    if (member_names.length !== parsedSize) {
      return NextResponse.json(
        {
          success: false,
          error: `gcc: error: team_size (${parsedSize}) does not match member_names count (${member_names.length})`,
        },
        { status: 400 }
      );
    }

    const trimmedMembers: string[] = [];
    for (let i = 0; i < member_names.length; i++) {
      const name = member_names[i];
      if (typeof name !== "string" || name.trim().length < 2) {
        return NextResponse.json(
          {
            success: false,
            error: `gcc: error: member_names[${i}] is invalid or too short (minimum 2 characters required)`,
          },
          { status: 400 }
        );
      }
      if (name.trim().length > 80) {
        return NextResponse.json(
          {
            success: false,
            error: `gcc: error: member_names[${i}] buffer overflow (maximum 80 characters allowed)`,
          },
          { status: 400 }
        );
      }
      trimmedMembers.push(name.trim());
    }

    // 4. Phone Number validation
    if (typeof phone_number !== "string" || !PHONE_REGEX.test(phone_number.trim())) {
      return NextResponse.json(
        {
          success: false,
          error: "gcc: error: phone_number format mismatch (expected 7-15 digits with optional '+' country code)",
        },
        { status: 400 }
      );
    }

    // 5. Connect to Supabase via Service Role Key (server-only)
    let supabase;
    try {
      supabase = getSupabaseAdmin();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "gcc: fatal error: database credentials unconfigured (missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local)",
        },
        { status: 500 }
      );
    }

    // 6. Insert into Supabase 'registrations' table
    const { data, error } = await supabase
      .from("registrations")
      .insert([
        {
          team_name: team_name.trim(),
          team_size: parsedSize,
          member_names: trimmedMembers,
          phone_number: phone_number.trim(),
        },
      ])
      .select("id, created_at, team_name, team_size")
      .single();

    if (error) {
      console.error("[server][supabase_insert_error]:", error.message);
      return NextResponse.json(
        {
          success: false,
          error: `gcc: fatal error: persistent storage allocation failed (${error.code || "SIGSEGV"})`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        registrationId: data.id,
        teamName: data.team_name,
        teamSize: data.team_size,
        memberCount: trimmedMembers.length,
        segmentAddress: "0x7FFF0001",
        createdAt: data.created_at,
        message: "Team registration committed to Supabase Postgres storage.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[server][register_error]:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      {
        success: false,
        error: "gcc: fatal error: persistent storage allocation failed (SIGSEGV)",
      },
      { status: 500 }
    );
  }
}
