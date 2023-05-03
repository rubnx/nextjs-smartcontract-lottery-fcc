import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div>
            {/* with moralisAuth={false} we make explicit that we are not connecting to a server */}
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
