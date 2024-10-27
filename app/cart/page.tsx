"use client";;
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EnhancedCartItemType } from "@/lib/types/types";
import { startCheckoutAction } from "../actions/start-checkout";
import { removeFromCartAction } from "../actions/remove-from-cart";
import { getStripe } from "@/utils/stripe/client";
import Loading from "../loading";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Eye, Trash } from "lucide-react";
import { postData } from "@/utils/helpers";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<
    EnhancedCartItemType[] | undefined
  >();
  const [initialAmount, setInitialAmount] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const { amount, cartDetails } = await startCheckoutAction();

        setInitialAmount(amount);
        const calculatedShipping = amount > 75 || !amount ? 0.0 : 15.0;
        setShippingCost(calculatedShipping);
        setTotalAmount(amount + calculatedShipping);
        setCartItems(cartDetails);
      } catch (error: any) {
        console.error("Error fetching cart items:", error?.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, [router]);

  const handleRemoveFromCart = async (cartItemId: string) => {
    await removeFromCartAction(cartItemId);
    setCartItems(cartItems?.filter((item) => item.id !== cartItemId));
  };

  useEffect(() => {
    if (cartItems) {
      const newTotal = cartItems.reduce((acc, item) => acc + item.price, 0);
      setInitialAmount(newTotal);
      const calculatedShipping = newTotal > 75 || !newTotal ? 0.0 : 15.0;
      setShippingCost(calculatedShipping);
      setTotalAmount(newTotal + calculatedShipping);
    }
  }, [cartItems]);

  const handleCheckout = async () => {
    if (!agreedToTerms) return;
    if (cartItems == undefined || !cartItems.length) return;

    const { data: user } = await createClient().auth.getUser();

    if (!user?.user) {
      router.push("/sign-in");
      return;
    }

    const { sessionId } = await postData({
      url: "/api/create-checkout-session",
      data: {
        cartItems,
        total: initialAmount,
        userId: user?.user?.id,
        userEmail: user?.user?.email,
      },
    });
    if (sessionId) {
      const stripe = await getStripe();
      await stripe?.redirectToCheckout({ sessionId });
    }
  };

  return (
    <div className="flex flex-1 flex-col container mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-left">Cart</h1>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Card className="hidden md:block ">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="text-center ">Actions</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Your cart is empty.
                    </TableCell>
                  </TableRow>
                ) : (
                  cartItems?.map((item: EnhancedCartItemType) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-start">
                        <Suspense
                          fallback={<Skeleton className="w-[50px] h-[75px]" />}
                        >
                          <Image
                            src={
                              item.book.image_directory !== null &&
                              item.book.num_images &&
                              item.book.num_images > 0
                                ? `${item.book.image_directory}image-1.png`
                                : "/placeholder.png"
                            }
                            alt={item.book.title}
                            width={50}
                            height={75}
                            className="object-contain rounded-sm"
                          />
                        </Suspense>
                      </TableCell>
                      <TableCell className="text-start max-w-[200px]">
                        <p className="line-clamp-1">{item.book.title}</p>
                      </TableCell>
                      <TableCell className="text-start">
                        {item.book.author}
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-center gap-2 items-center space-x-2 ">
                          <Button
                            variant="ghost"
                            onClick={() =>
                              router.push(`/books/${item.book.id}`)
                            }
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Eye size={16} />
                              </TooltipTrigger>
                              <TooltipContent>View Book</TooltipContent>
                            </Tooltip>
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Trash className="text-destructive" size={16} />
                              </TooltipTrigger>
                              <TooltipContent>Remove From Cart</TooltipContent>
                            </Tooltip>
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-start">
                        ${item.price.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>

              <TableFooter className="bg-card">
                <TableRow>
                  <TableCell colSpan={4} className="text-right">
                    Shipping:
                  </TableCell>
                  <TableCell>${shippingCost.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-bold">
                    Total:
                  </TableCell>
                  <TableCell className="font-bold">
                    ${totalAmount.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Card>

          {cartItems && cartItems.length > 0 && (
            <div className="hidden md:flex items-center justify-end space-x-2 mt-4 text-xs">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) =>
                  setAgreedToTerms(checked === true)
                }
              />
              <Label htmlFor="terms" className="leading-none text-muted-foreground">
                I agree to the{" "}
                <Link href="/terms-of-service" className="underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="underline">
                  Privacy Policy
                </Link>
                .
              </Label>
            </div>
          )}

          <div className="hidden md:flex justify-end items-center">
            <Button
              variant="default"
              onClick={handleCheckout}
              disabled={cartItems?.length === 0 || !agreedToTerms}
            >
              Proceed to Checkout
            </Button>
          </div>

          <div className="block md:hidden space-y-4">
            {cartItems?.length === 0 ? (
              <div className="text-center">Your cart is empty.</div>
            ) : (
              cartItems?.map((item: EnhancedCartItemType) => (
                <Card key={item.id} className="flex flex-col p-4">
                  <CardContent className="flex items-center space-x-4">
                    <Suspense
                      fallback={<Skeleton className="w-[75px] h-[100px]" />}
                    >
                      <Image
                        src={
                          item.book.image_directory !== null &&
                              item.book.num_images &&
                              item.book.num_images > 0
                                ? `${item.book.image_directory}image-1.png`
                                : "/placeholder.png"
                        }
                        alt={item.book.title}
                        width={75}
                        height={100}
                        className="object-contain rounded-md"
                      />
                    </Suspense>
                    <div className="flex-1">
                      <CardTitle className="text-base font-semibold">
                        {item.book.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {item.book.author}
                      </CardDescription>
                      <CardDescription className="text-sm font-bold mt-2">
                        Price: ${item.price.toFixed(2)}
                      </CardDescription>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2 mt-4">
                    <Button
                      variant="ghost"
                      onClick={() => router.push(`/books/${item.book.id}`)}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Eye size={16} />
                        </TooltipTrigger>
                        <TooltipContent>View Book</TooltipContent>
                      </Tooltip>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Trash className="text-destructive" size={16} />
                        </TooltipTrigger>
                        <TooltipContent>Remove From Cart</TooltipContent>
                      </Tooltip>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
            {cartItems && cartItems.length > 0 && (
              <Card className="p-4 space-y-4 leading-loose flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between">
                  <p>Subtotal:</p>
                  <p>${initialAmount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping:</p>
                  <p>${shippingCost.toFixed(2)}</p>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <p>Total:</p>
                  <p>${totalAmount.toFixed(2)}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms-mobile"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) =>
                      setAgreedToTerms(checked === true)
                    }
                  />
                  <label
                    htmlFor="terms-mobile"
                    className="text-xs leading-none text-muted-foreground"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="underline text-xs">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline text-xs">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                <Button
                  className="w-full "
                  onClick={handleCheckout}
                  disabled={cartItems?.length === 0 || !agreedToTerms}
                >
                  Proceed to Checkout
                </Button>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}
