import { SyncLoader } from "react-spinners";
import { Overlay } from "components/Overlay/Overlay.styled";

export const Loader = () => {
    return (
        <Overlay>
            <SyncLoader color="#2fa276" />
        </ Overlay>
    )
}