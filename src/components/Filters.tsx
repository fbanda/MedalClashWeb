import {Button, Checkbox, Collapse, Form, Input, Select} from "antd";
import {DEFAULT_CARD_TYPE, useStore} from "../store/store.ts";
import {type ChangeEvent, useRef, useState} from "react";
import dataSet from "../assets/TestCardDataSet.json";
import {AdvancedFilters} from "./AdvancedFilters.tsx";

const SetList = dataSet.map(card => card.set);
const SetListUnique = ["ALL", ...new Set(SetList)];

const CardTypes = [
  {value: DEFAULT_CARD_TYPE, label: "Other Cards"},
  {value: "LEADER", label: "Leaders"},
  {value: "MEDAL", label: "Medals"},
]

export const Filters = () => {
  const store = useStore();
  const [inputValue, setInputValue] = useState(store.filterInputValue);
  const [selectedSet, setSelectedSet] = useState(SetListUnique[0]);
  const [selectedCardType, setSelectedCardType] = useState<string>(DEFAULT_CARD_TYPE);
  const [searchByName, setSearchByName] = useState(store.searchByName);
  const [searchByText, setSearchByText] = useState(store.searchByText);
  const [searchByType, setSearchByType] = useState(store.searchByType);

  const advancedFiltersRef = useRef<{
    onSearch: () => void;
    onClearSearch: () => void;
  }>(null);

  const handleOnChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  }

  const handleOnSearch = () => {
    store.setFilterInputValue(inputValue);
    store.setSearchByName(searchByName)
    store.setSearchByText(searchByText)
    store.setSearchByType(searchByType)
    store.setSearchBySet(selectedSet)
    store.setCardType(selectedCardType)
    store.setCurrentPage(1);
    advancedFiltersRef.current?.onSearch();
  }

  const handleOnClearFilters = () => {
    setInputValue("");
    setSelectedSet("ALL");
    setSelectedCardType(DEFAULT_CARD_TYPE)
    setSearchByName(true);
    setSearchByText(false);
    setSearchByType(false);
    advancedFiltersRef.current?.onClearSearch();
  }

  const handleToggleAdvancedSearch = (key: string[]) => {
    store.setIsAdvancedFiltersOpen(!!key.length)
  }

  return (
      <Form name="basic" autoComplete="off">
        {/* first row */}
        <div className={"flex justify-between p-4"}>
          <div>
            FILTERS
          </div>
          <div className={"flex gap-4"}>
              <Button htmlType="submit" onClick={handleOnSearch}>Search</Button>
              <Button htmlType={"button"} onClick={handleOnClearFilters}>Clear Filters</Button>
          </div>
        </div>
        {/* second row */}
        <div className={"flex flex-col md:flex-row justify-between pt-4 ps-4 pe-4 md:gap-16"}>
          <div className={"basis-1/2"}>
            <div className={"flex justify-between"}>
              <p>
                SEARCH BY
              </p>
              <div>
                <Checkbox
                    onChange={(value) => { setSearchByName(value.target.checked) }}
                    checked={searchByName}
                >
                  Name
                </Checkbox>
              </div>
              <div>
                <Checkbox
                    onChange={(value) => { setSearchByText(value.target.checked) }}
                    checked={searchByText}>
                  Text
                </Checkbox>
              </div>
              <div>
                <Checkbox
                    onChange={(value) => { setSearchByType(value.target.checked) }}
                    checked={searchByType}>
                  Type
                </Checkbox>
              </div>
            </div>
            <div className={"mt-2"}>
              <Form.Item>
                <Input placeholder={"Search"} value={inputValue} onChange={(e) => handleOnChangeName(e)}/>
              </Form.Item>
            </div>
          </div>
          <div className={"basis-1/4"}>
            <div className={"flex justify-between"}>
              <p>
                CARD Type
              </p>
            </div>
            <div className={"flex mt-2"}>
              <Select
                  placeholder="Select a Card Set"
                  className={"w-full"}
                  value={selectedCardType}
                  onChange={(value) => {setSelectedCardType(value)}}
                  options={CardTypes}
              />
            </div>
          </div>
          <div className={"basis-1/4"}>
            <div className={"flex justify-between"}>
              <p>
                CARD SET
              </p>
            </div>
            <div className={"flex mt-2"}>
              <Select
                  placeholder="Select a Card Set"
                  className={"w-full"}
                  value={selectedSet}
                  onChange={(value) => {setSelectedSet(value)}}
                  options={SetListUnique.map(set => (
                      {value: set, label: set}
                  ))}
              />
            </div>
          </div>
        </div>
        <div className={"ps-4 pe-4 pt-8 md:pt-0"}>
          <Collapse
              onChange={handleToggleAdvancedSearch}
              items={[{ key: '1', label: 'Advanced Search', children: <AdvancedFilters ref={advancedFiltersRef} /> }]}
          />
        </div>
      </Form>

  )
}