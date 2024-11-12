import Google from "../icons/Google";
import { getUrl } from "./utils";

export default function GoogleAuthButton() {

    const handleGoogleAuth = () => {

        // Redirect the user to the backend route for Google authentication
        window.location.href = `${getUrl(true)}/google`

    }

    return <button
        onClick={handleGoogleAuth}
        style={{
            display: "flex",
            alignItems: 'center',
            gap: '10px',
            padding: '10px',
            cursor: "pointer"
        }}>
        <Google /> Login With Google
    </button>
}


