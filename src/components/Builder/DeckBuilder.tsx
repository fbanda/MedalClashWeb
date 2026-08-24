import {useStore} from "../../store/store.ts";
import {useEffect, useState} from "react";
import dataSet from "../../assets/TestCardDataSet.json";
import {Alert, Button, Dropdown, Input, notification} from "antd";
import {LeaderAndMedalsCard} from "./LeaderAndMedalsCard.tsx";
import {DeckCard} from "./DeckCard.tsx";
import {SaveDeckToStore} from "../../Utils.ts";
import {ConfirmationModal, type ConfirmationModalProps} from "../ConfirmationModal.tsx";

export const DeckBuilder = () => {
  const store = useStore();
  const [api, contextHolder] = notification.useNotification();
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [sideDisplayData, setSideDisplayData] = useState<any[]>([]);
  const [deckName, setDeckName] = useState<string>(store.deck.name);

  const [savedDecks, setSavedDecks] = useState<{label: string, value: string}[]>([]);

  const [leader, setLeader] = useState<any>(null);
  const [medalLvl1, setMedalLvl1] = useState<any>(null);
  const [medalLvl2, setMedalLvl2] = useState<any>(null);
  const [medalLvl3, setMedalLvl3] = useState<any>(null);
  const [leadMedals, setLeadMedals] = useState<number>(0);

  const [confirmationModalProps, setConfirmationModalProps] = useState<ConfirmationModalProps>({
    title: "Unsaved Changes",
    message: "Are you sure you want to continue?",
    onConfirm: () => {},
    setIsDeleteModalOpen: () => {},
    isDeleteModalOpen: false,
  })

  const deckToJson = () => {
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

    return jsonData;
  }

  const isDirty = () => {
    const deckList = JSON.parse(localStorage.getItem("deckList") || "{}");
    const currentDeckJson = deckToJson();
    // Verificar si el deck actual está vacío
    const isDeckEmpty =
        store.deck.cards.length === 0 &&
        store.deck.sideCards.length === 0 &&
        !store.deck.leader &&
        !store.deck.medalLvl1 &&
        !store.deck.medalLvl2 &&
        !store.deck.medalLvl3;

    const id = store.deck.id;
    // Si el deck existe en localStorage, comparar
    if (id && id in deckList) {
      const savedDeck = deckList[id];
      return JSON.stringify(savedDeck) !== JSON.stringify(currentDeckJson);
    }
    // Si el deck no existe en localStorage y está vacío, no hay cambios
    if (isDeckEmpty) {
      return false;
    }
    // El deck no existe en localStorage pero tiene contenido, hay cambios
    return true;
  }

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
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!store.deck.leader) setLeader(null);
    if (!store.deck.medalLvl1) setMedalLvl1(null);
    if (!store.deck.medalLvl2) setMedalLvl2(null);
    if (!store.deck.medalLvl3) setMedalLvl3(null);

    setDisplayData(dataToDisplay);
    setSideDisplayData(sideDataToDisplay);
    setLeadMedals(leadMedalsCount);

    const deckList = JSON.parse(localStorage.getItem("deckList") || "{}");

    const options = Object.keys(deckList).map(item => ({
      label: deckList[item].deckName,
      value: item,
    }))

    setSavedDecks(options);
  }, [store.deck.cards, store.deck.leader, store.deck.medalLvl1, store.deck.medalLvl2, store.deck.medalLvl3, store.deck.sideCards]);

  const resetDeck = () => {
    if (isDirty()) {
      setConfirmationModalProps({
        title: "Unsaved Changes",
        message: "You have unsaved changes. Are you sure you want to continue?",
        onConfirm: () => store.resetDeck(),
        isDeleteModalOpen: true,
        setIsDeleteModalOpen: () => setConfirmationModalProps({...confirmationModalProps, isDeleteModalOpen: false}),
      })
    } else {
      store.resetDeck();
    }
  }

  const onGetURL = async () => {
    const leader = store.deck.leader;
    const medalLvl1 = store.deck.medalLvl1;
    const medalLvl2 = store.deck.medalLvl2;
    const medalLvl3 = store.deck.medalLvl3;
    const deck = store.deck.cards.map(item => `${item.id}x${item.amount}`);
    const sideDeck = store.deck.sideCards.map(item => `${item.id}x${item.amount}`);
    const url = `${window.location.origin}/MedalClashWeb/#/loadDeck?leader=${leader}&medalLvl1=${medalLvl1}&medalLvl2=${medalLvl2}&medalLvl3=${medalLvl3}&deck=${deck.join(",")}&sideDeck=${sideDeck.join(",")}`;
    await navigator.clipboard.writeText(url);
    api.success({
      description: "Url copied to clipboard.",
      placement: "topRight",
    });
  }

  const getColorWord = (color?:string):string => {
    switch(color){
      case "R": return "Red";
      case "P": return "Purple";
      case "B": return "Blue";
      case "G": return "Green";
      case "Y": return "Yellow";
    }
    return "";
  }

  const onExport = async () => {
    const deckId = store.deck.id;
    const deckName = store.deck.name;

    const listMedabot = store.deck.cards.filter(item => dataSet.find(c => c.cardId === item.id)?.cardType === "Medabot").map(item => `\n${item.amount} ${item.id}`).join("");
    const listMedafighter = store.deck.cards.filter(item => dataSet.find(c => c.cardId === item.id)?.cardType === "Medafighter").map(item => `\n${item.amount} ${item.id}`).join("");
    const listEvent = store.deck.cards.filter(item => dataSet.find(c => c.cardId === item.id)?.cardType === "Event").map(item => `\n${item.amount} ${item.id}`).join("");
    const listSideboard = store.deck.sideCards.map(item => `\n${item.amount} ${item.id}`).join("");

    const medal1Color = getColorWord(dataSet.find(c => c.cardId === store.deck.medalLvl1)?.colors[0]);
    const medal2Color = getColorWord(dataSet.find(c => c.cardId === store.deck.medalLvl2)?.colors[0]);
    const medal3Color = getColorWord(dataSet.find(c => c.cardId === store.deck.medalLvl3)?.colors[0]);
    const deckString = `Leader:\n1 ${store.deck.leader}\n\nMedal-Lv1-${medal1Color}:\n1 ${store.deck.medalLvl1}\n\nMedal-Lv2-${medal2Color}:\n1 ${store.deck.medalLvl2}\n\nMedal-Lv3-${medal3Color}:\n1 ${store.deck.medalLvl3}\n\nMedabot:${listMedabot}\n\nMedafighter:${listMedafighter}\n\nEvent:${listEvent}\n\nSideboard:${listSideboard}`;

    const deckParam = encodeURIComponent(btoa(deckString));
    const url = `https://tcg-arena.fr/import?game=Medal+Clash+%28Test%29&name=${deckName}&id=${deckId}&deck=${deckParam}`;
    window.open(url);
  }

  const save = () => {
    const jsonData = deckToJson();
    const deckList: string | null = localStorage.getItem("deckList");
    let newDeckList = "";
    const curDate = String(new Date().getTime());

    if (deckList && store.deck.id) {
      const deckListObj = JSON.parse(deckList);
      deckListObj[store.deck.id] = jsonData;
      newDeckList = JSON.stringify(deckListObj);
    } else {
      store.setDeckId(curDate);
      newDeckList = JSON.stringify({[curDate]: jsonData});
    }

    localStorage.setItem("deckList", newDeckList);

    const parseDeckList = JSON.parse(localStorage.getItem("deckList") || "{}");

    const options = Object.keys(parseDeckList).map(item => ({
      label: parseDeckList[item].deckName,
      value: item,
    }))

    setSavedDecks(options);
    api.success({
      description: "Deck saved successfully.",
    });
  }

  const load = (deckId: string) => {
    const loadDeck = () => {
      const deckList: string | null = localStorage.getItem("deckList");
      if (deckList) {
        const deckListObj = JSON.parse(deckList);
        if (deckListObj[deckId]) {
          const deckData = deckListObj[deckId];
          store.resetDeck();
          SaveDeckToStore(store, deckData.deckName, deckData.deck, deckData.sideDeck, deckData.leader, deckData.medalLvl1, deckData.medalLvl2, deckData.medalLvl3, deckId);
          api.success({
            description: "Deck loaded successfully.",
          })
        }
      }
    }

    if (isDirty()) {
      setConfirmationModalProps({
        title: "Unsaved Changes",
        message: "You have unsaved changes. Are you sure you want to continue?",
        onConfirm: () => loadDeck(),
        isDeleteModalOpen: true,
        setIsDeleteModalOpen: () => setConfirmationModalProps({...confirmationModalProps, isDeleteModalOpen: false}),
      })
    } else {
      loadDeck();
    }
  }

  const deleteDeck = () => {
    const deckList: string | null = localStorage.getItem("deckList");
    if (deckList) {
      const deckListObj = JSON.parse(deckList);
      if (deckListObj[store.deck.id]) {
        delete deckListObj[store.deck.id];
        localStorage.setItem("deckList", JSON.stringify(deckListObj));
        setSavedDecks(Object.keys(deckListObj).map(item => ({
          label: deckListObj[item].deckName,
          value: item,
        })));
        store.resetDeck();
      }
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDeckName(store.deck.name)
  }, [store.deck.name]);

  const warningMissingLeaderMedal = store.deck.leader === "";
  const warningRequirements = store.deck.cards.some(card => card.isError) || store.deck.sideCards.some(card => card.isError);
  const warningUnder = store.deck.cards.reduce((sum, card) => sum + card.amount, 0) < 40;
  const warningOverMain = store.deck.cards.reduce((sum, card) => sum + card.amount, 0) > 50;
  const warningOverSide = store.deck.sideCards.reduce((sum, card) => sum + card.amount, 0) > 10;

  return (
      <div className={"flex flex-col gap-0 p-4 my-6"}>
        {contextHolder}
        <ConfirmationModal {...confirmationModalProps}/>
        <div className={"flex flex-col md:flex-row gap-4"}>
          <div className={"flex flex-col gap-4 basis-1/3 mb-6"}>
            <div className={"flex flex-row gap-2 items-center"}>
              <div className={"text-start"}>Deck Name:</div>
              <div className={"w-[60%]"}>
                <Input
                    placeholder={"Deck Name"}
                    value={deckName}
                    onChange={(e) => {
                      setDeckName(e.target.value);
                      store.setDeckName(e.target.value);
                    }}
                />
              </div>
            </div>
            <div className={"flex flex-row gap-2 items-start"}>
              <Button className={"w-40"} htmlType={"button"} onClick={save} disabled={!deckName}>Save</Button>
              <Button className={"w-40"} htmlType={"button"} onClick={resetDeck}>New</Button>
            </div>
            <div className={"flex flex-row gap-2 items-start"}>
              <Dropdown menu={{items: savedDecks.map(item => ({key: item.value, label: <>{item.label}</>, onClick: () => { load(item.value)}})) }} placement="bottomLeft">
                <Button className={"w-40"}>Load</Button>
              </Dropdown>
              <Button
                  className={"w-40"}
                  htmlType={"button"}
                  onClick={() => setConfirmationModalProps({
                    title: "Delete Deck",
                    message: "Are you sure you want to delete this deck?",
                    onConfirm: () => deleteDeck(),
                    isDeleteModalOpen: true,
                    setIsDeleteModalOpen: () => setConfirmationModalProps({...confirmationModalProps, isDeleteModalOpen: false}),
                  })}>
                Delete
              </Button>
            </div>
            <div className={"flex flex-row gap-2 items-start"}>
              <Button className={"w-40"} htmlType={"button"} onClick={onGetURL}>Share Link</Button>
              <Button className={"w-40"} htmlType={"button"} onClick={onExport}>Export to TCG Arena</Button>
            </div>
          </div>
          <div className={"basis-2/3"}>
            {warningMissingLeaderMedal && (
              <div className={"mb-2"}>
                <Alert title="Deck needs 1 Leader and 3 Medals" type="error" showIcon/>
              </div>
            )}
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
        {warningRequirements && (
          <div className={"mb-2"}>
            <Alert title="Some cards don't meet their Medal Requirements" type="error" showIcon/>
          </div>
        )}
        {warningUnder && (
          <div className={"mb-2"}>
            <Alert title="Main Deck needs at least 40 cards" type="error" showIcon/>
          </div>
        )}
        {warningOverMain && (
          <div className={"mb-2"}>
            <Alert title="Main Deck can't have more than 50 cards" type="error" showIcon/>
          </div>
        )}
        <div className={"font-michroma font-bold text-xl text-left mb-3"}>Main Deck ({store.deck.cards.reduce((sum, card) => sum + card.amount, 0)})</div>
        {displayData.length === 0 && (
            <div className={"text-start"}>
              No cards have been selected for Main Deck.
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
        {warningOverSide && (
          <div className={"mb-2"}>
            <Alert title="Side Deck can't have more than 10 cards" type="error" showIcon/>
          </div>
        )}
        <div className={"font-michroma font-bold text-xl text-left mb-3"}>Side Deck ({store.deck.sideCards.reduce((sum, card) => sum + card.amount, 0)})</div>
        {sideDisplayData.length === 0 && (
            <div className={"text-start"}>
              No cards have been selected for Side Deck.
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