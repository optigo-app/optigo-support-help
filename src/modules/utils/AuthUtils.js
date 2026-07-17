import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


export function decodeBase64(base64Str) {
    try {
        return decodeURIComponent(
            atob(base64Str)
                .split("")
                .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
                .join("")
        );
    } catch (error) {
        console.error("Base64 decoding failed:", error);
        return null;
    }
}

export function GetCredentialsFromCookie() {
    try {
        let token = null;
        let isSkey = false;

        const skey = Cookies.get("skey");
        const helpSupport = Cookies.get("help_support");

        if (skey) {
            token = skey;
            isSkey = true;
        } else if (helpSupport) {
            token = helpSupport;
            isSkey = false;
        }

        if (!token) {
            console.warn("Neither help_support nor skey cookie found");
            return null;
        }

        const decoded = jwtDecode(token);
        const companyEncoded = decoded?.uid;
        const user = companyEncoded ? decodeBase64(companyEncoded) : null;
        return {
            ...decoded,
            userId: user,
            isSkeyCookie: isSkey,
        };
    } catch (error) {
        console.error("Failed to parse JWT from cookie:", error);
        return null;
    }
}

// export function createAndStoreToken(payload, expiresIn = '7d') {
//     try {
//       const token = jwt.sign(payload, 'TOP_SECRET_KEY', { expiresIn });
//       const cookieOptions = {
//         path: '/',
//         secure: process.env.NODE_ENV === 'production',
//         expires: 7,
//         sameSite: 'strict',
//       };

//       // 3. Store token in cookie
//       Cookies.set('skey', token, cookieOptions);

//       console.log("JWT token created and stored in cookie.");

//       return token;
//     } catch (error) {
//       console.error("Failed to create/store JWT token:", error);
//       return null;
//     }
//   }
