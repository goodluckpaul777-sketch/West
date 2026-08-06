import africanPikeImg from "../assets/images/hujeta_pike_lovable.png";
import congoTetraImg from "../assets/images/congo_tetra_lovable.png";
import bloodFishImg from "../assets/images/blood_fish_lovable.png";
import dolphinMormyridImg from "../assets/images/mormyrus_lovable.png";

// Direct High-Resolution CDN Images for West African Livestock
const abaAbaImg = "https://storage.googleapis.com/dala-prod-public-storage/attachments/66618de1-fc9f-45e0-b4d3-1b575900a875/1783473933773_IMG-20260706-WA0025.jpg";
const tigerfishImg = "https://storage.googleapis.com/dala-prod-public-storage/attachments/66618de1-fc9f-45e0-b4d3-1b575900a875/1782518253432_1778424284824.png";
const arowanaImg = "https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/shop_product_images/products/4ffd2e1c-59f6-4985-9243-82801337fa37/1785168652642-p5yhgxv0ii.png";
const atyaShrimpImg = "https://storage.googleapis.com/dala-prod-public-storage/attachments/66618de1-fc9f-45e0-b4d3-1b575900a875/1784193162298_IMG_20260716_100812.jpg";
const butterflyImg = "https://storage.googleapis.com/dala-prod-public-storage/attachments/66618de1-fc9f-45e0-b4d3-1b575900a875/1779838226008_1779838206913.png";
const costaeTetraImg = "https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/shop_product_images/products/4ffd2e1c-59f6-4985-9243-82801337fa37/1785169027197-xc4yqfpiuc.png";
const glassCatImg = "https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/shop_product_images/products/4ffd2e1c-59f6-4985-9243-82801337fa37/1785168862944-dnintsh1mt5.png";
const electricCatfishImg = "https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/shop_product_images/products/4ffd2e1c-59f6-4985-9243-82801337fa37/1785169069848-3stqpnq3xem.png";
const elephantNoseImg = "https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/shop_product_images/products/4ffd2e1c-59f6-4985-9243-82801337fa37/1785168752178-hziwkg38h8a.png";
const marbleKnifeImg = "https://storage.googleapis.com/dala-prod-public-storage/attachments/66618de1-fc9f-45e0-b4d3-1b575900a875/1779836297198_IMG_20260526_160358.jpg";
const mbuPufferImg = "https://storage.googleapis.com/dala-prod-public-storage/attachments/66618de1-fc9f-45e0-b4d3-1b575900a875/1783472096434_1778420191965.png";
const rainbowCrabImg = "https://storage.googleapis.com/dala-prod-public-storage/attachments/66618de1-fc9f-45e0-b4d3-1b575900a875/1783470991659_1783470958603.png";
const redEyeImg = "https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/shop_product_images/products/4ffd2e1c-59f6-4985-9243-82801337fa37/1785169061095-drw9mthgst.png";
const ropeFishImg = "https://storage.googleapis.com/dala-prod-public-storage/attachments/66618de1-fc9f-45e0-b4d3-1b575900a875/1779843879999_1779841066099.png";
const snakeHeadImg = "https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/shop_product_images/products/4ffd2e1c-59f6-4985-9243-82801337fa37/1785168629604-cw6k7ckebw.png";
const spinyEelImg = "https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/shop_product_images/products/4ffd2e1c-59f6-4985-9243-82801337fa37/1785169076883-hh36491ia6j.png";

export interface StockFish {
  sn: string;
  commonName: string;
  scientificName: string;
  image?: string;
}

export const NEW_LIVESTOCK_DATA: StockFish[] = [
  { sn: "1", commonName: "Aba Babies", scientificName: "Gynachus niloticus", image: abaAbaImg },
  { sn: "2", commonName: "Aba big sizes", scientificName: "Gynachus niloticus", image: abaAbaImg },
  { sn: "3", commonName: "Aba medium sizes", scientificName: "Gynachus niloticus", image: abaAbaImg },
  { sn: "4", commonName: "Africa Pike", scientificName: "Hepsetus odoe", image: africanPikeImg },
  { sn: "5", commonName: "African Tiger (med)", scientificName: "Hydrocynus goliath", image: tigerfishImg },
  { sn: "6", commonName: "African Tiger (small)", scientificName: "Hydrocynus goliath", image: tigerfishImg },
  { sn: "7", commonName: "Alestes", scientificName: "Brycinus logipinis" },
  { sn: "8", commonName: "Aphyosemion", scientificName: "Aphyosemion australis" },
  { sn: "9", commonName: "Aphyosemion", scientificName: "Aphyosemion bivitatum" },
  { sn: "10", commonName: "Aphyosemion", scientificName: "Aphyosemion culliurum" },
  { sn: "11", commonName: "Aquatic Frogs", scientificName: "Xenopus species" },
  { sn: "12", commonName: "Arowana (big)", scientificName: "Heterotis niloticus", image: arowanaImg },
  { sn: "13", commonName: "Arowana (medium)", scientificName: "Heterotis niloticus", image: arowanaImg },
  { sn: "14", commonName: "Arowana (small)", scientificName: "Heterotis niloticus", image: arowanaImg },
  { sn: "15", commonName: "Atya Shrimps (big)", scientificName: "Atya gabonensis", image: atyaShrimpImg },
  { sn: "16", commonName: "Atya Shrimps (medium)", scientificName: "Atya gabonensis", image: atyaShrimpImg },
  { sn: "17", commonName: "Atya Shrimps (small)", scientificName: "Atya gabonensis", image: atyaShrimpImg },
  { sn: "18", commonName: "Bifasciatus", scientificName: "Epiplatys bifasciatus" },
  { sn: "19", commonName: "Big Shrimps", scientificName: "Crustabus species" },
  { sn: "20", commonName: "Blood Fish", scientificName: "Phractolemus ansorgii", image: bloodFishImg },
  { sn: "21", commonName: "Blue Fish", scientificName: "Aplocheichys myersi" },
  { sn: "22", commonName: "Blue Panchare", scientificName: "Epiplatys species" },
  { sn: "23", commonName: "Butter Fly (med./big)", scientificName: "Pantodon bucholzi", image: butterflyImg },
  { sn: "24", commonName: "Butter Fly (small)", scientificName: "Pantodon bucholzi", image: butterflyImg },
  { sn: "25", commonName: "Chromidotilapia", scientificName: "Chromidotilapia guentheri" },
  { sn: "26", commonName: "Congo Tetra", scientificName: "Phenacogramus interruptus", image: congoTetraImg },
  { sn: "27", commonName: "Costae Tetra", scientificName: "Moenkhausia costae", image: costaeTetraImg },
  { sn: "28", commonName: "Debauwie", scientificName: "Eutropielus debauwei", image: glassCatImg },
  { sn: "29", commonName: "Dolphins", scientificName: "Mommyyrus longirostris", image: dolphinMormyridImg },
  { sn: "30", commonName: "Electric Catfish", scientificName: "Malapterurus electricus", image: electricCatfishImg },
  { sn: "31", commonName: "Electric fish (med./big)", scientificName: "Malapterurus electricus", image: electricCatfishImg },
  { sn: "32", commonName: "Electric fish (small)", scientificName: "Malapterurus electricus", image: electricCatfishImg },
  { sn: "33", commonName: "Elephant Nose (big)", scientificName: "Gnathonemus petersii", image: elephantNoseImg },
  { sn: "34", commonName: "Elephant Nose (medium)", scientificName: "Gnathonemus petersii", image: elephantNoseImg },
  { sn: "35", commonName: "Elephant Nose (small)", scientificName: "Gnathonemus petersii", image: elephantNoseImg },
  { sn: "36", commonName: "Fresh Water Crab", scientificName: "Crustabus species" },
  { sn: "37", commonName: "Glass Cat", scientificName: "Paraila pellicida", image: glassCatImg },
  { sn: "38", commonName: "Gobies", scientificName: "Gobio gudgeon" },
  { sn: "39", commonName: "Grass Cutter", scientificName: "Schilbe mystus" },
  { sn: "40", commonName: "Gupies", scientificName: "Poecilla reticulata" },
  { sn: "41", commonName: "Jewel Fish", scientificName: "Hemichromis bimaculatus" },
  { sn: "42", commonName: "Knife Fish", scientificName: "Xenomytus nigri" },
  { sn: "43", commonName: "Kribensis", scientificName: "Pelvicachromis pulcher" },
  { sn: "44", commonName: "Lampeye", scientificName: "Aplochelichys species" },
  { sn: "45", commonName: "Leaf Fish", scientificName: "Monocirrus polyacanthus" },
  { sn: "46", commonName: "Long Fin Alestes", scientificName: "Hemigramus caudalis" },
  { sn: "47", commonName: "Lung Fish", scientificName: "Protopterus Albino" },
  { sn: "48", commonName: "Lung Fish (big)", scientificName: "Protopterus aethiopicus" },
  { sn: "49", commonName: "Lung Fish (big)", scientificName: "Protopterus annectens" },
  { sn: "50", commonName: "Lung Fish (small)", scientificName: "Protopterus aethiopicus" },
  { sn: "51", commonName: "Lung Fish (small)", scientificName: "Protopterus annectens" },
  { sn: "52", commonName: "Macrophtalmu", scientificName: "Aplocheichys macrophtamus" },
  { sn: "53", commonName: "Marble Knife", scientificName: "Papyrocramus afer", image: marbleKnifeImg },
  { sn: "54", commonName: "Mud Crab", scientificName: "Goniopsis peliii" },
  { sn: "55", commonName: "Mudskipper (big)", scientificName: "Perophtalmus vulgaris" },
  { sn: "56", commonName: "Mudskipper (small)", scientificName: "Perophtalmus vulgaris" },
  { sn: "57", commonName: "N.Powelli", scientificName: "Neolebias powelli" },
  { sn: "58", commonName: "Neon Tetra", scientificName: "Neolebias ansorgii" },
  { sn: "59", commonName: "Net Work Catfish", scientificName: "Synodontis eupterus" },
  { sn: "60", commonName: "Nile Perch", scientificName: "Lates niloticus" },
  { sn: "61", commonName: "Occellifer Catfish", scientificName: "Synodontis occellifer" },
  { sn: "62", commonName: "One Line Tetra", scientificName: "Nannocharax latifasiatus" },
  { sn: "63", commonName: "Pencil Fish", scientificName: "Nannodharax species" },
  { sn: "64", commonName: "Phago Fish", scientificName: "Phago maculatus" },
  { sn: "65", commonName: "Pipe Fish", scientificName: "Microphis brachyurus" },
  { sn: "66", commonName: "Polypterus", scientificName: "Polyterus tuegelsi" },
  { sn: "67", commonName: "Polypterus (big)", scientificName: "Polypterus endlicheri" },
  { sn: "68", commonName: "Polypterus (med)", scientificName: "POLYPTERUS WEEKSI" },
  { sn: "69", commonName: "Polypterus (medium)", scientificName: "Polypterus endlicheri" },
  { sn: "70", commonName: "Polypterus (medium)", scientificName: "Polypterus lapradei" },
  { sn: "71", commonName: "Polypterus (medium)", scientificName: "Polypterus senegalus" },
  { sn: "72", commonName: "Polypterus (small)", scientificName: "Polypterus endlicheri" },
  { sn: "73", commonName: "Polypterus (small)", scientificName: "Polypterus lapradei" },
  { sn: "74", commonName: "Polypterus (small)", scientificName: "Polypterus senegalus" },
  { sn: "75", commonName: "Polypterus (small)", scientificName: "POLYPTERUS WEEKSI" },
  { sn: "76", commonName: "Procatopus", scientificName: "Procatopus similis" },
  { sn: "77", commonName: "Puffer (med.)", scientificName: "Tetradon Mbu", image: mbuPufferImg },
  { sn: "78", commonName: "Puffer (small)", scientificName: "Tetradon Mbu", image: mbuPufferImg },
  { sn: "79", commonName: "Puffer Fish (medium)", scientificName: "Tetraodon fahaka" },
  { sn: "80", commonName: "Puffer Fish (small)", scientificName: "Tetraodon fahaka" },
  { sn: "81", commonName: "Raiamas", scientificName: "Senegalensis" },
  { sn: "82", commonName: "Rainbow Crab (big)", scientificName: "Cardiosoma armatum", image: rainbowCrabImg },
  { sn: "83", commonName: "Rainbow Crab (medium)", scientificName: "Cardiosoma armatum", image: rainbowCrabImg },
  { sn: "84", commonName: "Rainbow Crab (small)", scientificName: "Cardiosoma armatum", image: rainbowCrabImg },
  { sn: "85", commonName: "Red Eye", scientificName: "Arnoldichytis spilopterus", image: redEyeImg },
  { sn: "86", commonName: "Red Tail Alestes", scientificName: "Microalestes stormsi" },
  { sn: "87", commonName: "Reed/Rope Fish", scientificName: "Erpetoichythys calabericus", image: ropeFishImg },
  { sn: "88", commonName: "Round Nose", scientificName: "Pollimyrus nigripinis" },
  { sn: "89", commonName: "Short Nose", scientificName: "Mercusenius angolensis" },
  { sn: "90", commonName: "Snake Head", scientificName: "Channa striata / Channa asiatica", image: snakeHeadImg },
  { sn: "91", commonName: "Spiny Eel", scientificName: "Afromastacembelus frenatus", image: spinyEelImg },
  { sn: "92", commonName: "Spotted Cat", scientificName: "Paraochenoglanis migrostoma" },
  { sn: "93", commonName: "Tetraodom", scientificName: "Tetraodom Pustulatus" },
  { sn: "94", commonName: "Tiger fish", scientificName: "Hydrocynus vittatus", image: tigerfishImg },
  { sn: "95", commonName: "U.D.Catfish", scientificName: "Synodontis nigriventris" },
  { sn: "96", commonName: "Under Water Frogs", scientificName: "Pipa-pipa" },
  { sn: "97", commonName: "W.A.Tree Frogs", scientificName: "Hyperoluis species" },
  { sn: "98", commonName: "Whiptail Catfish", scientificName: "Phractura ansorgi" }
];
