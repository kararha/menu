import { NextRequest, NextResponse } from "next/server";
import { menuItems } from "@/data/menuData";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const item = menuItems.find(item => item.id === parseInt(id));

  if (!item) {
    return NextResponse.json(
      { success: false, error: "Item not found" },
      { status: 404 }
    );
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));

  return NextResponse.json({
    success: true,
    data: item,
  });
}
