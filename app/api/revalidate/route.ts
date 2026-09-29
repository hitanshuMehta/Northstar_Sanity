import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    revalidatePath("/", "layout");
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      message: "Revalidated layout path successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Revalidation failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  revalidatePath("/", "layout");
  return NextResponse.json({
    revalidated: true,
    message: "Manual revalidation triggered",
  });
}
