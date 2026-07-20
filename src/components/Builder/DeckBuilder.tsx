import {useStore} from "../../store/store.ts";
import {useEffect, useState} from "react";
import dataSet from "../../assets/TestCardDataSet.json";
import {Button, Dropdown, Input, notification} from "antd";
import {LeaderAndMedalsCard} from "./LeaderAndMedalsCard.tsx";
import {DeckCard} from "./DeckCard.tsx";
import {SaveDeckToStore} from "../../Utils.ts";

export const DeckBuilder = () => {
  const store = useStore();
  const [api, contextHolder] = notification.useNotification();
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [sideDisplayData, setSideDisplayData] = useState<any[]>([]);
  const [deckName, setDeckName] = useState<string>(store.deck.name);

  const [savedDecks, setSavedDecks] = useState<string[]>([]);

  const [leader, setLeader] = useState<any>(null);
  const [medalLvl1, setMedalLvl1] = useState<any>(null);
  const [medalLvl2, setMedalLvl2] = useState<any>(null);
  const [medalLvl3, setMedalLvl3] = useState<any>(null);
  const [leadMedals, setLeadMedals] = useState<number>(0);

  useEffect(() => {
    const deckCardsIds = store.deck.cards.map(item => item.id);
    const sideCardsIds = store.deck.sideCards.map(item => item.id);

    const dataToDisplay: any[] = [];
    const sideDataToDisplay: any[] = [];
    let leadMedalsCount = 0;

    dataSet.forEach(item => {
      if (deckCardsIds.includes(item.cardId)) {
        dataToDisplay.push(item);
      }
      if (sideCardsIds.includes(item.cardId)) {
        sideDataToDisplay.push(item);
      }
      if (item.cardId === store.deck.leader) { setLeader(item); leadMedalsCount++; }
      if (item.cardId === store.deck.medalLvl1) { setMedalLvl1(item); leadMedalsCount++; }
      if (item.cardId === store.deck.medalLvl2) { setMedalLvl2(item); leadMedalsCount++; }
      if (item.cardId === store.deck.medalLvl3) { setMedalLvl3(item); leadMedalsCount++; }
      if (!store.deck.leader) setLeader(null);
      if (!store.deck.medalLvl1) setMedalLvl1(null);
      if (!store.deck.medalLvl2) setMedalLvl2(null);
      if (!store.deck.medalLvl3) setMedalLvl3(null);
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayData(dataToDisplay);
    setSideDisplayData(sideDataToDisplay);
    setLeadMedals(leadMedalsCount);
  }, [store.deck.cards, store.deck.leader, store.deck.medalLvl1, store.deck.medalLvl2, store.deck.medalLvl3, store.deck.sideCards]);

  const resetDeck = () => {
    store.resetDeck();
  }

  const onGetURL = async () => {
    const name = deckName;
    const leader = store.deck.leader;
    const medalLvl1 = store.deck.medalLvl1;
    const medalLvl2 = store.deck.medalLvl2;
    const medalLvl3 = store.deck.medalLvl3;
    const deck = store.deck.cards.map(item => `${item.id}x${item.amount}`);
    const sideDeck = store.deck.sideCards.map(item => `${item.id}x${item.amount}`);
    const url = `${window.location.origin}/loadDeck?deckName=${name}&leader=${leader}&medalLvl1=${medalLvl1}&medalLvl2=${medalLvl2}&medalLvl3=${medalLvl3}&deck=${deck.join(",")}&sideDeck=${sideDeck.join(",")}`;
    await navigator.clipboard.writeText(url);
    api.success({
      description: "Url copied to clipboard.",
      placement: "topRight",
    });
  }

  const exportToJson = async () => {
    const deck = store.deck.cards.map(item => `${item.id}x${item.amount}`);
    const sideDeck = store.deck.sideCards.map(item => `${item.id}x${item.amount}`);
    const jsonData = {
      deckName: deckName,
      leader: store.deck.leader,
      medalLvl1: store.deck.medalLvl1,
      medalLvl2: store.deck.medalLvl2,
      medalLvl3: store.deck.medalLvl3,
      deck: deck.join(","),
      sideDeck: sideDeck.join(","),
    }
    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = deckName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const loadFromJsonFile = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const jsonData = JSON.parse(e.target?.result as string);

            store.resetDeck();

            SaveDeckToStore(store, jsonData.deckName, jsonData.deck, jsonData.sideDeck, jsonData.leader, jsonData.medalLvl1, jsonData.medalLvl2, jsonData.medalLvl3);

            api.success({
              title: "Deck loaded",
              description: "Deck loaded successfully.",
              placement: "topRight",
            });
          } catch (err) {
            console.error(err)
            api.error({
              title: "Invalid file",
              description: "Please, check the file and try again.",
              placement: "topRight",
            });
          }
        };
        reader.readAsText(file);
      }
    };
    fileInput.click();
  };

  const save = () => {
    const deck = store.deck.cards.map(item => `${item.id}x${item.amount}`);
    const sideDeck = store.deck.sideCards.map(item => `${item.id}x${item.amount}`);
    const jsonData = {
      deckName: deckName,
      leader: store.deck.leader,
      medalLvl1: store.deck.medalLvl1,
      medalLvl2: store.deck.medalLvl2,
      medalLvl3: store.deck.medalLvl3,
      deck: deck.join(","),
      sideDeck: sideDeck.join(","),
    }

    const deckList: string | null = localStorage.getItem("deckList");
    let newDeckList = "";

    if (deckList) {
      const deckListObj = JSON.parse(deckList);
      deckListObj[deckName] = jsonData;
      newDeckList = JSON.stringify(deckListObj);
    } else {
      newDeckList = JSON.stringify({[deckName]: jsonData});
    }

    localStorage.setItem("deckList", newDeckList);
    setSavedDecks(Object.keys(JSON.parse(localStorage.getItem("deckList") || "{}")));
    api.success({
      description: "Deck saved successfully.",
      placement: "topRight",
    });
  }

  const load = (deckName: string) => {
    const deckList: string | null = localStorage.getItem("deckList");
    if (deckList) {
      const deckListObj = JSON.parse(deckList);
      if (deckListObj[deckName]) {
        const deckData = deckListObj[deckName];
        store.resetDeck();
        SaveDeckToStore(store, deckData.deckName, deckData.deck, deckData.sideDeck, deckData.leader, deckData.medalLvl1, deckData.medalLvl2, deckData.medalLvl3);
        api.success({
          title: "Deck loaded",
          description: "Deck loaded successfully.",
        })
      }
    }
  }

  return (
      <div className={"flex flex-col gap-0 p-4 my-6"}>
        {contextHolder}
        <div className={"flex flex-col md:flex-row gap-4"}>
          <div className={"flex flex-col gap-4 basis-1/3 mb-6"}>
            <div className={"flex flex-row gap-2 items-center"}>
              <div className={"text-start"}>Deck Name:</div>
              <div>
                <Input placeholder={"Deck Name"} value={deckName} onChange={(e) => setDeckName(e.target.value)}/>
              </div>
            </div>
            <div className={"flex flex-row gap-2 items-start"}>
              <Button className={"w-40"} htmlType={"button"} onClick={save} disabled={!deckName}>Save</Button>
              <Dropdown menu={{ items: savedDecks.map(item => ({key: item, label: <>{item}  <Button>borrar</Button></>, onClick: () => { load(item)}})) }} placement="bottomLeft">
                <Button className={"w-40"}>Load</Button>
              </Dropdown>
            </div>
            <div className={"flex flex-row gap-2 items-start"}>
              <Button className={"w-40"} htmlType={"button"} onClick={resetDeck}>New</Button>
              <Button className={"w-40"} htmlType={"button"} onClick={onGetURL}>Get URL</Button>
            </div>
            <div className={"flex flex-row gap-2 items-start"}>
              <Button className={"w-40"} htmlType={"button"} onClick={exportToJson}>Export JSON</Button>
              <Button className={"w-40"} htmlType={"button"} onClick={loadFromJsonFile}>Load JSON</Button>
            </div>
          </div>
          <div className={"basis-2/3"}>
            <div className={"font-michroma font-bold text-xl text-left mb-3"}>Leader and Medals ({leadMedals})</div>
            {!leader && !medalLvl1 && !medalLvl2 && !medalLvl3 && (
                <div className={"text-start"}>
                  No leader or medals have been selected.
                </div>
            )}
            <div
                className={"grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 content-center mb-6"}>
              {/* Leader */}
              {leader && (
                  <LeaderAndMedalsCard card={leader}/>
              )}
              {/* Medals */}
              {medalLvl1 && (
                  <LeaderAndMedalsCard card={medalLvl1}/>
              )}
              {medalLvl2 && (
                  <LeaderAndMedalsCard card={medalLvl2}/>
              )}
              {medalLvl3 && (
                  <LeaderAndMedalsCard card={medalLvl3}/>
              )}
            </div>
          </div>
        </div>
        <div className={"font-michroma font-bold text-xl text-left mb-3"}>Main Deck ({store.deck.cards.reduce((sum, card) => sum + card.amount, 0)})</div>
        {displayData.length === 0 && (
            <div className={"text-start"}>
              No Cards for deck have been selected.
            </div>
        )}
        <div
            className={"grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 content-center mb-8"}>
          {displayData.map((card, index) => (
              <DeckCard
                  key={`d-${index}`}
                  card={card}
                  amount={store.deck.cards.find(item => item.id === card.cardId)?.amount || 0}
                  isError={store.deck.cards.find(c => c.id === card.cardId)?.isError ?? false}
              />
          ))}
        </div>
        <div className={"font-michroma font-bold text-xl text-left mb-3"}>Side Deck ({store.deck.sideCards.reduce((sum, card) => sum + card.amount, 0)})</div>
        {sideDisplayData.length === 0 && (
            <div className={"text-start"}>
              No Cards for side deck have been selected.
            </div>
        )}
        <div
            className={"grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 content-center mb-6"}>
          {sideDisplayData.map((card, index) => (
              <DeckCard
                  key={`s-${index}`}
                  card={card}
                  amount={store.deck.sideCards.find(item => item.id === card.cardId)?.amount || 0}
                  isSideDeck
                  isError={store.deck.sideCards.find(c => c.id === card.cardId)?.isError ?? false}
              />
          ))}
        </div>
      </div>
  )
}