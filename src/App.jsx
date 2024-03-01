import { useCallback } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const handleMessagesEvent = useCallback((event) => {
    if (event.data.eventName === "userType") {
      // eslint-disable-next-line no-console
      console.log("userType event received", event.data.data?.locale, event.data.data?.userType);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleMessagesEvent);

    return () => {
      window.removeEventListener("message", handleMessagesEvent);
    };
  }, [handleMessagesEvent]);

  const getUserType = () => {
    window.parent.postMessage({ eventName: "getUserType" }, "*");
  };
  const addToCart = () => {
    window.parent.postMessage({ eventName: "addToCart", data: {
      skuId: '100001161',
      quantity: 1,
    } }, "*");
  };
  return (
    <div>
      <button onClick={getUserType}>Get User Type</button>
      <button onClick={addToCart}>Add To Cart</button>
    </div>
  );
}

export default App;
