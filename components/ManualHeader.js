import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    // useMoralis is a React hook
    // Hooks let you "hook into" React state and lifecycle features
    // it's a way to keep track of state in our app
    // our page automatically re-renders when something changes
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis()

    // useEffect is a React element that is constantly running
    // automatically runs on load, then it'll run checking the value
    // it takes a function and an array (array is optional).
    // The function is called every time the element in the array changes
    // if there is no array it runs every time anything re-renders
    // in this case everytime we run enableWeb3 (we refresh the page) isWeb3Enabled is going to turn true
    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])
    // no array, run on every render
    // empty array, run once
    // dependency array, run when the stuff in it changesan

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>
                    Connected! to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                            // injected refers to metamask
                            // after connecting store this key,value in local browser storage
                            // useEffect will read it and will keep us connected
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                    // isWeb3EnableLoading disables the button while metamask is loading (before connecting)
                >
                    Connect
                </button>
            )}
        </div>
    )
}
