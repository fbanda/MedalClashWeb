import {Input, Select} from "antd";
import {forwardRef, type ReactNode, useImperativeHandle, useState} from "react";
import {useStore} from "../store/store.ts";
import dataSet from "../assets/TestCardDataSet.json";

const getIconUrl = (text: string, icon: string): ReactNode =>
    <div className={"flex gap-2"}><img src={`https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/${icon}.png`} width={22} /><span>{text}</span></div>

interface Option {
  value: string;
  label: string | ReactNode;
}

const COLOR_OPTIONS = [
  { value: 'ALL', label: 'ALL' },
  { value: 'R', label: 'Red' },
  { value: 'P', label: 'Purple' },
  { value: 'B', label: 'Blue' },
  { value: 'G', label: 'Green' },
  { value: 'Y', label: 'Yellow' },
  { value: 'M', label: 'Multicolored' }
]
const COMPARE_OPTIONS = [
  {
    value: 'EQ',
    label: '=',
  },
  {
    value: 'GT',
    label: '>',
  },
  {
    value: 'GTEQ',
    label: '≥',
  },
  {
    value: 'LT',
    label: '<',
  },
  {
    value: 'LTEQ',
    label: '≤',
  },
]

const cardTypeOptions: Option[] = ["ALL", "Medabot", "Medafighter", "Event"].map(item => ({
  value: item,
  label: <p>{item}</p>
}));

const groupOptions = ["ALL", ...new Set(dataSet.flatMap(card => card.groups).sort())].map(item => ({
  value: item,
  label: item
}));

const attributeOptions: Option[] = [
    {value: "ALL", label: "ALL"},
    {value: "Range", label: getIconUrl("Range", "ARn")},
    {value: "Melee", label: getIconUrl("Melee", "AMl")},
    {value: "Ailment", label: getIconUrl("Ailment", "ASt")},
    {value: "Assist", label: getIconUrl("Assist", "ASp")},
    {value: "Defense", label: getIconUrl("Defense", "ADf")},
    {value: "Morph", label: getIconUrl("Morph", "AMr")},
];
const genderOptions = [
    {value: "ALL", label: "ALL"},
    {value: "Male", label: getIconUrl("Male", "GM")},
    {value: "Female", label: getIconUrl("Female", "GF")},
]

const legTypeOptions = [
  {value: "ALL", label: "ALL"},
  {value: "Biped", label: getIconUrl("Biped", "LB")},
  {value: "Multi-Leg", label: getIconUrl("Multi-Leg", "LM")},
  {value: "Wheel", label: getIconUrl("Wheel", "LW")},
  {value: "Hover", label: getIconUrl("Hover", "LH")},
  {value: "Tank", label: getIconUrl("Tank", "LT")},
  {value: "Flight", label: getIconUrl("Flight", "LF")},
  {value: "Water", label: getIconUrl("Water", "LA")},
]

const medapartTypeOptions = [
    {value: "ALL", label: "ALL"},
    {value: "Head", label: getIconUrl("Head", "MH")},
    {value: "Right Arm", label: getIconUrl("Right Arm", "MR")},
    {value: "Left Arm", label: getIconUrl("Left Arm", "ML")},
    {value: "Legs", label: getIconUrl("Legs", "MF")},
]

export interface AdvancedFiltersProps {
  handleOnSearch: () => void;
}

export const AdvancedFilters = forwardRef((props: AdvancedFiltersProps, ref) => {
  const store = useStore();
  const { handleOnSearch } = props;

  const [selectedColor, setSelectedColor] = useState<string>(COLOR_OPTIONS[0].value);
  const [selectedCardType, setSelectedCardType] = useState<string>(cardTypeOptions[0].value);
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
      store.setArmorValue(+armorInput);
      store.setSpiritValue(+spiritInput)
      store.setCostValue(+costInput);
      store.setPowerValue(+powerInput);
    },
    onClearSearch: () => {
      setSelectedColor(COLOR_OPTIONS[0].value);
      setSelectedCardType(cardTypeOptions[0].value);
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
       <div className={"flex flex-col w-full  gap-4"}>
         {/* Primera fila */}
         <div className={"flex flex-col md:flex-row w-full gap-2"}>
           <div className={"basis-1/4"}>
             <div className={"flex justify-between"}>
               <p>
                 Color
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Color"
                   className={"w-full"}
                   value={selectedColor}
                   onChange={(value) => {
                     setSelectedColor(value);
                     store.setColor(value);
                     handleOnSearch();
                   }}
                   options={COLOR_OPTIONS}
               />
             </div>
           </div>
           <div className={"basis-1/4"}>
             <div className={"flex justify-between"}>
               <p>
                 Card Type
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Card Type"
                   className={"w-full"}
                   value={selectedCardType}
                   onChange={(value) => {
                     setSelectedCardType(value);
                     store.setCardType(value);
                     handleOnSearch();
                   }}
                   options={cardTypeOptions}
               />
             </div>
           </div>
           <div className={"flex gap-2 basis-1/4 items-end"}>
             <div className={"basis-1/4"}>
               <div className={"flex gap-2 items-center"}>
                 <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CM.png"} className={"w-[16px] h-[16px]"}/>
                 <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CT.png"} className={"w-[16px] h-[16px]"}/>
                 <span>
                   Cost
                 </span>
               </div>
               <div className={"flex mt-2"}>
                 <Select
                     placeholder="Cost"
                     className={"w-full"}
                     value={selectedCost}
                     onChange={(value) => {
                       setSelectedCost(value);
                       store.setCostCompare(value);
                       handleOnSearch();
                     }}
                     options={COMPARE_OPTIONS}
                 />
               </div>
             </div>
             <div className={"basis-3/4"}>
               <div className={"flex justify-between"}>
                 <p className={"hidden sm:block"}>
                   &nbsp;
                 </p>
               </div>
               <div className={"flex mt-2"}>
                 <Input placeholder={"Number"} value={costInput} type={"number"} onChange={(e) => setCostInput(e.target.value)}/>
               </div>
             </div>
           </div>
           <div className={"flex gap-2 basis-1/4 items-end"}>
             <div className={"basis-1/4"}>
               <div className={"flex gap-2 items-center"}>
                 <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/SP.png"} className={"w-[16px] h-[16px]"}/>
                 <span>
                    Power
                 </span>
               </div>
               <div className={"flex mt-2"}>
                 <Select
                     placeholder="Power"
                     className={"w-full"}
                     value={selectedPower}
                     onChange={(value) => {
                       setSelectedPower(value);
                       store.setPowerCompare(value);
                       handleOnSearch();
                     }}
                     options={COMPARE_OPTIONS}
                 />
               </div>
             </div>
             <div className={"basis-3/4"}>
               <div className={"flex justify-between"}>
                 <p className={"hidden sm:block"}>
                   &nbsp;
                 </p>
               </div>
               <div className={"flex mt-2"}>
                 <Input placeholder={"Number"} value={powerInput} type={"number"} onChange={(e) => setPowerInput(e.target.value)}/>
               </div>
             </div>
           </div>

         </div>

         {/* Segunda fila */}
         <div className={"flex flex-col md:flex-row w-full gap-2"}>
           <div className={"flex gap-2 basis-1/4 items-end"}>
             <div className={"basis-1/4"}>
               <div className={"flex gap-2 items-center"}>
                 <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/SA.png"} className={"w-[16px] h-[16px]"}/>
                 <span>
                   Armor
                 </span>
               </div>
               <div className={"flex mt-2"}>
                 <Select
                     placeholder="Armor"
                     className={"w-full"}
                     value={selectedArmor}
                     onChange={(value) => {
                       setSelectedArmor(value);
                       store.setArmorCompare(value);
                       handleOnSearch();
                     }}
                     options={COMPARE_OPTIONS}
                 />
               </div>
             </div>
             <div className={"basis-3/4"}>
               <div className={"flex justify-between"}>
                 <p className={"hidden sm:block"}>
                   &nbsp;
                 </p>
               </div>
               <div className={"flex mt-2"}>
                 <Input placeholder={"Number"} value={armorInput} type={"number"} onChange={e => setArmorInput(e.target.value)}/>
               </div>
             </div>
           </div>
           <div className={"flex gap-2 basis-1/4 items-end"}>
             <div className={"basis-1/4"}>
               <div className={"flex gap-2 items-center"}>
                 <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/SS.png"} className={"w-[16px] h-[16px]"}/>
                 <span>
                   Spirit
                 </span>
               </div>
               <div className={"flex mt-2"}>
                 <Select
                     placeholder="Spirit"
                     className={"w-full"}
                     value={selectedSpirit}
                     onChange={(value) => {
                       setSelectedSpirit(value);
                       store.setSpiritCompare(value);
                       handleOnSearch();
                     }}
                     options={COMPARE_OPTIONS}
                 />
               </div>
             </div>
             <div className={"basis-3/4"}>
               <div className={"flex justify-between"}>
                 <p className={"hidden sm:block"}>
                   &nbsp;
                 </p>
               </div>
               <div className={"flex mt-2"}>
                 <Input placeholder={"Number"} value={spiritInput} type={"number"} onChange={(e) => setSpiritInput(e.target.value)}/>
               </div>
             </div>
           </div>
           <div className={"basis-1/4"}>
             <div className={"flex justify-between"}>
               <p>
                 Gender
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Gender"
                   className={"w-full"}
                   value={selectedGender}
                   onChange={(value) => {
                     setSelectedGender(value);
                     store.setGender(value);
                     handleOnSearch();
                   }}
                   options={genderOptions}
               />
             </div>
           </div>
           <div className={"basis-1/4"}>
             <div className={"flex justify-between"}>
               <p>
                 Leg Type
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Leg type"
                   className={"w-full"}
                   value={selectedLegType}
                   onChange={(value) => {
                     setSelectedLegType(value);
                     store.setLegType(value);
                     handleOnSearch();
                   }}
                   options={legTypeOptions}
               />
             </div>
           </div>
         </div>

         {/* Tercera fila */}
         <div className={"flex flex-col md:flex-row w-full gap-2"}>
           <div className={"basis-1/4"}>
             <div className={"flex justify-between"}>
               <p>
                 Attribute
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Atrribute"
                   className={"w-full"}
                   value={selectedAttribute}
                   onChange={(value) => {
                     setSelectedAttribute(value);
                     store.setAttribute(value);
                     handleOnSearch();
                   }}
                   options={attributeOptions}
               />
             </div>
           </div>
           <div className={"basis-1/4"}>
             <div className={"flex justify-between"}>
               <p>
                 Group
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Group"
                   className={"w-full"}
                   value={selectedGroup}
                   onChange={(value) => {
                     setSelectedGroup(value);
                     store.setGroup(value);
                     handleOnSearch();
                   }}
                   options={groupOptions}
               />
             </div>
           </div>
           <div className={"basis-1/2"}>
             <div className={"flex justify-between"}>
               <p>
                 Medapart Type
               </p>
             </div>
             <div className={"flex mt-2"}>
               <Select
                   placeholder="Medapart Type"
                   className={"w-full"}
                   value={selectedMedapartType}
                   onChange={(value) => {
                     setSelectedMedapartType(value);
                     store.setMedapartType(value);
                     handleOnSearch();
                   }}
                   options={medapartTypeOptions}
               />
             </div>
           </div>
         </div>

       </div>
     </div>

 )
})