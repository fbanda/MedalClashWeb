import {useNavigate, useSearchParams} from "react-router-dom";
import {useStore} from "../store/store.ts";
import {useEffect} from "react";
import {notification} from "antd";
import {getCurrentFormattedDate, SaveDeckToStore} from "../Utils.ts";

export const LoadDeck = () => {
  const [searchParams] = useSearchParams();
  const [api, contextHolder] = notification.useNotification();
  const store = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const deck = searchParams.get("deck");
    const sideDeck = searchParams.get("sideDeck");
    const leader = searchParams.get("leader");
    const medalLvl1 = searchParams.get("medalLvl1");
    const medalLvl2 = searchParams.get("medalLvl2");
    const medalLvl3 = searchParams.get("medalLvl3");

    if(deck === null || sideDeck === null || leader === null || medalLvl1 === null || medalLvl2 === null || medalLvl3 === null) {
      api.error({
        title: "Invalid deck.",
        description: "Please, check the link and try again.",
        placement: "topRight",
      });
      setTimeout(() => navigate("/builder", { replace: true }), 3000)
      return;
    }

    store.resetDeck();

    const deckName = "NewDeck__" + getCurrentFormattedDate();

    try {
      SaveDeckToStore(store, deckName, deck, sideDeck, leader, medalLvl1, medalLvl2, medalLvl3);
      navigate("/builder", { replace: true });
    }catch (err) {
      console.error("invalid deck", err);
    }

  }, [searchParams]);

  return (
      <>
        {contextHolder}
        <div>Loading...</div>
      </>
  )
}