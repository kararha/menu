import { NextRequest, NextResponse } from "next/server";
import { menuItems } from "@/data/menuData";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const limit = parseInt(searchParams.get("limit") || "10");

  if (!query || query.length < 2) {
    return NextResponse.json({
      success: true,
      data: { items: [], suggestions: [] },
    });
  }

  const searchLower = query.toLowerCase();

  const matchedItems = menuItems
    .filter(
      item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.nameAr.includes(query) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower)
    )
    .slice(0, limit);

  // Get unique category suggestions
  const categories = [...new Set(matchedItems.map(item => item.category))];

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 150));

  return NextResponse.json({
    success: true,
    data: {
      items: matchedItems,
      suggestions: categories,
      query,
    },
  });
}
