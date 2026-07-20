import {Input, Select} from "antd";
import {forwardRef, useImperativeHandle, useState} from "react";
import {useStore} from "../store/store.ts";
import dataSet from "../assets/TestCardDataSet.json";

const COLOR_OPTIONS = [
  {
    value: 'ALL',
    label: 'ALL',
  },
  {
    value: 'R',
    label: 'Red',
  },
  {
    value: 'B',
    label: 'Blue',
  },
  {
    value: 'G',
    label: 'Green',
  },
  {
    value: 'Y',
    label: 'Yellow',
  },
  {
    value: 'P',
    label: 'Purple',
  }
]
const COMPARE_OPTIONS = [
  {
    value: 'ALL',
    label: 'ALL',
  },{
    value: 'EQ',
    label: '=',
  },
  {
    value: 'GT',
    label: '>',
  },
  {
    value: 'GTEQ',
    label: '>=',
  },
  {
    value: 'LT',
    label: '<',
  },
  {
    value: 'LTEQ',
    label: '<=',
  },
]

const attributeOptions = ["ALL", ...new Set(dataSet.flatMap(card => card.attributes))].map(item => ({
  value: item,
  label: item
}));
const groupOptions = ["ALL", ...new Set(dataSet.flatMap(card => card.groups))].map(item => ({
  value: item,
  label: item
}));
const genderOptions = ["ALL", ...new Set(dataSet.flatMap(card => card.gender))].filter(item => item !== "").map(item => ({
  value: item,
  label: item
}));
const legTypeOptions = ["ALL", ...new Set(dataSet.flatMap(card => card.legType))].filter(item => item !== "").map(item => ({
  value: item,
  label: item
}));
const medapartTypeOptions = ["ALL", ...new Set(dataSet.flatMap(card => card.medapartType))].filter(item => item !== "").map(item => ({
  value: item,
  label: item
}));

export const AdvancedFilters = forwardRef((_, ref) => {
  const store = useStore();

  const [selectedColor, setSelectedColor] = useState<string>(COLOR_OPTIONS[0].value);
  const [selectedArmor, setSelectedArmor] = useState<string>(COMPARE_OPTIONS[0].value);
  const [armorInput, setArmorInput] = useState<string>("");
  const [selectedSpirit, setSelectedSpirit] = useState<string>(COMPARE_OPTIONS[0].value);
  const [spiritInput, setSpiritInput] = useState<string>("");
  const [selectedAttribute, setSelectedAttribute] = useState<string>(attributeOptions[0].value);
  const [selectedGroup, setSelectedGroup] = useState<string>(groupOptions[0].value);

  const [selectedCost, setSelectedCost] = useState<string>(COMPARE_OPTIONS[0].value);
  const [costInput, setCostInput] = useState<string>("");
  const [selectedPower, setSelectedPower] = useState<string>(COMPARE_OPTIONS[0].value);
  const [powerInput, setPowerInput] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>(genderOptions[0].value);
  const [selectedLegType, setSelectedLegType] = useState<string>(legTypeOptions[0].value);
  const [selectedMedapartType, setSelectedMedapartType] = useState<string>(medapartTypeOptions[0].value);

  useImperativeHandle(ref, () => ({
    onSearch: () => {
      store.setColor(selectedColor);
      store.setArmorCompare(selectedArmor);
      store.setArmorValue(+armorInput);
      store.setSpiritCompare(selectedSpirit);
      store.setSpiritValue(+spiritInput)
      store.setCostCompare(selectedCost);
      store.setCostValue(+costInput);
      store.setPowerCompare(selectedPower);
      store.setPowerValue(+powerInput);
      store.setAttribute(selectedAttribute);
      store.setGroup(selectedGroup);
      store.setGender(selectedGender);
      store.setLegType(selectedLegType);
      store.setMedapartType(selectedMedapartType);
    },
    onClearSearch: () => {
      setSelectedColor(COLOR_OPTIONS[0].value);
      setSelectedArmor(COMPARE_OPTIONS[0].value);
      setArmorInput("");
      setSelectedSpirit(COMPARE_OPTIONS[0].value);
      setSpiritInput("");
      setSelectedCost(COMPARE_OPTIONS[0].value);
      setCostInput("");
      setSelectedPower(COMPARE_OPTIONS[0].value);
      setPowerInput("");
      setSelectedAttribute(attributeOptions[0].value)
      setSelectedGroup(groupOptions[0].value)
      setSelectedGender(genderOptions[0].value)
      setSelectedLegType(legTypeOptions[0].value)
      setSelectedMedapartType(medapartTypeOptions[0].value)
    },
  }));

 return (
     <div className={"flex flex-col md:flex-row gap-4"}>
       <div className={"flex flex-col basis-1/2 gap-4"}>
         {/* Primera fila */}
         <div className={"flex flex-col md:flex-row w-full gap-2"}>
           <div className={"w-full"}>
             <div className={"flex justify-between"}>
               <p>
                 Select a color
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Color"
                   className={"w-full"}
                   value={selectedColor}
                   onChange={setSelectedColor}
                   options={COLOR_OPTIONS}
               />
             </div>
           </div>
         </div>

         {/* Segunda fila */}
         <div className={"flex flex-col md:flex-row w-full gap-2"}>
           <div className={"basis-2/12"}>
             <div className={"flex justify-between"}>
               <p>
                 Armor
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Select a color"
                   className={"w-full"}
                   value={selectedArmor}
                   onChange={setSelectedArmor}
                   options={COMPARE_OPTIONS}
               />
             </div>
           </div>
           <div className={"basis-4/12"}>
             <div className={"flex justify-between"}>
               <p className={"hidden sm:block"}>
                 &nbsp;
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Input placeholder={"Type to search"} value={armorInput} type={"number"} onChange={e => setArmorInput(e.target.value)}/>
             </div>
           </div>

           <div className={"basis-2/12"}>
             <div className={"flex justify-between"}>
               <p>
                 Spirit
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Type to search"
                   className={"w-full"}
                   value={selectedSpirit}
                   onChange={setSelectedSpirit}
                   options={COMPARE_OPTIONS}
               />
             </div>
           </div>
           <div className={"basis-4/12"}>
             <div className={"flex justify-between"}>
               <p className={"hidden sm:block"}>
                 &nbsp;
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Input placeholder={"Type to search"} value={spiritInput} type={"number"} onChange={(e) => setSpiritInput(e.target.value)}/>
             </div>
           </div>
         </div>

         {/* Tercera fila */}
         <div className={"flex flex-col md:flex-row w-full gap-2"}>
           <div className={"basis-1/2"}>
             <div className={"flex justify-between"}>
               <p>
                 Select and Attribute
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Atrribute"
                   className={"w-full"}
                   value={selectedAttribute}
                   onChange={setSelectedAttribute}
                   options={attributeOptions}
               />
             </div>
           </div>
           <div className={"basis-1/2"}>
             <div className={"flex justify-between"}>
               <p>
                 Select a Group
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Group"
                   className={"w-full"}
                   value={selectedGroup}
                   onChange={setSelectedGroup}
                   options={groupOptions}
               />
             </div>
           </div>
         </div>

       </div>

       <div className={"flex flex-col basis-1/2 gap-4"}>
         {/* Primera fila */}
         <div className={"flex flex-col md:flex-row w-full gap-2"}>
           <div className={"basis-2/12"}>
             <div className={"flex justify-between"}>
               <p>
                 Cost
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Select a cost"
                   className={"w-full"}
                   value={selectedCost}
                   onChange={setSelectedCost}
                   options={COMPARE_OPTIONS}
               />
             </div>
           </div>
           <div className={"basis-4/12"}>
             <div className={"flex justify-between"}>
               <p className={"hidden sm:block"}>
                 &nbsp;
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Input placeholder={"Type to search"} value={costInput} type={"number"} onChange={(e) => setCostInput(e.target.value)}/>
             </div>
           </div>

           <div className={"basis-2/12"}>
             <div className={"flex justify-between"}>
               <p>
                 Power
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Select a power"
                   className={"w-full"}
                   value={selectedPower}
                   onChange={setSelectedPower}
                   options={COMPARE_OPTIONS}
               />
             </div>
           </div>
           <div className={"basis-4/12"}>
             <div className={"flex justify-between"}>
               <p className={"hidden sm:block"}>
                 &nbsp;
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Input placeholder={"Type to search"} value={powerInput} type={"number"} onChange={(e) => setPowerInput(e.target.value)}/>
             </div>
           </div>
         </div>

         {/* Segunda fila */}
         <div className={"flex flex-col md:flex-row w-full gap-2"}>
           <div className={"basis-1/2"}>
             <div className={"flex justify-between"}>
               <p>
                 Select a Gender
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Gender"
                   className={"w-full"}
                   value={selectedGender}
                   onChange={setSelectedGender}
                   options={genderOptions}
               />
             </div>
           </div>
           <div className={"basis-1/2"}>
             <div className={"flex justify-between"}>
               <p>
                 Select a Leg type
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Leg type"
                   className={"w-full"}
                   value={selectedLegType}
                   onChange={setSelectedLegType}
                   options={legTypeOptions}
               />
             </div>
           </div>
         </div>

         {/* Tercera fila */}
         <div className={"flex flex-col md:flex-row w-full gap-2"}>
           <div className={"basis-1/2"}>
             <div className={"flex justify-between"}>
               <p>
                 Select Rarity
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Rarity"
                   className={"w-full"}
                   value={null}
                   onChange={() => {}}
                   options={[]}
               />
             </div>
           </div>
           <div className={"basis-1/2"}>
             <div className={"flex justify-between"}>
               <p>
                 Select a Medapart type
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Medapart type"
                   className={"w-full"}
                   value={selectedMedapartType}
                   onChange={setSelectedMedapartType}
                   options={medapartTypeOptions}
               />
             </div>
           </div>
         </div>
       </div>
     </div>

 )
})