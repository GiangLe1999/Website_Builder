import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// The routes "/site" and "/api/uploadthing" are considered public and can be accessed without authentication.
export default authMiddleware({
  publicRoutes: ["/site", "/api/uploadthing"],
  async beforeAuth(auth, req) {},
  async afterAuth(auth, req) {
    // rewrite for domains
    // url object provides information about the request URL
    const url = req.nextUrl;
    const searchParams = url.searchParams.toString();
    // Hostname variable gets the headers object from the request, which includes HTTP header fields such as "host".
    let hostname = req.headers;
    const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

    // Kiểm tra xem trong request url có chứa đoạn sub domain hay không
    // If a client sends a request to "example.com", the "Host" header might be "example.com".
    // filter(Boolean) is a common idiom used to remove falsy values from an array
    const customSubDomain = hostname
      .get("host")
      ?.split(process.env.NEXT_PUBLIC_DOMAIN as string)
      .filter(Boolean)[0];

    // Nếu trong request URL có chứa sub domain, có nghĩa là người dùng gửi request tới URL có dạng: test.example.com
    // Tuy nhiên đó chỉ là về mặt hình thức, với đoạn middleware dưới đây ta sẽ xử lý để bất kỳ request
    // nào có chứa subdoamin sẽ được rewrite để gửi tới URL có dạng: example.com/test?a=1&b=2
    // Đây có thể coi là kỹ thuật đánh lừa thị giác khi mà URL có dạng subdomain nhưng thực tế nó vẫn được xử lý bởi domain chính
    if (customSubDomain) {
      // Rewrite the request to a different URL than the one originally requested by the client
      // The rewrite occurs server-side, and the client's browser URL does not change
      return NextResponse.rewrite(
        new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
      );
    }

    if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
      // Unlike rewrite, redirect actually changes the URL displayed in the browser to the new URL specified in the redirect.
      return NextResponse.redirect(new URL("/agency/sign-in", req.url));
    }

    if (
      url.pathname === "/" ||
      (url.pathname === "/site" && url.host === process.env.NEXT_PUBLIC_DOMAIN)
    ) {
      return NextResponse.rewrite(new URL("/site", req.url));
    }

    if (
      url.pathname.startsWith("/agency") ||
      url.pathname.startsWith("/subaccount")
    ) {
      return NextResponse.rewrite(new URL(pathWithSearchParams, req.url));
    }
  },
});

// Specifies which routes should be handled by Next.js
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
