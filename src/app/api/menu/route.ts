import { NextRequest, NextResponse } from "next/server";
import { menuItems, menuCategories } from "@/data/menuData";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "popular";
  const dietary = searchParams.get("dietary")?.split(",").filter(Boolean) || [];

  let filteredItems = [...menuItems];

  // Filter by category
  if (category !== "all") {
    filteredItems = filteredItems.filter(item => item.category === category);
  }

  // Filter by search
  if (search) {
    const searchLower = search.toLowerCase();
    filteredItems = filteredItems.filter(
      item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.nameAr.includes(search) ||
        item.description.toLowerCase().includes(searchLower)
    );
  }

  // Filter by dietary requirements
  if (dietary.length > 0) {
    filteredItems = filteredItems.filter(item =>
      dietary.every(req => item.dietary?.includes(req))
    );
  }

  // Sort items
  switch (sortBy) {
    case "price_low":
      filteredItems.sort((a, b) => a.price - b.price);
      break;
    case "price_high":
      filteredItems.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filteredItems.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "name":
      filteredItems.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      filteredItems.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }

  // Pagination
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + limit);

  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 300));

  return NextResponse.json({
    success: true,
    data: {
      items: paginatedItems,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    },
    categories: menuCategories,
  });
}
