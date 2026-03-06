import { NextRequest, NextResponse } from "next/server";

// In-memory cart storage (in production, use database/Redis with user session)
const carts = new Map<string, CartItem[]>();

interface CartItem {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  quantity: number;
  customizations?: Record<string, string>;
  specialInstructions?: string;
}

export async function GET(request: NextRequest) {
  const sessionId = request.headers.get("x-session-id") || "anonymous";
  
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const cart = carts.get(sessionId) || [];
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = 2.5;
  const delivery = 5.0;
  const tax = +(subtotal * 0.085).toFixed(2);
  const total = subtotal + serviceFee + delivery + tax;

  return NextResponse.json({
    success: true,
    data: {
      items: cart,
      summary: {
        subtotal,
        serviceFee,
        delivery,
        tax,
        total,
        itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      },
    },
  });
}

export async function POST(request: NextRequest) {
  const sessionId = request.headers.get("x-session-id") || "anonymous";
  const body = await request.json();
  
  const { itemId, name, nameAr, price, quantity, customizations, specialInstructions } = body;

  if (!itemId || !price || !quantity) {
    return NextResponse.json(
      { success: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const cart = carts.get(sessionId) || [];
  
  // Check if item with same customizations exists
  const existingIndex = cart.findIndex(
    item => item.id === itemId && JSON.stringify(item.customizations) === JSON.stringify(customizations)
  );

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: itemId,
      name,
      nameAr,
      price,
      quantity,
      customizations,
      specialInstructions,
    });
  }

  carts.set(sessionId, cart);

  return NextResponse.json({
    success: true,
    data: { items: cart },
  });
}

export async function PUT(request: NextRequest) {
  const sessionId = request.headers.get("x-session-id") || "anonymous";
  const body = await request.json();
  
  const { itemId, quantity } = body;

  if (itemId === undefined || quantity === undefined) {
    return NextResponse.json(
      { success: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  await new Promise(resolve => setTimeout(resolve, 200));

  const cart = carts.get(sessionId) || [];

  if (quantity <= 0) {
    // Remove item from cart
    const index = cart.findIndex(item => item.id === itemId);
    if (index >= 0) {
      cart.splice(index, 1);
    }
  } else {
    // Update quantity
    const item = cart.find(item => item.id === itemId);
    if (item) {
      item.quantity = quantity;
    }
  }

  carts.set(sessionId, cart);

  return NextResponse.json({
    success: true,
    data: { items: cart },
  });
}

export async function DELETE(request: NextRequest) {
  const sessionId = request.headers.get("x-session-id") || "anonymous";
  
  await new Promise(resolve => setTimeout(resolve, 200));

  carts.delete(sessionId);

  return NextResponse.json({
    success: true,
    data: { items: [] },
  });
}
